import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Message,
  Button,
  Loader,
  Grid,
  Segment,
  Header,
  List,
  Label,
} from 'semantic-ui-react';
import { deleteRecipe } from '../../actions/actions';

const getTimeToString = duration => {
  let timeLeft = duration;
  const days = Math.floor(timeLeft / (60 * 60 * 24));
  timeLeft %= 60 * 60 * 24;
  const hours = Math.floor(timeLeft / (60 * 60));
  timeLeft %= 60 * 60;
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  let string = '';
  string += days !== 0 ? `${days} days ` : '';
  string += hours !== 0 ? `${hours} hours ` : '';
  string += min !== 0 ? `${min} mins ` : '';
  string += sec !== 0 ? `${sec} secs ` : '';
  return string;
};

export class RecipeDetail extends Component {
  onDelete = async _id => {
    const { history } = this.props;
    try {
      await this.props.deleteRecipe(_id);
      history.push('/dashboard');
    } catch (err) {
      // handle error
    }
  };
  render() {
    const { recipe, user, review } = this.props;
    if (recipe === null) {
      return <Loader active content="Loading" size="large" />;
    }
    if (recipe === undefined) {
      return (
        <div>
          <Grid centered>
            <Message color="red" content="No recipe found" size="massive" />
          </Grid>
          <Button as={Link} to="/recipes" positive>
            Back
          </Button>
        </div>
      );
    }
    let cookingTime;
    if (recipe.cookingTime) {
      cookingTime = getTimeToString(recipe.cookingTime);
    }
    let preparationTime;
    if (recipe.preparationTime) {
      preparationTime = getTimeToString(recipe.preparationTime);
    }
    return (
      <div>
        {!review && (
          <Button as={Link} to="/recipes" positive>
            Back
          </Button>
        )}
        {user &&
          user === recipe._user && (
            <Button as={Link} to={`/recipes/${recipe._id}/edit`} color="yellow">
              Edit
            </Button>
          )}
        {user &&
          user === recipe._user && (
            <Button
              floated="right"
              onClick={() => this.onDelete(recipe._id)}
              negative
            >
              Delete
            </Button>
          )}
        <Segment.Group>
          <Segment clearing>
            <Header as="h1" floated="left">
              {recipe.name}
            </Header>
            <Header floated="right">
              <h3>
                {preparationTime && `Prep Time: ${preparationTime}| `}
                {cookingTime && `Cooking Time: ${cookingTime}`}
              </h3>
              {recipe.category &&
                recipe.category.map(cat => (
                  <Label key={cat} tag>
                    {cat}
                  </Label>
                ))}
            </Header>
          </Segment>

          <Segment>
            <h2>Ingredients</h2>
            {recipe.ingredients.map(ingredient => (
              <Segment key={`${ingredient.body}`}>
                {ingredient.title && <h4>{ingredient.title}</h4>}
                <List bulleted>
                  {ingredient.body.map(instr => (
                    <List.Item key={instr}>{instr}</List.Item>
                  ))}
                </List>
              </Segment>
            ))}
          </Segment>
          {recipe.preparation &&
            recipe.preparation.length !== 0 && (
              <Segment>
                <h2>Preparation</h2>
                {recipe.preparation.map(prep => (
                  <Segment key={`${prep.body}`}>
                    {prep.title && <h4>{prep.title}</h4>}
                    <List ordered>
                      {prep.body.map(instr => (
                        <List.Item key={instr}>{instr}</List.Item>
                      ))}
                    </List>
                  </Segment>
                ))}
              </Segment>
            )}
          <Segment>
            <h2>Cooking</h2>
            {recipe.cooking.map(cook => (
              <Segment key={`${cook.body}`}>
                {cook.title && <h4>{cook.title}</h4>}
                <List ordered>
                  {cook.body.map(instr => (
                    <List.Item key={instr}>{instr}</List.Item>
                  ))}
                </List>
              </Segment>
            ))}
          </Segment>
          {recipe.notes &&
            recipe.notes.length !== 0 && (
              <Segment>
                <h3>Notes</h3>
                <List ordered>
                  {recipe.notes.map(note => (
                    <List.Item key={note}>{note}</List.Item>
                  ))}
                </List>
              </Segment>
            )}
        </Segment.Group>
        {!review && (
          <Button as={Link} to="/recipes" positive>
            Back
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  recipe:
    state.recipes &&
    // eslint-disable-next-line no-underscore-dangle
    state.recipes.find(recipe => recipe._id === props.match.params.id),
  // eslint-disable-next-line no-underscore-dangle
  user: state.auth && state.auth._id,
});

const mapDispatchToProps = dispatch => ({
  deleteRecipe: _id => dispatch(deleteRecipe(_id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
);

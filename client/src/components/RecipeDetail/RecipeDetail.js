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
  Image,
  Rating,
} from 'semantic-ui-react';
import { deleteRecipe, patchRating } from '../../actions/actions';
import selectRecipes from '../../selectors/recipes';
import recipeLinks from '../../selectors/recipeLinks';

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
  state = { deleteDisabled: false };
  onDelete = async _id => {
    const {
      history,
      recipe: { imageUrl },
    } = this.props;
    try {
      this.setState(() => ({ deleteDisabled: true }));
      await this.props.deleteRecipe(_id, imageUrl);
      history.push('/dashboard');
    } catch (err) {
      // handle error
    }
  };
  onRatingClick = async (e, { rating }) => {
    const { recipe } = this.props;
    try {
      await this.props.patchRating(recipe._id, rating);
    } catch (err) {
      //
    }
  };
  getTotalRating = () => {
    const { rating } = this.props.recipe;
    const total =
      rating.reduce((prev, curr) => prev + curr.rating, 0) / rating.length;
    return `${total.toFixed(2)} / 5`;
  };
  getUserRating = () => {
    const { user, recipe } = this.props;
    let rating;
    if (user && recipe && recipe.rating) {
      rating = recipe.rating.find(rate => rate._user === user);
    }
    return rating ? rating.rating : 0;
  };

  renderImage() {
    const { imageUrl, name } = this.props.recipe;
    const startUrl = 'https://s3.amazonaws.com/ramosrecipes/';
    if (imageUrl[0]) {
      return (
        <Image alt={name} src={`${startUrl}${imageUrl[0]}`} size="medium" />
      );
    }
    return null;
  }
  render() {
    const { recipe, user, review, history } = this.props;
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
    const { imageUrl, rating } = this.props.recipe;
    return (
      <div>
        {!review && (
          <Button
            as={Link}
            to={this.props.recipeLinks.prevUrl}
            disabled={this.props.recipeLinks.prevDisabled}
            content="Prev"
          />
        )}
        {!review && (
          <Button onClick={() => history.goBack()} positive>
            Back
          </Button>
        )}
        {user &&
          user === recipe._user && (
            <Button as={Link} to={`/recipes/${recipe._id}/edit`} color="yellow">
              Edit
            </Button>
          )}
        {!review && (
          <Button
            as={Link}
            to={this.props.recipeLinks.nextUrl}
            disabled={this.props.recipeLinks.nextDisabled}
            floated="right"
            content="Next"
          />
        )}
        {user &&
          user === recipe._user && (
            <Button
              floated="right"
              onClick={() => this.onDelete(recipe._id)}
              negative
              disabled={this.state.deleteDisabled}
            >
              Delete
            </Button>
          )}
        <Segment.Group>
          <Segment clearing>
            <Header floated="left">
              <h1>{recipe.name}</h1>
              {!review &&
                user && (
                  <div>
                    <span>Your rating: </span>
                    <Rating
                      maxRating={5}
                      rating={this.getUserRating()}
                      icon="star"
                      size="mini"
                      onRate={this.onRatingClick}
                    />
                  </div>
                )}
              {!review &&
                rating.length > 0 &&
                `Total Rating: ${this.getTotalRating()}`}
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
          {imageUrl && imageUrl[0] && <Segment>{this.renderImage()}</Segment>}

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
    state.recipes.find(recipe => recipe._id === props.match.params.id),
  user: state.auth && state.auth._id,
  recipeLinks:
    state.recipes &&
    recipeLinks(
      selectRecipes(state.recipes, state.recipesFilter, state.auth),
      props.match.params.id
    ),
});

const mapDispatchToProps = dispatch => ({
  deleteRecipe: (_id, imageUrl) => dispatch(deleteRecipe(_id, imageUrl)),
  patchRating: (_id, rating) => dispatch(patchRating(_id, rating)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)
);

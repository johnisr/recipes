import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Loader,
  Card,
  Label,
  Grid,
  Button,
  Icon,
  Image,
  Transition,
} from 'semantic-ui-react';
import { tagToDisplayOption } from '../../selectors/allTags';
import { toggleRecipeTagFilter } from '../../actions/actions';
import selectRecipesWithPages from '../../selectors/recipesWithPages';

export class RecipeList extends Component {
  onLabelClick = e => {
    this.props.toggleRecipeTagFilter(e.target.innerText);
  };
  render() {
    const { recipes, auth } = this.props;
    if (!recipes) {
      return <Loader active content="Loading" size="large" />;
    }
    return (
      <div>
        <Transition.Group as={Card.Group} stackable doubling itemsPerRow={4}>
          {recipes.map(recipe => (
            <Card key={recipe._id} to={`/recipes/${recipe._id}`}>
              {recipe.imageUrl &&
                recipe.imageUrl[0] && (
                  <Image
                    as={Link}
                    to={`/recipes/${recipe._id}`}
                    alt={recipe.name}
                    size="medium"
                    src={`https://s3.amazonaws.com/ramosrecipes/${
                      recipe.imageUrl[0]
                    }`}
                  />
                )}
              <Card.Content as={Link} to={`/recipes/${recipe._id}`}>
                <Card.Header textAlign="center">{recipe.name}</Card.Header>
                <Card.Description>{recipe.summary}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>
                  <Grid container>
                    {recipe.category.map(cat => {
                      const option = tagToDisplayOption(cat);
                      return (
                        <Label
                          key={cat}
                          content={option.text}
                          color={option.color}
                          style={{ cursor: 'pointer' }}
                          onClick={this.onLabelClick}
                        />
                      );
                    })}
                  </Grid>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Transition.Group>
        {auth && (
          <Button
            icon
            positive
            circular
            as={Link}
            to="/recipesNew"
            floated="right"
          >
            <Icon name="add" size="large" />
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes:
    state.recipes &&
    selectRecipesWithPages(state.recipes, state.recipesFilter, state.auth),
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  toggleRecipeTagFilter: tag => dispatch(toggleRecipeTagFilter(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);

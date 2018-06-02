import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, Card, Label, Grid, Button, Icon } from 'semantic-ui-react';

export class RecipeList extends Component {
  componentDidMount() {}
  render() {
    const { recipes, auth } = this.props;
    if (!recipes) {
      return <Loader active content="Loading" size="large" />;
    }
    return (
      <div>
        <Card.Group stackable doubling itemsPerRow={4}>
          {recipes.map(recipe => (
            // eslint-disable-next-line no-underscore-dangle
            <Card key={recipe._id} as={Link} to={`/recipes/${recipe._id}`}>
              <Card.Content>
                <Card.Header>{recipe.name}</Card.Header>
                <Card.Description>{recipe.summary}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>
                  <Grid>
                    {recipe.category.map(cat => (
                      <Label key={cat} tag>
                        {cat}
                      </Label>
                    ))}
                  </Grid>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
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
  recipes: state.recipes,
  auth: state.auth,
});

export default connect(mapStateToProps)(RecipeList);

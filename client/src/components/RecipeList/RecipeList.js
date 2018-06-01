import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Card, Label, Grid } from 'semantic-ui-react';

class RecipeList extends Component {
  componentDidMount() {}
  render() {
    const { recipes } = this.props;
    if (!recipes) {
      return (
        <Dimmer active>
          <Loader content="Loading" size="large" />
        </Dimmer>
      );
    }
    return (
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
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
});

export default connect(mapStateToProps)(RecipeList);

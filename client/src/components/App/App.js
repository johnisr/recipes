import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { fetchUser, getRecipes } from '../../actions/actions';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import RecipeEdit from '../RecipeEdit/RecipeEdit';
import Recipes from '../Recipes/Recipes';
import RecipeDetail from '../RecipeDetail/RecipeDetail';

export class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getRecipes();
  }
  render() {
    const { location } = this.props;
    return (
      <Container>
        <Header />
        <Route path="/" exact component={Landing} />
        <Route path="/recipes/:id" exact component={RecipeDetail} />
        <Route path="/recipes" exact component={Recipes} />
        <PrivateRoute
          location={location}
          path="/recipesNew"
          exact
          component={RecipeEdit}
        />
        <PrivateRoute
          location={location}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PrivateRoute
          location={location}
          path="/recipes/:id/edit"
          exact
          component={RecipeEdit}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  getRecipes: () => dispatch(getRecipes()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));

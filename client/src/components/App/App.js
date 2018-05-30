import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/actions';

import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import RecipeEdit from '../RecipeEdit/RecipeEdit';

const RecipeList = () => <div>Recipe List</div>;
const Recipe = () => <div>Specific Recipe</div>;

export class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { location } = this.props;
    return (
      <div className="container">
        <Header />
        <Route path="/" exact component={Landing} />
        <Route path="/recipes/:id" exact component={Recipe} />
        <Route path="/recipes" exact component={RecipeList} />
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));

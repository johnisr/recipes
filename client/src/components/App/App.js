import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/actions';

import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const Landing = () => <div>Landing!</div>;
const Dashboard = () => <div>Dashboard!</div>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route path="/" exact component={Landing} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(null, mapDispatchToProps)(App);

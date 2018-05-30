import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return [
          <li key="1">
            <Link to="/recipes">Recipes</Link>
          </li>,
          <li key="2">
            <a href="/auth/google">Login With Google</a>
          </li>,
        ];
      default:
        return [
          <li key="1">
            <Link to="/recipes">Recipes</Link>
          </li>,
          <li key="2">
            <a href="/auth/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="brand-logo left"
          >
            Home
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);

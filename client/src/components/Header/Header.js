import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

export class Header extends Component {
  state = { activeItem: '' };
  handleItemClick = (e, { content }) =>
    this.setState(() => ({ activeItem: content }));
  renderAuth() {
    switch (this.props.auth) {
      case null:
        return null;
      case false:
        return (
          <div className="right menu">
            <Menu.Item href="/auth/google" content="Login With Google" />
          </div>
        );
      default:
        return (
          <div className="right menu">
            <Menu.Item content="Logout" href="/auth/logout" />
          </div>
        );
    }
  }
  render() {
    const { activeItem } = this.state;
    return (
      <Segment inverted>
        <Menu fluid inverted pointing secondary size="huge" color="black">
          <Menu.Item
            content="Home"
            active={activeItem === 'Home'}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
          />
          {this.props.auth && (
            <Menu.Item
              content="Dashboard"
              active={activeItem === 'Dashboard'}
              onClick={this.handleItemClick}
              as={Link}
              to="/dashboard"
            />
          )}

          <Menu.Item
            content="Recipes"
            active={activeItem === 'Recipes'}
            onClick={this.handleItemClick}
            as={Link}
            to="/recipes"
          />
          {this.renderAuth()}
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);

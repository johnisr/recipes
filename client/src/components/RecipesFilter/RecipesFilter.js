import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input } from 'semantic-ui-react';
import { setRecipeNameFilter } from '../../actions/actions';

class RecipesFilter extends Component {
  onNameChange = e => {
    this.props.setRecipeNameFilter(e.target.value);
  };
  render() {
    return (
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Search..."
              onChange={this.onNameChange}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setRecipeNameFilter: name => dispatch(setRecipeNameFilter(name)),
});

export default connect(undefined, mapDispatchToProps)(RecipesFilter);

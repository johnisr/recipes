import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import {
  setRecipeNameFilter,
  setRecipeTagsFilter,
} from '../../actions/actions';
import selectRecipes from '../../selectors/recipes';
import currentTags from '../../selectors/currentTags';
import tagsToOptions from '../../selectors/tagsToOptions';

class RecipesFilter extends Component {
  onNameChange = e => {
    this.props.setRecipeNameFilter(e.target.value);
  };
  onTagsChange = (e, data) => {
    this.props.setRecipeTagsFilter(data.value);
  };
  render() {
    const { tagOptions } = this.props;
    const { name, tags } = this.props.recipesFilter;
    return (
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item>
            <Dropdown
              multiple
              search
              selection
              placeholder="Enter tags"
              options={tagOptions}
              value={tags}
              noResultsMessage={null}
              onChange={(e, data) => this.onTagsChange(e, data)}
            />
          </Menu.Item>
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Search..."
              onChange={this.onNameChange}
              value={name}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  const visibleRecipes =
    state.recipes && selectRecipes(state.recipes, state.recipesFilter);
  return {
    recipesFilter: state.recipesFilter,
    tagOptions: state.recipes && tagsToOptions(currentTags(visibleRecipes)),
  };
};

const mapDispatchToProps = dispatch => ({
  setRecipeNameFilter: name => dispatch(setRecipeNameFilter(name)),
  setRecipeTagsFilter: tags => dispatch(setRecipeTagsFilter(tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesFilter);

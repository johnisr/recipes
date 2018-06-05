import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input, Dropdown, Pagination } from 'semantic-ui-react';
import {
  setRecipeNameFilter,
  setRecipeTagsFilter,
  setMaxRecipesShown,
  setRecipesPageOffset,
} from '../../actions/actions';
import selectRecipes from '../../selectors/recipes';
import currentTags from '../../selectors/currentTags';
import tagsToOptions from '../../selectors/tagsToOptions';

class RecipesFilter extends Component {
  onNameChange = e => {
    this.props.setRecipeNameFilter(e.target.value);
    this.props.setRecipesPageOffset(0);
  };
  onTagsChange = (e, data) => {
    this.props.setRecipeTagsFilter(data.value);
    this.props.setRecipesPageOffset(0);
  };
  onPageChange = (e, { activePage }) => {
    this.props.setRecipesPageOffset(activePage - 1);
  };
  calculatePaginationInfo = () => {
    const {
      recipesLength,
      recipesFilter: { maxRecipesShown },
    } = this.props;
    if (recipesLength && maxRecipesShown) {
      const totalPages =
        recipesLength % maxRecipesShown === 0
          ? Math.floor(recipesLength / maxRecipesShown)
          : Math.floor(recipesLength / maxRecipesShown) + 1;
      return { totalPages };
    }
    return { totalPages: 0 };
  };
  render() {
    const { tagOptions } = this.props;
    const { name, tags, offset } = this.props.recipesFilter;
    const { totalPages } = this.calculatePaginationInfo();
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
          <Pagination
            secondary
            activePage={offset + 1}
            totalPages={totalPages}
            size="mini"
            ellipsisItem={false}
            boundaryRange={0}
            firstItem={false}
            lastItem={false}
            siblingRange={1}
            onPageChange={this.onPageChange}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  const visibleRecipes =
    state.recipes && selectRecipes(state.recipes, state.recipesFilter);
  return {
    recipesLength: visibleRecipes && visibleRecipes.length,
    recipesFilter: state.recipesFilter,
    tagOptions: state.recipes && tagsToOptions(currentTags(visibleRecipes)),
  };
};

const mapDispatchToProps = dispatch => ({
  setRecipeNameFilter: name => dispatch(setRecipeNameFilter(name)),
  setRecipeTagsFilter: tags => dispatch(setRecipeTagsFilter(tags)),
  setMaxRecipesShown: max => dispatch(setMaxRecipesShown(max)),
  setRecipesPageOffset: offset => dispatch(setRecipesPageOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesFilter);

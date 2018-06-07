import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input, Dropdown, Pagination } from 'semantic-ui-react';
import {
  setRecipeNameFilter,
  setRecipeTagsFilter,
  setMaxRecipesShown,
  setRecipesPageOffset,
  setSortBy,
} from '../../actions/actions';
import {
  SORT_BY_USER_RATING,
  SORT_BY_TOTAL_RATING,
  SORT_BY_NEWEST,
  SORT_BY_OLDEST,
  SORT_BY_COOKING_TIME,
  SORT_BY_TOTAL_TIME,
} from '../../actions/types';
import selectRecipes from '../../selectors/recipes';
import currentTags from '../../selectors/currentTags';
import {
  tagsToDisplayOptions,
  tagToRenderLabel,
} from '../../selectors/allTags';

const sortByOptions = [
  {
    key: SORT_BY_TOTAL_RATING,
    text: SORT_BY_TOTAL_RATING.replace('_', ' '),
    value: SORT_BY_TOTAL_RATING,
  },
  {
    key: SORT_BY_USER_RATING,
    text: SORT_BY_USER_RATING.replace('_', ' '),
    value: SORT_BY_USER_RATING,
  },
  {
    key: SORT_BY_NEWEST,
    text: SORT_BY_NEWEST.replace('_', ' '),
    value: SORT_BY_NEWEST,
  },
  {
    key: SORT_BY_OLDEST,
    text: SORT_BY_OLDEST.replace('_', ' '),
    value: SORT_BY_OLDEST,
  },
  {
    key: SORT_BY_COOKING_TIME,
    text: SORT_BY_COOKING_TIME.replace('_', ' '),
    value: SORT_BY_COOKING_TIME,
  },
  {
    key: SORT_BY_TOTAL_TIME,
    text: SORT_BY_TOTAL_TIME.replace('_', ' '),
    value: SORT_BY_TOTAL_TIME,
  },
];

class RecipesFilter extends Component {
  onNameChange = e => {
    this.props.setRecipeNameFilter(e.target.value);
    this.props.setRecipesPageOffset(0);
  };
  onTagsChange = (e, data) => {
    this.props.setRecipeTagsFilter(data.value);
    this.props.setRecipesPageOffset(0);
  };
  onSortByChange = (e, { value }) => {
    this.props.setSortBy(value);
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
    const { name, tags, offset, sortBy } = this.props.recipesFilter;
    const { totalPages } = this.calculatePaginationInfo();
    return (
      <Menu secondary stackable size="mini">
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
              renderLabel={tagToRenderLabel}
              onChange={(e, data) => this.onTagsChange(e, data)}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              button
              text="sort by"
              value={sortBy}
              options={sortByOptions}
              onChange={(e, data) => this.onSortByChange(e, data)}
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
          <Menu.Item>
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
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let visibleRecipes;
  if (ownProps.dashboard) {
    visibleRecipes =
      state.recipes &&
      state.auth &&
      selectRecipes(
        state.recipes.filter(recipe => recipe._user === state.auth._id),
        state.recipesFilter,
        state.auth
      );
  } else {
    visibleRecipes =
      state.recipes &&
      selectRecipes(state.recipes, state.recipesFilter, state.auth);
  }
  return {
    recipesLength: visibleRecipes && visibleRecipes.length,
    recipesFilter: state.recipesFilter,
    tagOptions:
      state.recipes && tagsToDisplayOptions(currentTags(visibleRecipes)),
  };
};

const mapDispatchToProps = dispatch => ({
  setRecipeNameFilter: name => dispatch(setRecipeNameFilter(name)),
  setRecipeTagsFilter: tags => dispatch(setRecipeTagsFilter(tags)),
  setMaxRecipesShown: max => dispatch(setMaxRecipesShown(max)),
  setRecipesPageOffset: offset => dispatch(setRecipesPageOffset(offset)),
  setSortBy: sortByFilter => dispatch(setSortBy(sortByFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesFilter);

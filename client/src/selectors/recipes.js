import {
  SORT_BY_USER_RATING,
  SORT_BY_NEWEST,
  SORT_BY_OLDEST,
  SORT_BY_COOKING_TIME,
  SORT_BY_TOTAL_TIME,
} from '../actions/types';

export default (recipes, { name, tags, sortBy }, user) =>
  recipes
    .filter(recipe => {
      // console.log(recipe);
      const nameMatch = recipe.name.toLowerCase().includes(name.toLowerCase());
      const tagsMatch =
        tags.length === 0 ||
        tags.every(tag => recipe.category.indexOf(tag) > -1);
      // console.log(nameMatch, tagsMatch);
      return nameMatch && tagsMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case SORT_BY_NEWEST:
          return a.lastModified < b.lastModified ? -1 : 1;
        case SORT_BY_OLDEST:
          return a.lastModified < b.lastModified ? 1 : -1;
        case SORT_BY_COOKING_TIME: {
          if (b.cookingTime === 0) {
            return -1;
          }
          if (a.cookingTime === 0) {
            return 1;
          }
          return a.cookingTime < b.cookingTime ? -1 : 1;
        }
        case SORT_BY_TOTAL_TIME: {
          const aTime = a.cookingTime + a.preparationTime;
          const bTime = b.cookingTime + b.preparationTime;
          if (bTime === 0) {
            return -1;
          }
          if (aTime === 0) {
            return 1;
          }
          return aTime < bTime ? -1 : 1;
        }
        case SORT_BY_USER_RATING: {
          if (user) {
            const aRatingObj = a.rating.find(rate => rate._user === user._id);
            const bRatingObj = b.rating.find(rate => rate._user === user._id);
            const aRating = aRatingObj ? aRatingObj.rating : 0;
            const bRating = bRatingObj ? bRatingObj.rating : 0;

            return aRating < bRating ? 1 : -1;
          }
          // break omitted
        }
        // eslint-disable-next-line no-fallthrough
        default: {
          // Default is TOTAL RATING
          const aTotalRating = a.rating.length
            ? a.rating.reduce((prev, curr) => prev + curr.rating, 0) /
              a.rating.length
            : 0;
          const bTotalRating = b.rating.length
            ? b.rating.reduce((prev, curr) => prev + curr.rating, 0) /
              b.rating.length
            : 0;
          return aTotalRating < bTotalRating ? 1 : -1;
        }
      }
    });

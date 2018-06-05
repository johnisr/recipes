export default (recipes, id) => {
  const index = recipes.findIndex(r => r._id === id);
  let prevUrl;
  let nextUrl;
  let prevDisabled;
  let nextDisabled;

  if (index !== 0) {
    prevUrl = `/recipes/${recipes[index - 1]._id}`;
    prevDisabled = false;
  } else {
    prevUrl = '';
    prevDisabled = true;
  }
  if (index !== recipes.length - 1) {
    nextUrl = `/recipes/${recipes[index + 1]._id}`;
    nextDisabled = false;
  } else {
    nextUrl = '';
    nextDisabled = true;
  }
  return { prevUrl, prevDisabled, nextUrl, nextDisabled };
};

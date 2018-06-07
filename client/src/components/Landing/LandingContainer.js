import React from 'react';
import { CarouselProvider } from 'pure-react-carousel';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Landing from './Landing';
import seededRandom from '../../utils/seededRandom';

const LandingContainer = props => {
  const { recipes, seed } = props;
  if (recipes === null) {
    return <Loader active content="Loading" size="large" />;
  }

  let start = seed;
  const randomRecipes = recipes
    .filter(recipe => recipe.imageUrl && !!recipe.imageUrl[0])
    // eslint-disable-next-line no-plusplus
    .sort(() => 0.5 - seededRandom(start++));

  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={70}
      totalSlides={randomRecipes.length}
      interval={10000}
      isPlaying
    >
      <Landing recipes={randomRecipes} />
    </CarouselProvider>
  );
};

const mapStateToProps = ({ recipes, carousel }) => ({
  recipes,
  seed: carousel.seed,
});

export default connect(mapStateToProps)(LandingContainer);

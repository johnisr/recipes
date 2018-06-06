import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export class Landing extends Component {
  componentDidUpdate() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }
  startUrl = 'https://s3.amazonaws.com/ramosrecipes/';
  render() {
    const { recipes } = this.props;
    if (recipes === null) {
      return <Loader active content="Loading" size="large" />;
    }
    return (
      <div>
        <div>Click Recipes to see a list of recipes</div>
        <div>Login to add recipes</div>
        <CarouselProvider
          naturalSlideWidth={160}
          naturalSlideHeight={90}
          totalSlides={recipes.length}
          interval={5000}
          isPlaying
        >
          <Slider>
            {recipes.sort(() => 0.5 - Math.random()).map((recipe, index) => (
              <Slide index={index} key={recipe._id}>
                <h2>{recipe.name}</h2>
                <Link to={`/recipes/${recipe._id}`}>
                  <img
                    src={`${this.startUrl}${recipe.imageUrl[0]}`}
                    alt={recipe.name}
                  />
                </Link>
              </Slide>
            ))}
          </Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes:
    state.recipes &&
    state.recipes.filter(recipe => recipe.imageUrl && !!recipe.imageUrl[0]),
});

export default connect(mapStateToProps)(Landing);

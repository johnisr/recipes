import React, { Component } from 'react';
import { Loader, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
  Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Landing.css';

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
      <CarouselProvider
        naturalSlideWidth={150}
        naturalSlideHeight={90}
        totalSlides={recipes.length}
        interval={10000}
        isPlaying
      >
        <div className="slider__container">
          <Slider className="slider">
            {recipes.sort(() => 0.5 - Math.random()).map((recipe, index) => (
              <Slide index={index} key={recipe._id}>
                <h2 className="slider__title">{recipe.name}</h2>
                <h4 className="slider__subtitle">{recipe.summary}</h4>

                <Link to={`/recipes/${recipe._id}`}>
                  <Image
                    className="slider__image"
                    src={`${this.startUrl}${recipe.imageUrl[0]}`}
                    alt={recipe.name}
                    width="100%"
                  />
                </Link>
              </Slide>
            ))}
          </Slider>
          <Button
            as={ButtonBack}
            inverted
            icon
            size="large"
            className="slider__button--left"
          >
            <Icon name="angle left" />
          </Button>
          <Button
            as={ButtonNext}
            icon
            inverted
            size="large"
            className="slider__button--right"
          >
            <Icon name="angle right" />
          </Button>
          {recipes.map((r, index) => (
            <Button
              as={Dot}
              circular
              key={`${r._id}button`}
              size="mini"
              compact
              slide={index}
              color="black"
            />
          ))}
        </div>
      </CarouselProvider>
    );
  }
}

const mapStateToProps = state => ({
  recipes:
    state.recipes &&
    state.recipes.filter(recipe => recipe.imageUrl && !!recipe.imageUrl[0]),
});

export default connect(mapStateToProps)(Landing);

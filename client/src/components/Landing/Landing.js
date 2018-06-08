import React, { Component } from 'react';
import { Button, Icon, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  WithStore,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Dot,
  Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  setCarouselNumLoadedSlides,
  setCurrentSlideIndex,
} from '../../actions/actions';
import './Landing.css';

export class Landing extends Component {
  // coming back to landing page takes you to slide before page change
  componentDidMount() {
    const { currentSlide, currentSlideIndex, carouselStore } = this.props;
    if (currentSlideIndex !== currentSlide) {
      carouselStore.setStoreState({ currentSlide: currentSlideIndex });
    }
  }
  // Allows for lazy loading, keeping track of current slide
  componentDidUpdate() {
    const {
      recipes,
      currentSlide,
      numLoadedSlides,
      currentSlideIndex,
    } = this.props;
    if (currentSlide + 2 >= numLoadedSlides && currentSlide < recipes.length) {
      this.props.setCarouselNumLoadedSlides(numLoadedSlides + 1);
    }
    if (currentSlideIndex !== currentSlide) {
      this.props.setCurrentSlideIndex(currentSlide);
    }
  }
  startUrl = 'https://s3.amazonaws.com/ramosrecipes/';
  createPageButtons = () => {
    const { recipes, numLoadedSlides, currentSlide } = this.props;
    if (numLoadedSlides < 10 || currentSlide < 8) {
      return (
        <div>
          {recipes
            .slice(0, Math.min(10, numLoadedSlides))
            .map((r, index) => (
              <Button
                as={Dot}
                circular
                key={`${r._id}button`}
                size="small"
                compact
                slide={index}
                className={
                  index === currentSlide ? 'slider__dot--active' : 'slider__dot'
                }
              />
            ))}
          {numLoadedSlides > 10 && (
            <Button
              as={Dot}
              circular
              key="lastButton"
              size="small"
              compact
              content={Math.min(numLoadedSlides, recipes.length - 1)}
              slide={Math.min(numLoadedSlides, recipes.length - 1)}
              className="slider__dot"
            />
          )}
        </div>
      );
    }
    return (
      <div>
        <Button
          as={Dot}
          circular
          key="firstButton"
          size="small"
          compact
          content={1}
          slide={0}
          className="slider__dot"
        />
        {recipes
          .slice(
            currentSlide - 4,
            Math.min(currentSlide + 4, numLoadedSlides, recipes.length - 1)
          )
          .map((r, index) => (
            <Button
              as={Dot}
              circular
              key={`${r._id}button`}
              size="small"
              content={currentSlide - 4 + index}
              compact
              slide={currentSlide - 4 + index}
              className={index === 4 ? 'slider__dot--active' : 'slider__dot'}
            />
          ))}
        <Button
          as={Dot}
          circular
          key="lastButton"
          size="small"
          compact
          content={Math.min(numLoadedSlides, recipes.length - 1)}
          slide={Math.min(numLoadedSlides, recipes.length - 1)}
          className={
            currentSlide === Math.min(numLoadedSlides, recipes.length - 1)
              ? 'slider__dot--active'
              : 'slider__dot'
          }
        />
      </div>
    );
  };
  render() {
    const { recipes, numLoadedSlides } = this.props;

    return (
      <div className="slider__container">
        <Slider className="slider">
          {recipes.slice(0, numLoadedSlides).map((recipe, index) => (
            <Slide index={index} key={recipe._id}>
              <h2 className="slider__title">{recipe.name}</h2>
              <h4 className="slider__subtitle">{recipe.summary}</h4>
              <Image
                className="slider__image"
                src={`${this.startUrl}${recipe.imageUrl[0]}`}
                alt={recipe.name}
                width="100%"
                height="auto"
                renderLoading={() => (
                  <Loader active content="Loading" size="large" />
                )}
              />
              <Button
                as={Link}
                to={`/recipes/${recipe._id}`}
                inverted
                icon
                size="large"
                className="slider__link"
              >
                <Icon name="info" />
                Get Recipe
              </Button>
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
        <div className="slider__dots">{this.createPageButtons()}</div>
      </div>
    );
  }
}

const mapCarouselStateToProps = state => ({
  currentSlide: state.currentSlide,
});

const mapStateToProps = state => ({
  numLoadedSlides: state.carousel.numLoadedSlides,
  currentSlideIndex: state.carousel.currentSlideIndex,
});

const mapDispatchToProps = dispatch => ({
  setCarouselNumLoadedSlides: numLoadedSlides =>
    dispatch(setCarouselNumLoadedSlides(numLoadedSlides)),
  setCurrentSlideIndex: currentSlideIndex =>
    dispatch(setCurrentSlideIndex(currentSlideIndex)),
});

export default WithStore(
  connect(mapStateToProps, mapDispatchToProps)(Landing),
  mapCarouselStateToProps
);

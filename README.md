# Recipes [![Build Status](https://travis-ci.org/johnisr/recipes.svg?branch=master)](https://travis-ci.org/johnisr/recipes)

A recipe website that users can add, edit, and delete recipes

A live demo can be found [here](https://ramosrecipes.herokuapp.com/)

## Features

* React/Redux frontend bootstrapped by create-react-app
* Node/Express/MongoDB backend
* Google OAuth authentication
* File Image Upload to Amazon S3
* Unit testing with enzyme and jest, E2E testing with jest and puppeteer
* Continuous Integration with Travis CI
* Lazy loaded image slideshow
* Routing with React Router, form handling with Redux Form

## Build

* yarn install in /recipes folder
* yarn install in /recipes/clients folder
* Create the following keys needed in config/keys.js:
  * googleClientID and googleClientSecret at https://developers.google.com for this project
  * mongoURI at https://mlab.com/ or a similar mongoDB hosing website
  * A long, random cookieKey for use in cookieSession
  * an accessKeyId and secretAccessKey AWS S3 at https://aws.amazon.com/s3/
* Change the .travis.yml file to deploy at your own web site.

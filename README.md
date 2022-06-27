# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

The project allows a user to enter any artist name, and then shows details for the artist like:

- Name of Artist
- Image
- Links to social media handles

Once the artist is clicked, all the upcoming events of the artist are displayed to the user with the following details for each event:

- Country
- City
- Venue
- Date

## Technical Details

**ReactJS** was chosen as the framework of choice for the project. **SASS/CSS** was used as the css framework for styling. The entire application is responsive for mobile, tablet and desktop devices, this responsiveness is achieved through pure css. **Axios** has been used to make calls to the bandsintown API featuring a clean services architecture and exception handling. **React-Router-Dom** is being used to handle routing on the single page web application. **Context API** is used to provide data to all the components throughout the application

## Basic Features

All required basic features are implemented minus unit tests as I have no prior experience with QA/Testing. Although, for what it's worth, I've checked as many edge cases as I can regarding the API, handled and mentioned them in code comments.

## Bonus Features (3/3)

- Persistence: Session Storage is used to persist the last searched artist and events data across browser reloads to ensure a bandwidth efficient application
- Creative: Some added features are:
  - Dynamically generated social icons that lead to the respective social handles of artists (Search Machine Gun Kelly for all icons, as she has all the handles available in the API)
- Deployment: Netlify has been utilized to provide hosting at: https://star-finder.netlify.app/

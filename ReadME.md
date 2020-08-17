# Welcome to What's For Dinner!!!
If you've ever had the debate with friends or loved ones about "What Should We Do For Dinner", then this app is for you!  This application is designed remove the endless scrolling through pages of results on food websites and provide you with 3 quick options to choose from - complete with contact info, user ratings, reviews and more.  

This application was built using Node.js and Express.js.  It utilizes the MVC build pattern along with PostGreSQL/PG-Promise for data storage.  External data is obtained by utilizing the [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3).  Users have the option to log-in and create a user profile with user authentication via passport and bcrypt.js.  It was deployed via Heroku and uses continuous integration.
![todo](./assets/todo.jpg)

# Deployed At:
[What's For Dinner](https://immense-citadel-39219.herokuapp.com/)

### Prerequisites
The following node package managers will be needed for the application to funcation properly

```
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.5",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.3",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "method-override": "^3.0.0",
    "morgan": "^1.10.0",
    "node": "^14.7.0",
    "node-fetch": "^2.6.0",
    "nodemon": "^2.0.4",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "pg-promise": "^10.5.8",
    "yelp-fusion": "^3.0.0"
```
```
    Use npm install --save to install each NPM above.  EX: npm install --save pg-promise
```

## User Stories:

The following user stories:
- User should be able to utilitze the What's For Dinner search function without having to login upon reaching the main root
- User should be able to review search results including detailed views of returned results
- User will have the ability to create and account which allows for full funcationality
- With logging in, user will be able to select and save dinner/result choices under their user profile for future reference
- Upon logging in, user can review any previously saved/select restaurants they visited
- User will have the ability to make notes on selected choice prior to saving
- Along with editing notes on saved restaurants, users can also edit their user profiles including passwords as needed.  Usernames may not be changed.

## Wireframes and Schemas:
The wireframes [here](./wireframes_schemas/Wireframes_Project2_Restaurant_Finder.pdf). 

Database Schemas (Initial - the have been slightly changed) [here](./wireframes_schemas/initial_DV_Schema_Plans.pdf). 

## Exposed HTML Routes:
/user
/user/profile
/user/index
/user/edit
/restaurants
/restaurants/add
/restaurants/detail
/restaurants/index
/auth
/auth/login
/auth/register


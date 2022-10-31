# Tour Blimey

A responsive tour listings web app using TypeScript and the MERN stack (MongoDB, Express, React, Node) along with Redux Toolkit for state management.

Users can sign up, sign in, see a list of all tours posted, add their own tours, edit them, delete them and sign out again. If they try to access a protected route while signed out, they will be redirected to the login page following a 5-second countdown.

---

## Video Demo

https://user-images.githubusercontent.com/97295867/198896436-d836b11f-d3e4-4eaf-bc8a-477812412d1c.mp4

(note to self: features to demonstrate in 2nd video - responsiveness, search, get by tags, likes, comments)

---

## Technologies Used

* TypeScript
* JavaScript
* React
* Express
* MongoDB
* Redux Toolkit
* Material Design for Bootstrap
* MUI Icons
* React Toastify
* jsonwebtoken

---

## Database Setup

Install MongoDB. If you are using a Mac you can do this via [Homebrew](https://brew.sh/):

```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Set your local MongoDB data directory, for example:

```
mkdir $HOME/mongodb-data
```

Start MongoDB:

```
mongod --dbpath $HOME/mongodb-data
```

Set your MongoDB URI:

```
echo MONGO_URI=mongodb://localhost:27017/tour-blimey >> .env
```

---

## Installation

Run `npm install` from both the `./server` and `./client` directories.

---

## Running

Launch MongoDB with `mongod`.

Run `npm run dev` from the `./server` directory and visit [http://localhost:3000](http://localhost:3000) in the browser if you're not automatically directed there.

---

[Jonny Abrams](https://github.com/jonnyabrams)

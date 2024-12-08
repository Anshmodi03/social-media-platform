# Connectify

Connectify is a full-featured social media web application built with the MERN stack (MongoDB, Express.js, React, and Node.js). This platform allows users to connect with friends, share posts, view advertisements, and build a personalized profile.

## Table of Contents

- [Connectify](#connectify)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)

## Features

- **User Authentication**: Register and login securely with JWT-based authentication.
- **Profiles**: Create and update a personal profile with pictures and information.
- **Posts**: Create, edit, and delete posts with rich media support.
- **Friends List**: Add or remove friends to connect with others.
- **Real-Time Notifications**: Get notifications on new friend requests and other activities.
- **Dark & Light Modes**: Seamlessly switch between dark and light themes.
- **Responsive Design**: Fully responsive for an optimized mobile and desktop experience.

## Installation

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have these installed:

- Node.js
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### Steps

1.  **Clone the repository**

        bash

        Copy code

        `git clone https://github.com/your-username/connectify.git

    cd connectify`

2.  **Install dependencies for the client and server**

    bash

    Copy code

    `# Install server dependencies
    cd server
    npm install

    # Install client dependencies

    cd ../client
    npm install`

3.  **Set up environment variables**

        In both the `server` and `client` directories, create a `.env` file with the following:

        **Server `.env`**

        env

        Copy code

        `PORT=8000

    MONGO_URI=mongodb://localhost:27017/connectify
    JWT_SECRET=your_jwt_secret`

        **Client `.env`**

        env

        Copy code

        `REACT_APP_API_URL=http://localhost:8000`

4.  **Run the development servers**

        Open two terminals, one for the client and one for the server:

        - **Server**

          bash

          Copy code

          `cd server

    npm start`

        - **Client**

          bash

          Copy code

          `cd client

    npm start`

5.  **Visit the app**

    Open your browser and go to http://localhost:3000.

## Usage

- **Sign Up**: Register with your email and password to create an account.
- **Create a Profile**: Add a profile picture, bio, and other details.
- **Connect with Friends**: Find and add friends on the platform.
- **Make Posts**: Share posts with your friends and see what they share.
- **Dark Mode**: Use dark mode by toggling in the navbar for a comfortable viewing experience.

## Technologies Used

- **Frontend**: React, Material UI, Redux, Tailwind CSS (or any CSS framework)
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel (Frontend), Heroku/MongoDB Atlas (Backend)

## Folder Structure

csharp

Copy code

`connectify/
│
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # Reusable components
│       ├── scenes/       # Page-specific components
│       ├── state/        # Redux setup
│       └── App.js
│
└── server/               # Express backend
    ├── controllers/      # Business logic
    ├── models/           # Mongoose models
    ├── routes/           # Express routes
    ├── middleware/       # Authentication middleware
    └── server.js         # Server entry point`

## Contributing

1.  Fork the repository.
2.  Create a new branch.
3.  Make your changes.
4.  Commit and push to your fork.
5.  Create a pull request.

We welcome contributions that enhance Connectify!

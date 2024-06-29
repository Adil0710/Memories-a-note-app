# Fullstack Notes App

A fullstack web application built with the MERN stack that allows users to sign up, log in, create, update, delete, and download notes in text format. This app features modern UI/UX with various libraries and frameworks.

## Features

- User Authentication with JWT
- Create, Update, Delete Notes
- Download Notes in Text Format
- Modern UI/UX
- Secure and Efficient

## Tech Stack

### Frontend
- **React.js**: For building dynamic user interfaces
- **Tailwind CSS**: For modern, responsive design
- **Ant Design (AntD)**: For polished UI components
- **GSAP & ScrollTrigger**: For animations and scroll interactions
- **Locomotive.js**: For smooth scrolling effects
- **React Router**: For routing and navigation

### Backend
- **Node.js**: For server-side JavaScript
- **Express.js**: For building RESTful APIs
- **MongoDB**: For database management

### Security
- **JWT (JSON Web Tokens)**: For secure user authentication

## Getting Started

### Prerequisites

Make sure you have the following installed on your local development machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/fullstack-notes-app.git
    cd fullstack-notes-app
    ```

2. **Install dependencies:**

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the App

1. **Start the backend server:**

    ```bash
    cd server
    npm start
    ```

2. **Start the frontend development server:**

    ```bash
    cd ../client
    npm start
    ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

1. **Sign up** for an account.
2. **Log in** with your credentials.
3. **Create, update, and delete notes** as needed.
4. **Download notes** in text format.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [GSAP](https://greensock.com/gsap/)
- [Locomotive.js](https://locomotivemtl.github.io/locomotive-scroll/)
- [React Router](https://reactrouter.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

Happy coding! 🚀

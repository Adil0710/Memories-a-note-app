# Memories Notes App <img src="./frontend/public/logo192.png" width="30" height="30">

A fullstack web application built with the MERN stack that allows users to sign up, log in, create, update, delete, and download notes in text format. This app features modern UI/UX with various libraries and frameworks. <br /> <br />
[Click here](https://memories-note-app.vercel.app/) to preview

## App Screenshots
![Screenshot (5)](https://github.com/Adil0710/Memories-a-note-app/assets/91872021/1d306c61-908d-4a84-8d0a-390a36b8c7bd)

![Screenshot (6)](https://github.com/Adil0710/Memories-a-note-app/assets/91872021/9481f0f6-c1ee-48b1-8934-83cac7204783)
![light](https://github.com/Adil0710/Memories-a-note-app/assets/91872021/d4854f58-76f2-421b-a209-e4cfaf5397cd)
![dark](https://github.com/Adil0710/Memories-a-note-app/assets/91872021/feb30706-0ac0-4373-ac6b-ad550db7ab73)



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
    git clone https://github.com/Adil0710/Memories-a-note-app.git
    cd Memories-a-note-app
    ```

2. **Install dependencies:**

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd frontend
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
    npm run dev
    ```

2. **Start the frontend development server:**

    ```bash
    cd frontend
    npm start
    ```

The application should now be running on [http://localhost:3001](http://localhost:3001).

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

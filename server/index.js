// Load env variables
import { config } from "dotenv";
//if(process.env.NODE_ENV !== 'production'){
    config()


// Import dependencies
import express from "express";
import cors from "cors"
import connectToDb from "./config/connectToDb.js";
import { createNote, fetchNote, fetchNotes, updateNote, deleteNote } from "./controllers/notesController.js";
import { signup, login, logout, checkAuth } from "./controllers/usersController.js";
import CookieParser from "cookie-parser";
import { requireAuth } from "./middleware/requireAuth.js";

// Create an express app
const app = express()

// Configure express app
app.use(express.json())
app.use(CookieParser())
app.use(cors({
    origin: true,
    credentials: true,
}))

// Connect to DB
connectToDb()


// Routing
app.get('/', (req, res) => {
    res.json("hello")
})
app.post('/signup', signup)
app.post('/login', login)
app.get('/logout', logout)
app.get('/check-auth', requireAuth, checkAuth)

app.get('/notes', requireAuth, fetchNotes)
app.get('/notes/:id', requireAuth, fetchNote)
app.post('/notes', requireAuth, createNote)
app.put('/notes/:id', requireAuth, updateNote)
app.delete('/notes/:id', requireAuth, deleteNote)

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`)
});

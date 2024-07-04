import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../helpers/sendEmail.js";
import registerEmail from "../helpers/registerEmail.js";

// Helper function to get cookie settings
const getCookieSettings = () => ({
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
});

// Signup endpoint
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists with the provided email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered. Please use a different email or login." });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create a new user
        await User.create({ name, email, password: hashedPassword });

        // Send Welcome Email
        await sendEmail(email, "Welcome to Memories ✨", "", registerEmail(name));
        console.log('Email sent successfully');

        // Respond with success message
        res.status(200).json({ msg: `${name} signed up successfully.` });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ msg: "An error occurred while signing up. Please try again later." });
    }
};

// Login endpoint
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with requested email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({ msg: "User not found. Please check your email address or signup." });
        }

        // Compare sent in password with found user password hash
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Password does not match for user:', user.email);
            return res.status(401).json({ msg: "Invalid password. Please try again." });
        }

        // Create a JWT token
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

        // Set the cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            ...getCookieSettings(),
        });

        // Send response with user info
        res.status(200).json({ user: user.name, msg: "Logged in successfully" });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: "An error occurred while logging in. Please try again later." });
    }
};

// Logout endpoint
const logout = async (req, res) => {
    try {
        res.clearCookie("Authorization", getCookieSettings());
        console.log('Cookie cleared');
        res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ msg: "An error occurred while logging out. Please try again later." });
    }
};

// Check authentication endpoint
const checkAuth = async (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        console.error('Error during checkAuth:', error);
        res.sendStatus(400);
    }
};

export { signup, login, logout, checkAuth };

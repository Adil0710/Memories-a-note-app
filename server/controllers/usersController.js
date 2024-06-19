import User from "../models/user.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

async function signup (req, res) {
    try {
    // Get the name, email and password from the req body
    const {name, email, password} = req.body
    
    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8)

    // Create user with the data
    await User.create({name, email, password: hashedPassword})

    // Respond 
    res.sendStatus(200)        
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

async function login(req, res) {
    try {
        // Get the email and password from req body
        const { email, password } = req.body;

        // Find the user with requested email
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({msg: "User not found. Please check your email address or signup." });
        }

        // Compare sent in password with found user password hash
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Password does not match');
            return res.status(401).json({ msg: "Invalid password. Please try again." });
        }

        // Create a JWT token
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

        // Set the cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        // Send response with user info
        res.status(200).json({ user: user.name, msg: "Logged in successfully" });

    } catch (error) {
        console.log('Error:', error);
        res.status(400).json({ msg: "An error occurred" });
    }
}

function logout (req, res) {
    try {
        res.clearCookie("Authorization")
        res.sendStatus(200) 
    } catch (error) {
        console.log(error);
        res.sendStatus(400)
    }
}

function checkAuth(req, res){
    try {
        res.sendStatus(200) 
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export{signup, login, logout, checkAuth}
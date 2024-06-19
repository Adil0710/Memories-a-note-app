import jwt  from "jsonwebtoken";
import User from "../models/user.js";
async function requireAuth(req, res, next){
    try {
    // Read token off cookies
    const token = req.cookies.Authorization

    // Decode the cookie
    const decoded = jwt.verify(token, process.env.SECRET)

    // Check expiration
    if (Date.now() > decoded.exp) return res.sendStatus(401)

    // Find user using decoded sub
    const user = await User.findById(decoded.sub)
    if(!user) return res.sendStatus(401)

    // Attach user to req
    req.user = user

    // Continue on
    next()
    }catch (error) {
        return res.sendStatus(401)
    }
}

export {requireAuth}
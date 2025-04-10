const User = require("../model/User");

const checkTokenExpiry = (req, res, next) => {

    const token = req.cookies.token;

    try {
        const user = User.findOne({ googleId: token })
        if (!user) {
            res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        const currentTime = Math.floor(Date.now() / 1000); // in seconds

        if (user.exp < currentTime) {
            return res.status(401).json({
                success: false,
                message: "Token expired",
            });
        }

        req.user = {
            googleId: user.googleId,
            emailverified: user.emailverified,
            email: user.email,
            id: user._id
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to verify token"
        })
    }
};

module.exports = {
    checkTokenExpiry
}
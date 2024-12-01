const { secret } = require("../config")
const jwt = require("jsonwebtoken")

const generateAccessToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: "1d" })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: "30d" })
}
const getUserData = (req) => {
    const token = req?.headers?.authorization?.split(' ')[1]
    try {
        if (token) {
            const data = jwt.verify(token, secret)
            return data
        } else {
            return null
        }
    } catch (error) {
        return
    }
}

module.exports = { generateAccessToken, generateRefreshToken, getUserData }
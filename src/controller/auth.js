const { generateAccessToken, generateRefreshToken } = require("../helpers/main");
const { userModel } = require("../model");
const bcrypt = require("bcrypt")


class Auth {
    async signIn(req, res) {
        try {
            const { username, pwd } = req.body
            console.log(username, pwd);
            const user = await userModel.findOne({ username })
            if (!user) {
                return res.status(400).json({ msg: "Пользовател не найденo", })
            }

            const isValidpwd = bcrypt.compareSync(pwd, user.pwd)
            if (!isValidpwd) {
                return res.status(400).json({ msg: `Пользовател не найденo` })
            }

            const accessToken = generateAccessToken({ id: user._id, username: user.username })
            const refreshToken = generateRefreshToken({ id: user._id, username: user.username });

            return res.status(201).json({ msg: "Пользователь успешно авторизовано!", accessToken, refreshToken, })
        } catch (error) {
            return res.status(500).json({ msg: "Error" })
        }
    }
    async SignUp(req, res) {
        try {
            const { username, pwd } = req.body

            // pwd, role, fullName,
            const isHasUserAlready = await userModel.findOne({ username })
            // console.log(isHasUserAlready, "isHasUserAlready");

            if (isHasUserAlready) {
                return res.status(400).json({ msg: "This username already exists" })
            }

            const hashpwd = bcrypt.hashSync(pwd, 10)
            const user = await userModel.create({ pwd: hashpwd, username })

            // if (role === "business") {
            //     await busProfileModel.create({ userId: user._id })
            // } else if (role === "personal") {
            //     await busProfileModel.create({ userId: user._id })
            // }

            const accessToken = generateAccessToken({ id: user._id, username: user.username })
            const refreshToken = generateRefreshToken({ id: user._id, username: user.username });

            return res.status(201).json({ msg: "Пользователь успешно зарегистрирован", refreshToken, accessToken, })

        } catch (error) {
            console.log(error.stack);
            
            return res.status(500).json({ msg: 'Что-то пошло не так, попробуйте снова', ...error });
            // return res.status(400).json("error")
        }
    }
}

module.exports = new Auth
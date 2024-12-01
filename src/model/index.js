const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, default: "", unique: true },
    pwd: { type: String, default: "" },
})

const requestSchema = new Schema({
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    isAnswered: { type: Boolean, default: false },
}, { timestamps: true })

const mentorSchema = new Schema({
    name: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    workExperience: { type: String, default: "" },
    image: { type: String, default: "" },
}, { timestamps: true })

const officePhotosSchema = new Schema({
    image: { type: String, default: "" }
}, { timestamps: true })

const userModel = model("users", userSchema)
const requestModel = model("requests", requestSchema)
const mentortModel = model("mentors", mentorSchema)
const officePhotosModel = model("officePhotos", officePhotosSchema)

module.exports = { userModel, requestModel, mentortModel, officePhotosModel }
const { mentortModel, officePhotosModel } = require("../model")
const IMAGE_URL = "http://157.173.121.178/api/src/uploads/"

class OurMentors {
    async addMentor(req, res) {
        try {
            const { name, jobTitle, workExperience } = req.body
            const { filename } = req.file

            const response = await mentortModel.create({ image: filename, name, jobTitle, workExperience })
            await res.json({ msg: "Успешно создано!", result: { ...response._doc, image: IMAGE_URL + response.image } })
        } catch (error) {
            return res.status(500).json({ msg: 'Что-то пошло не так, попробуйте снова', error });
        }
    }
    async editMentor(req, res) {
        try {
            const { name, jobTitle, workExperience, _id } = req.body

            if (req.file) {
                const response = await mentortModel.findByIdAndUpdate(_id, { image: req.file.filename, name, jobTitle, workExperience }, { new: true })
            } else {
                const response = await mentortModel.findByIdAndUpdate(_id, { name, jobTitle, workExperience }, { new: true })
            }

            await res.json({ msg: "Успешно редактировано!", })

        } catch (error) {
            return res.status(400).json({ "error": "error", error })
        }
    }
    async deleteMentor(req, res) {
        try {
            const { _id } = req.params
            const response = await mentortModel.findByIdAndDelete(_id)
            if (response) {
                await res.json({ msg: "Успешно удален!" })
            } else {
                return res.status(400).json({ msg: "delete error" })
            }
        } catch (error) {
            return res.status(400).json({ msg: "error" })
        }
    }
    async getMentor(req, res) {
        try {
            const { _id } = req.params
            const response = await mentortModel.findById(_id)
            await res.json({ ...response._doc, image: IMAGE_URL + response.image })
        } catch (error) {
            return res.status(400).json({ msg: "error" })
        }
    }
    async getMentors(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 20;  // Number of items per page
            const skip = (page - 1) * limit;

            const mentors = await mentortModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
            const count = await mentortModel.countDocuments()

            const reNameUrl = []
            for (let i = 0; i < mentors.length; i++) {
                const data = mentors[i]
                reNameUrl.push({ ...data._doc, image: IMAGE_URL + mentors[i]?.image })

            }
            await res.json({ result: reNameUrl, page: page, limit: limit, count })

        } catch (error) {
            return res.status(400).json({ msg: "error" })
        }
    }

    // ----------------------
    async addOfficePhoto(req, res) {
        try {
            const { filename } = req.file
            const response = await officePhotosModel.create({ image: filename })
            console.log(response);

            await res.json({ msg: "Успешно создано!", result: { ...response._doc, image: IMAGE_URL + response.image } })
        } catch (error) {

        }
    }
    async editOfficePhoto(req, res) {
        try {
            const response = await officePhotosModel.findByIdAndUpdate(req.body._id,
                { image: req.file.filename }, { new: true })

            await res.json({ msg: "Успешно редактировано!", })

        } catch (error) {
            return res.status(400).json({ "error": "error", error })
        }
    }
    async deleteOfficePhoto(req, res) {
        try {
            const { _id } = req.params
            const response = await officePhotosModel.findByIdAndDelete(_id)
            if (response) {
                await res.json({ msg: "Успешно удален!" })
            } else {
                return res.status(400).json({ msg: "delete error" })
            }
        } catch (error) {
            return res.status(400).json({ msg: "error" })
        }
    }
    async getOfficePhoto(req, res) {
        try {
            const { _id } = req.params

            const response = await officePhotosModel.findById(_id)

            await res.json({ ...response._doc, image: IMAGE_URL + response.image })
        } catch (error) {
            return res.status(400).json({ msg: "error" })
        }
    }
    async getOfficePhotos(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 20;  // Number of items per page
            const skip = (page - 1) * limit;

            const photo = await officePhotosModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
            const count = await officePhotosModel.countDocuments()

            const reNameUrl = []
            for (let i = 0; i < photo.length; i++) {
                const data = photo[i]
                reNameUrl.push({ ...data._doc, image: IMAGE_URL + photo[i]?.image })

            }

            await res.json({ result: reNameUrl, page: page, limit: limit, count })

        } catch (error) {
            return res.status(400).json({ msg: "error" })
        }
    }
}

module.exports = new OurMentors
const { requestModel } = require("../model")


class Request {
    async addRequest(req, res) {
        try {
            const { name, phone } = req.body
            const request = await requestModel.create({ name, phone })
            await res.json({ msg: "Успешно!", request })
        } catch (error) {
            return res.status(500).json({ msg: 'Что-то пошло не так, попробуйте снова', error: error.stack });
        }
    }
    async getRequests(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 30;  // Number of items per page
            const skip = (page - 1) * limit;

            const requests = await requestModel.find().skip(skip).limit(limit).sort({ createdAt: -1 })
            const count = await requestModel.countDocuments()

            await res.json({ result: requests, page: page, limit: limit, count })
        } catch (error) {
            return res.status(500).json({ msg: 'Что-то пошло не так, попробуйте снова', error });
        }
    }
    async deleteRequest(req, res) {
        try {
            const { _id } = req.params
            const result = await requestModel.findByIdAndDelete(_id)

            if (result) {
                return res.json({ msg: 'Request successfully deleted' });
            } else {
                return res.status(400).json({ msg: 'User not found or already deleted' });
            }

        } catch (error) {
            return res.status(400).json("error: deleteRequest")
        }
    }
    async isAnsweredRequest(req, res) {
        try {
            const result = await requestModel.findByIdAndUpdate(req.body._id, { isAnswered: req.body.isAnswered }, { new: true })
            if (result) {
                return res.json({ msg: 'Успешно!' });
            } else {
                return res.status(400).json({ msg: 'User not found or already deleted' });
            }

        } catch (error) {
            return res.status(400).json("error: isAnsweredRequest")
        }
    }
}

module.exports = new Request
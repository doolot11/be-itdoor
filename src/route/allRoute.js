
const Router = require("express")
const auth = require("../controller/auth")
const request = require("../controller/request")
const content = require("../controller/content")
const upload = require("../middlewares/upload")
const router = new Router()

// const User = require("./user")

router.post("/auth/sign-in", auth.signIn)
router.post("/auth/sign-up", auth.SignUp)
// -------------------------------------
router.post("/request/create", request.addRequest)
router.get("/request/get-all/:page?", request.getRequests)
router.delete("/request/delete/:_id", request.deleteRequest)
router.put("/request/isAnswered", request.isAnsweredRequest)
// ---------------------------------------
router.post("/mentor/add", upload.single("image"), content.addMentor)
router.put("/mentor/edit", upload.single("image"), content.editMentor)
router.delete("/mentor/delete/:_id", content.deleteMentor)
router.get("/mentor/get-one/:_id", content.getMentor)
router.delete("/mentor/get-all/:page?", content.getMentors)
// ---------------------------------------
router.post("/office/add", upload.single("image"), content.addOfficePhoto)
router.put("/office/edit", upload.single("image"), content.editOfficePhoto)
router.delete("/office/delete/:_id", content.deleteOfficePhoto)
router.delete("/office/get-one/:_id", content.getOfficePhoto)
router.delete("/office/get-all/:page?", content.getOfficePhotos)

module.exports = router
/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { username: "", pwd: "" }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"

 * /request/create:
 *   post:
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              { name: "", phone: "" }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * 
 * /request/get-all/?page=1:
 *   get:
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {  }
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /request/delete/id:
 *   delete:
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /request/isAnswered:
 *   put:
 *     tags: [Request]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {isAnswered: "true/false", _id: ""}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /mentor/add:
 *   post:
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {name: "", jobTitle: "", workExperience: "", image: {}}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /mentor/edit:
 *   put:
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {name: "", jobTitle: "", workExperience: "", _id: "",image: {}}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /mentor/delete/id:
 *   delete:
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /mentor/get-one/id:
 *   get:
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /mentor/get-all/?page=1:
 *   get:
 *     tags: [Mentor]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /office/add:
 *   post:
 *     tags: [Office]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {name: "", jobTitle: "", workExperience: "", image: {}}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /office/edit:
 *   put:
 *     tags: [Office]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {name: "", jobTitle: "", workExperience: "", _id: "",image: {}}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /office/delete/id:
 *   delete:
 *     tags: [Office]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /office/get-one/id:
 *   get:
 *     tags: [Office]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 * /office/get-all/?page=1:
 *   get:
 *     tags: [Office]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              {}
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
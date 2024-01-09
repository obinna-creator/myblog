const express= require("express")
const {newComment, getOne,getall, updates,deletecomment}= require("../blogcontrollers/commentController")
const router = express.Router()

router.post('/anotherpost', newComment)
router.get("/getone/:id", getOne)
router.get("/getAll", getall)
router.put("/updatecomment/:id",updates)
router.delete("/deletecomments/:id",deletecomment)
module.exports = router





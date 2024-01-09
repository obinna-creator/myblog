const commentModel= require("../blogModel/commentModel")
const blogModel= require("../blogModel/blogmodel")
exports.newComment = async (req, res) => {
    try {
        const id= req.body.id
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).json({
                message:"blog not found"
            })
        }
        const comment = await  commentModel.create(req.body)
        //post the comment into the comments field
        //  in the blog comment
        blog.comments.push(comment._id)
        comment.post = blog._id
        
        //save the changes in the database
        await blog.save()
        await comment.save()
        res.status(201).json({
            message: "successfully cposted a comment",
            data: comment
            
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await commentModel.findById(id);
        // populate('comments')
        if (!blog) {
            res.status(404).json({
                message:"blog not found"
            })
        }
        res.status(200).json({
            message: "viewing blog post",
            blog
            
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getall = async (req, res) => {
    try {
        const getAll = await commentModel.find()
        if ( getAll.length === 0) {
                res.status(404).json({
                message: "No comments available",
            });

            
        } else {
            res.status(200).json({
                message: "these are the comments available",
                getAll
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.updates = async (req, res) => {
    try {
        const id = req.params.id
        const { comment, post } = req.body
        const update = await commentModel.findByIdAndUpdate(id, { comment, post }, { new: true })
        // //save the update in the database 
        // await update.save()
        if (!update) {
            res.status(404).json({
               message:"update not successfull"
           })
        } else {
            
         res.status(200).json({
                message: "updated successfull",
                data:update
            })
        }

           
       

        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
exports.deletecomment = async (req, res) => {
    try {
        const id = req.params.id
    const deletecomment= await commentModel.findByIdAndDelete(id)
    if (!deletecomment) {
        res.status(400).json({
             message:"cannot delete comment"
         })
    } else {
        res.status(200).json({
            message: "comment deleted successfully",
            deletecomment
        })
     }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
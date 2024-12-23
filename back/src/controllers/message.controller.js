import User from "../models/user.model.js";
import Message from "../models/message.model.js"


export const getUsers =  async (req,res) => {
    try {
        const loogedInUserId = req.user._id;
        const filterdUsers = await User.find({_id: {$ne: loogedInUserId}}).select("-password")
        
        res.status(200).json(filterdUsers)
    } catch {
console.error(error.message)
res.status(500).json({error: " Internal server error "})
    }
}

export const getMsg = async (req, res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId, receverId:userToChatId},
                {senderId:userToChatId, receverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text,image} = req.body
        const {id:receverId} = req.params
        const senderId = req.user._id

        let imageUrl = ""
        if(image){
            const uploadedImage = await cloudinary.uploader.upload(image,{
                upload_preset:"chat_app"
            })
            imageUrl = uploadedImage.secure_url
        }
        const newMessage = new Message({
            senderId,
            receverId,
            text,
            image:imageUrl
        })

        await newMessage.save()
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Internal server error"})
    }
}
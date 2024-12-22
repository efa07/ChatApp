import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utilis.js";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req,res) => {
    const {fullName, email, password} = req.body;
    try {
        if (password.lenght < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const user =  await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({message: "User created successfully"});
        }
        else {
         res.status(400).json({message: "Failed to create user Invalid input!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        generateToken(user._id, res);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
    
}

export const logout = (req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
      
}

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userId =  req.user._id

        if(!profilePic) {
            return res.status(400).json({message: "Profile picture is required"});
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
            upload_preset: "dev_setups"
        });
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadedResponse.secure_url
        }, {new: true});
        res.status(200).json({
            message: "Profile updated successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}
export const checkAuth = (req,res) => {
    try {
        res.status(200).json({message: "User is authenticated"});
    } catch (error){
        console.log(error.message);
        res.status(500).json({message: "Internal server error"});
    }
}
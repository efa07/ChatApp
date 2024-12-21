import User from "../models/User";
import bcrypt from "bcryptjs";

export const signup = async (req,res) => {
    const {fulName, email, password} = req.body;
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
            return res.status(400).json({message: "Failed to create user"});
        }
    } catch (error) {
        console.log(error);
    }
}

export const login = (req,res) => {
    res.send("login page");
    
}

export const logout = (req,res) => {
    res.send("logout page");
      
}
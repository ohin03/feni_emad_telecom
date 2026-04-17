import userModel from "../models/userModel.js"; 
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";


//post register
export const registerController = async (req, res) => {
     try {
         const {name, email, password, phone, address, answer} = req.body;
        //validation
        if(!name){
            return res.send({ message: "Name is required"});
        }
        if(!email){
            return res.send({ message: "Email is required"});
        }
        if(!password){
            return res.send({ message: "Password is required"});
        }
        if(!phone){
            return res.send({ message: "Phone number is required"});
        }
        if(!address){
            return res.send({ message: "Address is required"});
        }
        if(!answer){
            return res.send({ message: "Answer is required"});
        }
         
        //checking user
        const existingUser = await userModel.findOne({email});
        //existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Already register please login'
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name, email, phone, address, password: hashedPassword, answer}).save();
        res.status(201).send({
            success: true,
            message: 'User register successfully',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration!!',
            error
        })
    }
};


//post login
export const loginControlller = async (req, res) => {
    try {
        const {email, password}= req.body;
        //validator
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid email or password!!"
            })
        }
     
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message: "User not found!!"
            })
        };
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid password!!"
            })
        }
 
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successful",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login!!",
            error
        })
    }
}


//test controller
export const testController = (req, res) => {
   res.send("protected Route");
}

//forgot password controller
export const forgotPasswordController = async (req,res) => {
    try {
        const {email, answer, newPassword} = req.body;
        if(!email){
            return res.status(400).send({message: "Email is required"})
        }
        if(!answer){
            return res.status(400).send({message: "Answer is required"})
        }
        if(!newPassword){
            return res.status(400).send({message: "New password is required"})
        }
        //check
        const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer!!"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong!!",
            error
        })
    }

}


// logout controller
export const logoutController = (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in logout!!",
            error
        });
    }
};
 
//update user profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);

    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters"
      });
    }

    const hashedPassword = password
      ? await hashPassword(password)
      : user.password;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile!!",
      error,
    });
  }
};

// Get all users (Admin only)
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password").sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users!!",
      error,
    });
  }
};
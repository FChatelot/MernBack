import User from "../models/userModel.mjs";
import asyncHandler from "express-async-handler";

/**
 * 
 * L'userController s'occupe de connecter l'User aux routes.
 * J'y gère tout mes endpoint et mes requetes.
 */


//@desc Auth user/set token
//route POST /api/users/auth
//@acces Public
const authUser = asyncHandler(async (req,res) =>{

      res.status(204).json({message: "Auth User"})
})


//@desc Register new user
//route POST /api/users
//@acces Public

const registerUser = asyncHandler(async (req,res) =>{
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email })
      if(userExist){
        res.status(400);
        throw new Error("Utilisateur déjà existant");
      }
      const user = await User.create({
        name,
        email,
        password
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email
        });
      } else {
        res.status(400);
        throw new Error("Données d'utilisateur invalides.");
      }
});

//@desc Logout user
//route POST /api/users/logout
//@acces Public
const logoutUser = asyncHandler(async (req,res) =>{

      res.send(result).status(200).json({message: "Logged out successfully"});
})
//@desc get user profile
//route GET /api/users/profile
//@acces Private
const getUserProfile = asyncHandler(async (req,res) =>{
      res.status(200).json({message: "User Profile"})
})

//@desc Update user profile
//route PUT /api/users/profile
//@acces Private
const updateUserProfile = asyncHandler(async (req,res) =>{
    res.status(200).json({message: "Update User Profile"})
})

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
// import {ObjectId} from "mongodb";
// import db from "../db/conn.mjs";
import asyncHandler from 'express-async-handler'
import bcrypt from "bcrypt"
/**
 * 
 * L'userController s'occupe de connecter l'User aux routes.
 */


//@desc Auth user/set token
//route POST /api/users/auth
//@acces Public
const authUser = async (req,res) =>{
    let user = {
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
      };
      let collection = await db.collection("users");
      let result = await collection.insertOne(user);
      res.send(result).status(204).json({message: "Auth User"})
}


//@desc Register new user
//route POST /api/users
//@acces Public

const registerUser = async (req,res) =>{

    let user = {
        login: req.body,
        email: req.body,
        password: req.body,
      };
      

      let collection = await db.collection("users");
      let findOne = req.body.email;
        const userExists = await collection.findOne({findOne})
        if (userExists){
          res.status(400);
          throw new Error("User already exist")
        }else{
            let result = await collection.insertOne(user);
            if (user){
            res.send(result).status(201).json({
                _id: user._id,
                login: user.login,
                email: user.email,
            })
            } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
        }

 
    
      
  
      
}
//@desc Logout user
//route POST /api/users/logout
//@acces Public
const logoutUser = async (req,res) =>{

      res.send(result).status(200).json({message: "Logged out successfully"});
}
//@desc get user profile
//route GET /api/users/profile
//@acces Private
const getUserProfile = async (req,res) =>{
    let collection = await db.collection("users");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) {
        res.send("User not found").status(404);
    }else{
        res.send(result).status(200).json({message: "User Profile"})
    } 
}

//@desc Update user profile
//route PUT /api/users/profile
//@acces Private
const updateUserProfile = async (req,res) =>{
    const query = { _id: new ObjectId(req.params.id) };

    const updates =  {
      $set: {
        login: req.body.login,
        email: req.body.email,
        password:req.body.password,
      }
    };
    let collection = await db.collection("users");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200).json({message: "Update User Profile"})
}

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}
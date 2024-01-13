import User from "../models/userModel.mjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.mjs";
/**
 * 
 * L'userController s'occupe de connecter l'User aux routes.
 * J'y gère tout mes endpoint et mes requetes.
 */


//@desc Auth user/set token
//route POST /api/users/auth
//@acces Public
const authUser = asyncHandler(async (req,res) =>{
      const {email, password} = req.body;
      // Check de l'email
      const user = await User.findOne({ email });
      //Check du mot de passe (la comparaison est au niveau de notre schema et de l'user.
      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email
        });
      } else {
        res.status(401);
        throw new Error("Email ou mot de passe invalide.");
      }
})


//@desc Register new user
//route POST /api/users
//@acces Public

const registerUser = asyncHandler(async (req,res) =>{
      const { name, email, password } = req.body;
      //Check de l'existence d'un utilisateur via l'email.
      const userExist = await User.findOne({ email })
      if(userExist){
        res.status(400);
        throw new Error("Utilisateur déjà existant");
      }
      //Creation de l'User.
      const user = await User.create({
        name,
        email,
        password
      });
      //Connection à l'User.
      if (user) {
        generateToken(res, user._id)

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
      res.cookie("jwt", "",{
        httpOnly:true,
        expires: new Date(0),
      })
      res.status(200).json({message: "Utilisateur déconnecté"});
})
//@desc get user profile
//route GET /api/users/profile
//@acces Private
const getUserProfile = asyncHandler(async (req,res) =>{
  //Obtenir les infos de l'utilisateur une fois connecté à son profil.
      const user = {
        _id: req.user._id,
        name: req.user.name,
        email:req.user.email
      }
      res.status(200).json(user)
})

//@desc Update user profile
//route PUT /api/users/profile
//@acces Private
const updateUserProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById (req.user._id);
    //Mettre à jour le name et l'email.
    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      //Mettre à jour le mot de passe.
      if(req.body.password){
        user.password = req.body.password;
      }
      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
       name: updatedUser.name,
        email: updatedUser.email,
      });
     } else {
      res.status(404);
      throw new Error("Utilisateur introuvable.");
    }
})

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};
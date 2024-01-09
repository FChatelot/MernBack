/**
 * 
 * L'userController s'occupe de connecter l'User aux routes.
 */


//@desc Auth user/set token
//route POST /api/users/auth
//@acces Public
const authUser = (req,res) =>{
    // res.status(401);
    // throw new Error("Something went wrong");
    res.status(200).json({message: "Auth User"})
}


//@desc Register new user
//route POST /api/users
//@acces Public
const registerUser = (req,res) =>{
    // res.status(401);
    // throw new Error("Something went wrong");
    res.status(200).json({message: "Register User"})
}
//@desc Logout user
//route POST /api/users/logout
//@acces Public
const logoutUser = (req,res) =>{
    // res.status(401);
    // throw new Error("Something went wrong");
    res.status(200).json({message: "Logout User"})
}
//@desc get user profile
//route GET /api/users/profile
//@acces Private
const getUserProfile = (req,res) =>{
    // res.status(401);
    // throw new Error("Something went wrong");
    res.status(200).json({message: "User Profile"})
}

//@desc Update user profile
//route PUT /api/users/profile
//@acces Private
const updateUserProfile = (req,res) =>{
    // res.status(401);
    // throw new Error("Something went wrong");
    res.status(200).json({message: "Update User Profile"})
}

export  {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
    }
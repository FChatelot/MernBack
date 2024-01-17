import jwt from "jsonwebtoken";

const generateToken = (res, userId)=>{
const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn:"1d"
    });
    res.cookie("jwt", token, {
        httpOnly:true,
        secure: true,//process.env.NODE_ENV !== "developpement"
        sameSite:"none",//"strict",
        maxAge: 1*24*60*60*1000 //en gros 1 journée
    })
}

export default generateToken;
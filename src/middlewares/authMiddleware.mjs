import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.mjs";

const protect = asyncHandler(async(req, res, next)=>{
    let token;
    token = req.cookies.jwt;

    if (token){
        try {
            //Vétification aux acces du jeton
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // récupération de l'id de l'utilisateur tout en enlevant le mot de passe
            req.user= await User.findById(decoded.userId).select("-password");
            
            next();//une erreur était causée sur postman car j'avais oublié de faire le callback de nex pour qu'il transmette l'info.
        } catch(error) {
            res.status(401);
            throw new Error("Non autorisé, jeton invalide");
        }
    }else{
        res.status(401);
        throw new Error("Non autorisé, pas de jeton");
    }
});
export { protect }

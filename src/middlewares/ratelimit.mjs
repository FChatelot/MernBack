import rateLimit from "express-rate-limit";
//rate limiter mis en place pour éviter le spam de création de posts. 

const limiter = rateLimit({
    windowMs : 60*1000,
    limit: 2,//une limite de 2 toutes les 60 secondes
    message:"Vous avez dépassé le nombre de requete limite par minute.",
    headers:true
})

export default limiter
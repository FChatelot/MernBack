import rateLimit from "express-rate-limit";
const limiter = rateLimit({
    windowMs : 60*1000,
    limit: 2,
    message:"Vous avez dépassé le nombre de requete limite par minute.",
    headers:true
})

export default limiter
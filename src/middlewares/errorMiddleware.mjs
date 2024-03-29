//pour les routes qui n'existent pas
const notFound = (req,res,next)=>{
    const error = new Error(`Not Found = ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) =>{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId"){
        //erreur pour mongoose mais je sais pas si je vais encore l'utiliser.
        statusCode = 404;
        message = "Ressource not found";
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })

}
export  {
    notFound,
    errorHandler
    }


import express from "express";// j'ai utilisé babel pour pouvoir se passer de commonjs et utiliser ecs6
import dotenv from "dotenv";
dotenv.config()
import cookieParser from"cookie-parser";
import cors from "cors";
import path from "path"
import "express-async-errors";
import connectDB from "./db/db.mjs";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.mjs";
import { fileURLToPath } from 'url';
import users from "./routes/users.mjs";
import postRouter from "./routes/posts.mjs";

connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();//application qui s'appuie sur node et sur express pour son déploiement backend.
const port = process.env.PORT || 4000;// port du serveur

var corsOptions = {
  origin: "*",
  methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200

}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser())

app.use("/api/users", users);
app.use("/post",postRouter);


app.use(errorHandler);


app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

const public_path = path.join(__dirname,'../build');//j'utilise path et express static pour communiquer avec le build de production et les fichiers statiques.
app.use(express.static(public_path));
app.get("*", (_,res)=>{
  res.sendFile(path.join(public_path, "index.html"));
})
//Serveur déployé
app.listen(port, ()=>{
    console.log(`Server démarré avec succes sur le port: ${port}`);
});


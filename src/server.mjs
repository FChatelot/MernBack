import express from "express";// j'ai utilisé babel pour pouvoir se passer de commonjs et utiliser ecs6
import cors from "cors";
import path from "path"
import "express-async-errors";
import router from "./routes/posts.mjs";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();//application qui s'appuie sur node et sur express pour son déploiement backend.
const port = process.env.PORT || 4000;// port du serveur

app.use(cors());
app.use(express.json());

app.use("/post",router);

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

// https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
//https://www.mongodb.com/compatibility/express

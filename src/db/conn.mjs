import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();
  
const uri = process.env.STRING_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


let conn;
try{
    conn = await client.connect((err, db)=>{
        if (err||!db) {return false}
        callback(db.db("Blog"))
    });
    console.log("db connectée");
    
} catch (e){
    console.error(e);
} 
const db = conn.db("Blog");
export default db;
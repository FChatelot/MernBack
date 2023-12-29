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
    conn = await client.connect();
    console.log("db connectée");
} catch (e){
    console.error(e);
}
let getDb = conn.db("Blog");
export default getDb;
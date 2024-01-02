import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();
  
const uri = process.env.STRING_URI || process.env.KEY || "mongodb+srv://florianchatelot:SK6H61sTcdIMWflr@cluster2.hht7nrq.mongodb.net/?retryWrites=true&w=majority" ;
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
let db = conn.db("Blog");
export default db;
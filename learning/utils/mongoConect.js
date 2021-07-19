
import {MongoClient} from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Connect = async()=>{
  //console.log("ENV: " + process.env.DB_HOST);
  if(!client.isConnected){
    await client.connect();
  }
  const db = client.db('nextProject');
  return{db, client}
}
export default Connect;
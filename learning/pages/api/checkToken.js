
import { ObjectId } from 'mongodb';
import connect from '../../utils/mongoConect';
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwt-muninn-secret';

const CheckToken = async (req, res)=> {
  console.log("CheckToken")
  if(req.method === 'POST'){
    const {token} = req.body;
    if(!token){
      res.status(200).json({status: false, msg: 'token doesnt exist' })
    }

    const {db} = await connect();
    console.log(JWT_SECRET)
    console.log(token)
    const tokenData = jwt.verify(token, JWT_SECRET);
    console.log(tokenData)
    const user = await db.collection('users').findOne({
      name: tokenData.username,
      _id: ObjectId(tokenData.id),
    })
    if(user){
      const today = new Date();
      const token = jwt.sign(
        {
          id: user._id,
          username: user.name,
          exp: today.getTime() / 1000 + 1000 * 60 * 2,
        },
        JWT_SECRET,
      );
      res.status(200).json({status: true, token: token})
    }else{
      res.status(200).json({status: false, data: 'Invalid Token' })
    } 
  }
}

export default CheckToken;
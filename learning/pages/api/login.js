
import connect from '../../utils/mongoConect';
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwt-muninn-secret';

const Login = async (req, res)=> {
  if(req.method === 'GET'){
    const {username, password} = req.query;
    const {db} = await connect();

    const user = await db.collection('users').findOne({
      name: username,
      password: password,
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
      console.log("token: " + token)
      res.status(200).json({status: true, token: token})
    }else{
      res.status(200).json({status: false, data: 'User doesnt exist' })
    } 
  }
}

export default Login;
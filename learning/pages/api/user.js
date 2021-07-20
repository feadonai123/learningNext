
import connect from '../../utils/mongoConect';

const User = async (req, res)=> {
  if(req.method == 'post'){
    const {db} = await connect('nextProject');
    db.collection('users').insertOne({
      name: 'felipe',
      password: '123456789',
    })
    res.status(200).json({ name: 'John Doe' })
  }else{
    res.status(200).json({ status: 'foiii' })
  }
}

export default User;
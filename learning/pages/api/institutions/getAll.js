import Connect from "../../../utils/mongoConect";

const getAll = async (req, res)=> {
  try{
    const {db} = await Connect('nos-dev')
    const institutions = db.collection('institutions');
    const inst = await institutions.find({}).toArray();
    return res.status(200).json({status: true, institutions: inst})
  }catch(e){
    return res.status(200).json({status: false, institutions: []})
  }

}
export default getAll;
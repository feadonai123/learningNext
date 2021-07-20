import Connect from "../../../utils/mongoConect";

const getAll = async (req, res)=> {
  const {db} = await Connect('nos-dev')
  const institutions = db.collection('institutions');
  const inst = await institutions.find({}).toArray();
  return res.status(200).json({status: true, institutions: inst})
}
export default getAll;
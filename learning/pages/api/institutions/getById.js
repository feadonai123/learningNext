import Connect from "../../../utils/mongoConect";

const getById = async (req, res)=> {
  const {id} = req.query;
  const {db} = await Connect('nos-dev')
  const institutions = db.collection('institutions');
  const inst = await institutions.findOne({_id: id});
  return res.status(200).json({status: true, institution: inst})
}
export default getById;
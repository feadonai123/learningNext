import axios from 'axios';
import Style from '../../styles/default.module.css';
const institution = ({data})=>{
  return(
    <div className={Style.container}>
      <div className={Style.subcontainer}>
        <h1>{data.institutionName}</h1>
        <p>{data.description}</p>
        <ul>
          <li>
            <p>Nome do responsável: {data.responsiblePersonName}</p>
          </li>
          <li>
            <p>Email: {data.responsiblePersonEmail}</p>
          </li>
          <li>
            <p>Telefone: {data.responsiblePersonPhone}</p>
          </li>
          <li>
            <p>Endereço: {data.generalAddress}</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default institution

export async function getStaticProps(ctx) {
  const id = ctx.params.id;
  //const response = await axios.get(`${process.env.URL}api/institutions/getById`,{
  const response = await axios.get(`/api/institutions/getById`,{
    params:{
      id: id
    }
  })
  const {
    description,
    responsiblePersonName, 
    responsiblePersonEmail,
    responsiblePersonPhone,
    institutionName,
    institutionAddress,
  } = response.data.institution;
  const {generalAddress} = institutionAddress;

  const data = {
    description,
    responsiblePersonName, 
    responsiblePersonEmail,
    responsiblePersonPhone,
    institutionName,
    generalAddress
  }
  return({
    props: {
      data
    }
  })
}
export async function getStaticPaths(){
  //const response = await axios.get(`${process.env.URL}api/institutions/getAll`);
  const response = await axios.get(`/api/institutions/getAll`);
  const {status, institutions} = response.data;
  const paths = institutions.map((item)=>{
    return {params: {id: item._id}};
  })
  return {
    paths: paths,
    fallback: false//barra o acesso
  };
}
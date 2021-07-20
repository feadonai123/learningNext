import Styles from './styles.module.css';
const institutionCard = ({
  name,
  imageURL
})=>{
  return(
    <div className={Styles.container}>
      <img className={Styles.img} src={imageURL}/>
      <div style={{height: '20px'}}>
        <p style={{
          lineHeight: '16px',
          maxHeight: '16px', 
          overflow: 'hidden'
        }}>{name}</p>
      </div>
    </div>
  )
}
export default institutionCard;

import { useState } from 'react';
import Router from 'next/router'

import styles from '../styles/login.module.css';
import { useUser } from '../utils/userContext';


const Login = ()=>{

  const {login} = useUser();
  const [textUsername, setTextUsername] = useState('');
  const [textPassword, setTextPassword] = useState('');
  const [showError, setShowError] = useState({show: false, msg: ''});

  const handleOnClickLogin=async()=>{
    if(textUsername=='' || textPassword==''){
      setShowError({show: true, msg: "*Preencha todos os campos"})
      return;
    }
    if(showError) setShowError({show: false, msg: ''});
    
    const response = await login({
      username: textUsername, 
      password: textPassword,
    })
    if(!response.status){
      setShowError({show: true, msg: response.msg})
    }else{
      Router.push('/')
    }
  }
  return(
    <div className={styles.container}> 
      <div className={styles.subcontainer}>
        <h1 style={{alignSelf: 'center'}}>Login</h1>
        <label style={{padding: '0px 0px 5px 20px'}}>Username:</label>
        <input 
          className={styles.input} 
          type="text" 
          placeholder="Username"
          style={{
            borderColor: showError.show&&textUsername==''&&'#f00',
          }}
          value={textUsername}
          onChange={(e)=>setTextUsername(e.target.value)}
        />
        <br/>
        <label style={{padding: '0px 0px 5px 20px'}}>Senha:</label>
        <input 
          className={styles.input} 
          type="password" 
          placeholder="Senha" 
          value={textPassword}
          style={{
            borderColor: showError.show&&textPassword==''&&'#f00',
          }}
          onChange={(e)=>setTextPassword(e.target.value)}
        />
        {showError.show?
         <p style={{color: '#f00', fontSize:9, alignSelf: 'center'}}>{showError.msg}</p>
        :<p></p>}
        <button 
          className={styles.button} 
          onClick={handleOnClickLogin}
          style={{width: '70%', alignSelf: 'center', height: '30px'}}
        >Entrar</button>
        <p style={{
          fontSize: 12,
          alignSelf: 'center',
          margin: '0px',
          marginTop: '10px',
          padding: '0px'
        }}>Não tem uma conta? Clique <a href='/register'><strong>aqui</strong></a> para se registrar</p>
      </div>
    </div>
  )
}
export default Login;

export async function getServerSideProps() {
  return { props: {  } }
}

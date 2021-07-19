const jwt = require('jsonwebtoken');
import axios from 'axios';
import cookieCutter from 'cookie-cutter'
import { createContext, useContext, useState } from "react";
export const UserContext = createContext();
const JWT_SECRET = 'jwt-muninn-secret';

export const UserProvider = ({children})=>{
  const [userName, setUsername] = useState('');
  const [id, setId] = useState();

  const login = async ({username, password})=>{
    const response = await axios.get('/api/login', {
      params: {
        username: username,
        password: password,
      }
    })
    if(!response.data.status){
      return({
        status: false,
        msg: "*Usuário ou senha inválidos",
      })
    }else{
      const tokenData = jwt.verify(response.data.token, JWT_SECRET);
      setUsername(tokenData.username);
      setId(tokenData.id);
      cookieCutter.set('token', response.data.token)
      return({
        status: true,
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        id,
        login,
      }}>
      {children}
    </UserContext.Provider>
  );
}
export function useUser() {
  const context = useContext(UserContext);
  return context;
}
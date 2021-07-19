import '../styles/globals.css'
import {UserProvider} from '../utils/userContext.js'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps}/>
    </UserProvider>
  );
}

export default MyApp

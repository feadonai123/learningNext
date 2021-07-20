import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import Styles from '../styles/default.module.css';
import InstitutionCard from '../utils/components/institutionCard';

const Home = ({data})=>{

  useState(()=>{
  },[])
  return(
    <div className={Styles.container}>
      <div className={Styles.subcontainer}>
        <h1 style={{alignSelf: 'center'}}>Instituições</h1>
        <ul className={Styles.ul}>
          {data.map((item)=>{
            return(
              <li>
                <Link href={`/institution/${item._id}`}>
                  <a>
                    <InstitutionCard
                      name={item.institutionName}
                      imageURL={item.imageURL}
                    />
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default Home;

export async function getStaticProps(ctx) {
  const response = await axios.get(`${process.env.URL}api/institutions/getAll`);
  //await delay(2000);//ms
  const {status, institutions} = response.data;

  return{
    props: {
      data: status?institutions:[]
    }//add revalidade
  }
}

const delay = async (time)=>{
  await new Promise(function(resolve, reject) {
    setTimeout(resolve, time);
  })
}
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './dog.module.css';
import weight from "../img/weight.png"
import height from "../img/height.png"
import loadingDog from "../img/loading-dog.gif";
export default function Dog() {

 
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   useEffect(() => {
    getDogDetail()
   },[]);
  
const getDogDetail = async() => {
try{
      setLoading(true);
      const dogDetail = await axios.get(`http://localhost:3001/dogs/detail/${id}`);
      const detail = dogDetail.data
      setDog(detail)
      setLoading(false);
    
}catch{
  setLoading(false);
}
  }


  function temperBd() {
    const temps = Object.values(dog.temperaments);

    const mapped = temps.map((e) => { return e.name; });
    const faltted = mapped.flat().join(", ");

    return <h4>{faltted}</h4>;
  }
  function temperApi() {
    return <h4>{dog.temperament}</h4>;
  }


  function handleClick() {
   
    navigate("/dogs")
  }

  return (
    <div className={styles.dogContainer}>
 <div className={styles.dog}>
  {loading? <img src={loadingDog} alt="Loading Dog" className={styles.loadingDog} /> :
  <>
 <img  className={styles.img} src={dog.img} alt={dog.name}/>
      <h1>{dog.name}</h1>
      <h5 className={styles.stats}>{dog.height}   Cm<img src={height} alt="height" className={styles.icon}/></h5>
       <h5 className={styles.stats}>{dog.weight} Kg<img src={weight} alt="weight" className={styles.icon}/></h5>
     
       {dog.temperaments ? temperBd() : temperApi()}
      <button className={styles.btn} type="button" onClick={handleClick}>Volver</button>
  </>}
    </div>
    </div>
  );
}

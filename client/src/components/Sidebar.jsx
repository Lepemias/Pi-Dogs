import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getTemperaments} from "../redux/actions";
import {
  filterByTemperaments,
  filterBySource,
  ordered,
  resetFilter,
  byWheight,
  flag,
  setCurrentPage,
} from "../redux/actions";
import styles from "./sidebar.module.css";
export default function Sidebar() {
  
  const dispatch = useDispatch();
 
  const isMounted = useRef(false);

  const alltempers = useSelector((state) => state.temperaments);

  
  const [temp, setTemp] = useState([]);
 
  const [value] = useState("default");

 
  useEffect(() => {
    if(isMounted.current === true)
   dispatch( filterByTemperaments(temp))
   else isMounted.current = true
     },[temp] )

  function resetFilters(e) {
    e.preventDefault();
    dispatch(resetFilter())
    dispatch(setCurrentPage(1))
  }

  async function handleTemperSelect(e) {
    e.preventDefault();
    let values = Array.from(e.target.selectedOptions, (option) => option.value);
    setTemp(values, dispatch( filterByTemperaments(temp)) );
    dispatch(setCurrentPage(1))
    
  }

  function handleSource(e) {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    dispatch(flag(e.target.value))
    dispatch(setCurrentPage(1))
  }

  function handleOrder(e) {
    e.preventDefault();
    dispatch(ordered(e.target.value));
    dispatch(flag(e.target.value));
    dispatch(setCurrentPage(1))
    
  }
  function handleWeight(e) {
    e.preventDefault();
    dispatch(byWheight(e.target.value));
    dispatch(flag(e.target.value));
    dispatch(setCurrentPage(1))
    
  }

  return (
    <div className={styles.sidebar}>
      <h5>Ordenar:</h5>
      <select name="select" onChange={handleOrder} className={styles.input}  >
      
        <option value="desc">A to Z</option>
        <option value="asc">Z to A</option>
      </select>
        <h5>Peso:</h5>
      <div className={styles.divBtn}>
        
        <select name="selectW" onChange={handleWeight} className={styles.input} defaultValue={value}>
        <option value="default" disabled hidden>Elige una opción</option>
          <option value="lightw">Más liviano primero</option>
          <option value="heavy">Más pesado primero</option>
        </select>
      </div>

      <h5>Temperamentos:</h5>

      <div className={styles.chkContainer}>
        <select
          multiple={true}
          name="temps"
          className={styles.chkUl}
          onChange={handleTemperSelect}
          value={temp}
        >
          {alltempers.map((e, index) => {
            return (
              <option key={index} className={styles.option} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <h5>Fuente:</h5>

      <select className={styles.input} name="source" onChange={handleSource}>
        <option value="all"> Todos </option>
        <option value="api">API</option>
        <option value="db">Base de Datos</option>
      </select>
      <div className={styles.divBtn}>
        <button onClick={resetFilters} className={styles.btn}>
          restablecer filtros
        </button>
      </div>
    </div>
  );
}

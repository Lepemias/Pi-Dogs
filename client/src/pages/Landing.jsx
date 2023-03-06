import React from "react";
import { Link } from "react-router-dom";
import styles from "./landing.module.css";


export default function Landing() {


  return (
    <>
      <div className={styles.bgContainer}>
        <div className={styles.title}>
          <h1 className={styles.h1}>My Dogs</h1>
        </div>
        <div className={styles.items}>
          <div className={styles.info}>
            <h4 className={styles.h4}>Nombre: Jeremias Segovia</h4>
            <h4 className={styles.h4}>Carrera: Full-Stack</h4>
            <h4 className={styles.h4}>Cohorte: 32-A</h4>
          </div>
          <Link to="/dogs">
            <button className={styles.btn}>Ingresar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

import React from "react";
import dogConfused from "../img/dog-confused.png";
import styles from "./error.module.css";

export default function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.dogContainer}>
        <img src={dogConfused} alt="dog confused" className={styles.dog} />
        <div className={styles.text}>
        <h1>404 not found</h1>
      </div>
      </div>
     
    </div>
  );
}

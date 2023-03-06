import React from "react";
import styles from "./card.module.css";
import { Link } from "react-router-dom";

export default function Card({ id, img, name, temperament, temperaments }) {
  function temperBd() {
    const temps = Object.values(temperaments);

    const mapped = temps.map((e) => { return e.name; });
    const faltted = mapped.flat().join(", ");

    return <h3>{faltted}</h3>;
  }
  function temperApi() {
    return <h3>{temperament}</h3>;
  }

  return (
    <div className={styles.card}>
      <article className={styles.tempsContainer}>
        <Link to={`/dogs/detail/${id}`}>
          <img src={img} alt={name} className={styles.img} />
        </Link>
        <h2>{name}</h2>
        {temperaments ? temperBd() : temperApi()}
      </article>
    </div>
  );
}

import React from "react";
import styles from "./pagination.module.css";
import { useSelector } from "react-redux";

export default function Pagination({totalCards, cardsPerPage, paginate}) {
  const currentPage = useSelector((state) => state.page);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
    <ul className={styles.list}>
      {pageNumbers.map((e) => {
        return (
          <li
            className={e === currentPage
              ? styles.itemActive
              : styles.item}
            key={e}
            onClick={() => paginate(e)}
          >
            {e}
          </li>
        );
      })}
    </ul>
    </div>
  );
}

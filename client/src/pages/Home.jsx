import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import styles from "./home.module.css";
import Pagination from "../components/Pagination";
import Error from "./Error";
import { setCurrentPage, getAllDogs, getTemperaments } from "../redux/actions";
import loadingDog from "../img/loading-dog.gif";
export default function Home() {


  useEffect(() => {

    if(!filtered.length){
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  
  }
  }, []);

  const dispatch = useDispatch();

  function setPage(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
  }

  const filtered = useSelector((state) => state.filtered);
  const currentPage = useSelector((state) => state.page);
  const allDogs = useSelector((state) => state.allDogs);

  useSelector((state) => state.flag);

  const [cardsPerPage] = useState(8);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentPosts = filtered.slice(indexOfFirstCard, indexOfLastCard);
  const paginate = (pageNumber) => setPage(pageNumber);

  function mapping() {
    return currentPosts.map((d) => {
      return <Card key={d.id} {...d} />;
    });
  }

  function error() {
    if(!allDogs.length) {return <img src={loadingDog} alt="Loading Dog" className={styles.loadingDog} />}
    else return <Error />;
  }

  

  return (
    <div className={styles.allContainer}>
        {!filtered.length ? (
        <div className={styles.dogContainer}>{error()}</div>
      ) : (<>
        <div className={styles.paginationBox}>
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={filtered.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        </div>
        <div className={styles.cardsContainer}>{mapping()} </div>
        </>)}
    </div>
  );
}

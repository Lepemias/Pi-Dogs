import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getByName } from "../redux/actions";
import styles from "./searchBar.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(search));
    setSearch("");
    navigate("/dogs");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.inputSearch}
        type="text"
        name="search"
        placeholder="Escribe aquí tu busqueda..."
        value={search}
        onChange={handleChange}
      />
      <button className={styles.btn} type="submit" onClick={handleSubmit}>
        Buscar
      </button>
    </form>
  );
}

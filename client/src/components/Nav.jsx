import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import SearchBar from "./SearchBar";
import styles from "./nav.module.css";
import dogIcon from "../img/dog.png";
import { getAllDogs } from "../redux/actions";
import {useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";
import { resetFilter, setCurrentPage } from "../redux/actions";
export default function Nav() {
const dispatch = useDispatch();

function resetFilters(e) {
    e.preventDefault();
    dispatch(resetFilter())
    dispatch(setCurrentPage(1))
  }

  return (

<nav className={styles.navBar}>
<img src={dogIcon} alt="dog icon" className={styles.icon}/>
<ul className={styles.listContainer}>

<NavLink to="/dogs" style={({ isActive }) => ({
     color: isActive ? '#81B29A' : '#FFFFFF',
  })}> <p className={styles.text}> Inicio</p> </NavLink>

<NavLink to="/create" style={({ isActive }) => ({
     color: isActive ? '#81B29A' : '#FFFFFF',
     
  })}> <p className={styles.text}>Crea tu propia raza</p> </NavLink>
<div className={styles.searchBar}> <SearchBar /></div>
</ul>
</nav>
  )}

  ;


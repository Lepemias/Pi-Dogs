import axios from "axios";

export function getAllDogs() {
  return async function (dispatch) {
    const dogs = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_ALL_DOGS",
      payload: dogs.data,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) { try{
    const search = await axios.get(
      `http://localhost:3001/dogs?name=${name}`
    );
      return dispatch({
      type: "GET_BY_NAME",
      payload: search.data,
      
    });
  }catch(error) {console.error("Something bad happened");}
  
;}
} 


export function getTemperaments() {
  return async function (dispatch) {
    const temperaments = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temperaments.data.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return -1;
        }
        return 0;
      })
    });
  };
}

export function postNewDog(payload) {
  return async function () {
    const newDog = await axios.post("http://localhost:3001/dogs",payload);
    return newDog;
  };
}

export function resetFilter() {
  
  return {
    type: "RESET_FILTER",
    
  };
}

export function filterByTemperaments(temper) {
  return {
    type: "FILTER_BY_TEMPERAMENTS",
    payload: temper,
  };
}

export function filterBySource(source) {
  return {
    type: "FILTER_BY_SOURCE",
    payload: source,
  };
}


export function ordered(select) {
  return {
    type: "ORDERED",
    payload: select,
  };
}


export function byWheight(selectW) {
  return {
    type: "BYWHEIGHT",
    payload: selectW,
  };
}

export function range(payload) {
  return {
    type: "RANGE",
    payload,
  };
}

export function flag(flag) {
  return {
    type: "FLAG",
    payload: flag,
  };
}

export function setCurrentPage(pageNumber) {
  return {
    type: "SETCURRENTPAGE",
    payload: pageNumber,
  };
}
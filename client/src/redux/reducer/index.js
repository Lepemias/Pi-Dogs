const initialState = {
  dogs: [],
  filtered: [],
  allDogs: [],
  temperaments: [],
  flag: false,
  page: (1),
  
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        filtered: action.payload
        
      };

    case "GET_BY_NAME":
      return {
        ...state,
        filtered: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "POST_NEW_DOG":
      return {
        ...state,
      };

    case "RESET_FILTER":
      const reset = state.allDogs;
      return {
        ...state,
        filtered: reset,
        flag: "reset"
        
      };

    case "FILTER_BY_TEMPERAMENTS":
      const allDogs = state.allDogs
      const tempsRequired = action.payload;
      const tempsInDB = allDogs.filter((e) => e.hasOwnProperty("temperaments"));
      const tempsInApi = allDogs.filter(
        (e) => !e.hasOwnProperty("temperaments")
      );

      const searchXInY = (allState, searchWords) =>
        searchWords.every((e) => {
          return allState.match(new RegExp(e, "i"));
        });

      const searchApi = tempsInApi.filter((e) => {
        return searchXInY(e.temperament, tempsRequired);
      });
      const searchDb = tempsInDB.filter((e) => {
        return searchXInY(
          e.temperaments.map((e) => e.name).toString(),
          tempsRequired
        );
      });

      return { ...state, filtered: [...searchApi, ...searchDb] };

    case "FILTER_BY_SOURCE":
      const allDogs2 = state.filtered
      if (action.payload === "all") return { ...state, filtered: state.allDogs };
      const filteredApi = allDogs2.filter(
        (e) => !e.hasOwnProperty("createdInDb")
      );
      const filteredDb = allDogs2.filter((e) =>
        e.hasOwnProperty("createdInDb")
      );
        
      return {
        ...state,
         filtered: action.payload === "api" ? filteredApi : filteredDb,
      };

    case "ORDERED":
      const allDogs3 = state.filtered;
      const toOrder =
        action.payload === "desc"
          ? allDogs3.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : allDogs3.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return { ...state, filtered: toOrder };

    case "BYWHEIGHT":
      const allDogs4 = state.filtered;
      
      const weight =
        action.payload === "heavy"
          ? allDogs4.sort((a, b) => parseInt(b.weight.slice(0, 3)) - parseInt(a.weight.slice(0, 3))
            )
          : allDogs4.sort((a, b) => parseInt(a.weight.slice(0, 3)) - parseInt(b.weight.slice(0, 3))
            );

      return {
        ...state,
        filtered: weight,
      };
      case "SETCURRENTPAGE":
        return { ...state, page: action.payload };

    case "FLAG":
      return { ...state, flag: action.payload };

    case "ERROR":
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
}
export default rootReducer;

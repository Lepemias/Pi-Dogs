const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db.js");
const router = Router();

router.get("/", async (req, res) => {
  //==========================================================*Tested all tempers
  try {
    const reqApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds`
    );
  
    const temps =  reqApi.data.map((e) => e.temperament);
     // console.log(temps);
      const stringed =temps.toString()
      //console.log(stringed);
    const remove = stringed.split(/[, ]+/)
    const tempsIntoDb = remove.map((e) => {
      Temperament.findOrCreate({
        where: { name: e }
      });
    });
    const allTemps = await Temperament.findAll();
    
   //console.log(allTemps);
    res.send(allTemps);
  } catch (error) {
    res.send({ message: error.message });
  }
});


module.exports = router;
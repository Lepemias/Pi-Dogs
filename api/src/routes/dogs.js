const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const router = Router();
const { Op } = require("sequelize");


router.get("/", async (req, res) => {
  const { name } = req.query;
//==========================================================*Tested name search (api + db )
  if (name) {
    try {
     
      const reqApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
      
      const dogsFound = reqApi.data.filter((e) => e.name.toLowerCase().includes(`${name}`.toLowerCase()));

      const dogSearchApi = dogsFound.map((e) => {
        const dogFound = {
          id: e.id,
          img: e.image.url,
          name: e.name,
          temperament: e.temperament? e.temperament : "Sin descripción",
          height: e.height.metric,
          weight: e.weight.metric,
        };
        return dogFound;
      });

      const dogsSearchDb = await Dog.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`.toLowerCase(),
          },
        },
        include: {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      
      res.status(200).send([...dogSearchApi, ...dogsSearchDb]);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
    
//==========================================================*Tested all dogs
  } else
    try {
      
      const apiDogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);

      
      const dogs = apiDogs.data.map((e) => {
        
        const dog = {
          id: e.id,
          img: e.image.url,
          name: e.name,
          height: e.height.metric,
          weight: e.weight.metric,
          temperament: e.temperament? e.temperament : "Sin descripción",
          
        };

      
        return dog;
      });

      const dogsDb = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
        const all= [...dogs, ...dogsDb]
      res.status(200).send(all);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
});
//==========================================================*Tested id search (api + db )
router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;

  const dogsDb = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const search = dogsDb.find((e) => e.id == `${id}`);
 
  if (search) res.send(search);
  else
    try {
      
      const reqApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
      // console.log(reqApi)
      const findId = reqApi.data.find((e) => e.id == `${id}`);

      //console.log(findId)
      const dog = {
        id: findId.id,
        img: findId.image.url,
        name: findId.name,
        temperament: findId.temperament,
        height: findId.height.metric,
        life_span: findId.life_span,
        weight: findId.weight.metric,
      };

      res.send(dog);
    } catch (error) {
      res.status(404).send({ message: "No existe el ID requerido " });
    }
});
//========================================== DELETE

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
try{
  const dogsDb = await Dog.destroy({
    where: {id:`${id}`}
})
res.status(200).send("borrado con exito")}
catch{
res.status(404).send("no se encontro id")
}

})



//==========================================================*Tested post
router.post("/", async (req, res) => {
  const { name, img, height, weight, temperament, life_span, createdInDb } =
    req.body;

  const newDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
    createdInDb,
    img: img? img : "https://static.vecteezy.com/system/resources/thumbnails/006/720/668/small_2x/dog-face-logo-free-vector.jpg",
    });

const temperDb= await Temperament.findAll({where: {name: temperament}})

newDog.addTemperament(temperDb)

//console.log(temperDb)
  res.send(newDog);
});

module.exports = router;

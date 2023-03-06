const { Router } = require('express');
const dogs = require('./Dogs.js')
const temperament = require('./Temper.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs)
router.use('/temperaments', temperament)

module.exports = router;

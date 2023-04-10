const { Router } = require('express');
const getVideogames = require('../controllers/videogames/getVideogames');
const getVideogameById = require('../controllers/videogames/getVideogameById');
const searchVideogamesByName = require('../controllers/videogames/searchVideogamesByName');
const createVideogame = require('../controllers/videogames/createVideogame');

const router = Router();

router.get('/', getVideogames);
router.get('/name', searchVideogamesByName);
router.post('/', createVideogame);
router.get('/:idvideogames', getVideogameById);


module.exports = router;

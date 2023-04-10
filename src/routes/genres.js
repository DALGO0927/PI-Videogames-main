const { Router } = require('express');
const { Genre } = require('../db');
const router = Router();

// Ruta para obtener todos los géneros
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error' });
  }
});

module.exports = router;

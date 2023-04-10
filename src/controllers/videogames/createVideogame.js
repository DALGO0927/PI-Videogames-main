const { Videogame, Genre } = require('../../db');

async function createVideogame(req, res) {
  const { name, description, released, rating, platforms, genres } = req.body;

  try {
    // Buscamos los géneros por su nombre en la base de datos
    const dbGenres = await Genre.findAll({ where: { name: genres } });
    
    // Creamos el videojuego en la base de datos
    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
    });

    // Asociamos los géneros con el videojuego creado
    await newVideogame.addGenres(dbGenres);

    res.status(201).json(newVideogame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = createVideogame;

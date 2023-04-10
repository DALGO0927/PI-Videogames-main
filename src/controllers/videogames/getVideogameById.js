const axios = require('axios');
const { Videogame, Genre } = require('../../db');
const { API_KEY } = process.env;

async function getVideogameById(req, res, next) {
  const { idVideogame } = req.params;

  try {
    // Buscamos en la base de datos
    const videogameDB = await Videogame.findByPk(idVideogame, { include: Genre });

    // Si encontramos el juego en la base de datos, lo devolvemos
    if (videogameDB) {
      return res.json(videogameDB);
    }

    // Si no encontramos el juego en la base de datos, lo buscamos en la API
    const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);

    // Creamos el objeto con la información del juego
    const { name, description_raw, released, background_image, rating, genres } = response.data;
    const videogameAPI = {
      name,
      description: description_raw,
      released,
      image: background_image,
      rating,
      genres: genres.map((genre) => genre.name),
    };

    // Devolvemos el juego encontrado en la API
    res.json(videogameAPI);

  } catch (error) {
    next(error);
  }
}

module.exports = getVideogameById;

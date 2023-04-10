const axios = require('axios');
const { Genre } = require('./src/db');
const { API_KEY } = process.env;

// Función para obtener los géneros desde la API y transformarlos
const getGenresFromApi = async () => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);


    const genres = response.data.results.map((genre) => {
      return {
        name: genre.name,
        slug: genre.slug,
      };
    });

    return genres;
  } catch (error) {
    console.error(error);
  }
};

// Función para verificar si los géneros existen en la base de datos y crearlos si es necesario
const seedGenres = async () => {
  try {
    const genres = await getGenresFromApi();

    for (const genre of genres) {
      const genreExists = await Genre.findOne({ where: { name: genre.name } });

      if (!genreExists) {
        await Genre.create(genre);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// Ejecución de la función para poblar la base de datos con los géneros obtenidos de la API
seedGenres();

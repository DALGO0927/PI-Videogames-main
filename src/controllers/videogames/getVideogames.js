const axios = require('axios');
const { Videogame, Genre } = require('../../db');
const { API_KEY } = process.env;

async function getVideogames(req, res, next) {
  try {
    const dbVideogames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    const apiResponse = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const apiVideogames = apiResponse.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms.map((platform) => platform.platform.name).join(', '),
      image: game.background_image,
      releaseDate: game.released,
      rating: game.rating,
      genres: game.genres.map((genre) => genre.name),
    }));

    const allVideogames = dbVideogames.concat(apiVideogames);

    res.status(200).json(allVideogames);
  } catch (error) {
    next(error);
  }
}

module.exports = getVideogames;

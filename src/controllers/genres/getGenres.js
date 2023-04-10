const axios = require('axios');
const { Genre } = require('../../db');
const { API_KEY } = process.env;

async function seedGenres() {
  try {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    const genres = response.data.results.map(({ name }) => ({ name }));
    await Genre.bulkCreate(genres);
  } catch (err) {
    console.error(err);
  }
}

async function getGenres(req, res, next) {
  try {
    let genres = await Genre.findAll();

    if (!genres.length) {
      await seedGenres();
      genres = await Genre.findAll();
    }

    res.json(genres);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getGenres,
};

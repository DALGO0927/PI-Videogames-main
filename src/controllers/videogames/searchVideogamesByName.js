const { Videogame, Genre } = require('../../db');

const { API_KEY } = process.env;


async function searchVideogamesByName(req, res, next) {
  const name = req.query.name;

  try {
    // Buscar en la base de datos los videojuegos que coinciden con el nombre
    const videogamesDB = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Genre,
        attributes: ['name'],
        through: { attributes: [] },
      },
    });

    // Buscar en la API los videojuegos que coinciden con el nombre
    const videogamesAPI = await axios.get(`https://api.rawg.io/api/games?search=${name}&page_size=15&key=${API_KEY}`);

    // Crear un arreglo con los resultados de la base de datos y la API
    const videogames = videogamesDB.concat(videogamesAPI.data.results);

    // Si no se encontraron resultados, retornar un mensaje de error
    if (videogames.length === 0) {
      return res.status(404).json({ error: 'No se encontraron resultados para la búsqueda' });
    }

    // Retornar los videojuegos encontrados
    res.status(200).json(videogames);
  } catch (error) {
    next(error);
  }
}

module.exports = searchVideogamesByName;

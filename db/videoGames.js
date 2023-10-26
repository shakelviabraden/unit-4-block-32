const client = require('./client');
const util = require('util');

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`SELECT * FROM videogames;`);

        return videoGames;
    } catch (error) {
        throw error;
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    try {
        //we are looking at the body (which is an object) keys and destructuring to obtain its values

        const { name, description, price, inStock, isPopular, imgUrl } = body;

        
        const {rows: [videoGame]} = await client.query(`
          INSERT INTO videogames(name, description, price) VALUES($1, $2, $3)
          RETURNING *;
        `, 
        //these are our dependencies 
        [name, description, price]);

        return videoGame;

      } catch (error) {
        throw error;
}
}

// PUT - /api/video-games/:id - update a single video game by id

//fields = {} is a default value if nothing is passed
async function updateVideoGame(id, fields = {}) {
    //this is so that we can dynamically code the SET parameter of our UPDATE query. fields is the body of the request.
    // result would output something like this:
    // body = { "name": "Shakelvia"}
    // setString = name=$1
    // this will allow us to set our set parameters based on what the user types type 

    const setString = Object.keys(fields).map((key, index) => `${key}=$${index + 1}`).join(', ');

    //if there is nothing in the body, return and dont move forward to try catch block.
    if (setString.length === 0) {
        return;
    }
   
    try {
        const { rows: [videoGame] } = await client.query(`
            UPDATE videogames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, 
        // this allows us to use the values here 
        Object.values(fields));
        return videoGame;

    } catch (error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const { rows: [videoGame] } = await client.query(`DELETE FROM videogames WHERE id = $1 RETURNING *;`, [id])
        return videoGame

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}
const express = require("express");
const router = express.Router();
const client = require("../db/client");
const { getAllVideoGames, getVideoGameById, createVideoGame, updateVideoGame, deleteVideoGame} = require('../db')

// GET - /api/video-games - get all video games
router.get("/", async (req, res, next) => {
  try {
    const videoGames = await getAllVideoGames()
    
    if (!videoGames) {
      res.send({error: "Error", message: "There are no games in this database."})
    } else {
      res.send(videoGames)
    }
    
  } catch (error) {
    res.send(error);
  }
});

// GET - /api/video-games/:id - get a single video game by id
router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params

    const videoGame = await getVideoGameById(id)

    if (!videoGame) {
      res.send({error: "Error", message: `There is no video game with id of ${id}.`})
    } else {
      res.send(videoGame)
    }
   
  } catch (error) {
    return res.json(error)
  }
});

// POST - /api/video-games - create a new video game
router.post("/", async (req, res, next) => {
   //the entire request body is our data for the newGame
   const newGame = req.body;
  try {
    //we are plugging that entire body into out function that will destructure the object and obtain its values
    const videoGame = await createVideoGame(newGame)
    
    res.send({success: "Success! The following game has been created:", data: videoGame})

  } catch (error) {

    res.send(error);
  }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put("/:id", async (req, res, next) => {
  const {id} = req.params
  const fields = req.body

  try {
    const updatedGame = await updateVideoGame(id, fields)


    res.send({success: "Your videogame was succesfully updated.", message: updatedGame})
    //do not try to send the object updatedGa,e as a string. Wont work
  } catch (error) {
    res.send(error)
  }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete("/:id", async (req, res, next) => {
  const {id} = req.params
    try {
      const deletedGame = await deleteVideoGame(id)

      if (!deletedGame) {
        res.send({error: "Error", message: `There is not a videogame with the ID of ${id}`})
      } else {
        res.send({success: "Success", message: `The following videogame has been deleted:`, result: deletedGame})
      }
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;

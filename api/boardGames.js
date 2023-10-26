const express = require('express');
const router = express.Router();
const { getAllBoardGames,
    getBoardGameById,
    createBoardGame,
    updateBoardGame,
    deleteBoardGame } = require('../db')

// GET - /api/board-games - get all board games
router.get('/', async (req, res) => {
    try {
        const boardGames = await getAllBoardGames()
        
        if (!boardGames) {
          res.send({error: "Error", message: "There are no games in this database."})
        } else {
          res.send(boardGames)
        }
        
      } catch (error) {
        res.send(error);
      }
});

// GET - /api/board-games/:id - get a single board game by id
router.get('/:id', async (req, res) => {
    try {
       
    } catch (error) {
       
    }
});

// POST - /api/board-games - create a new board game
router.post('/', async (req, res) => {
    const newGame = req.body;

    try {
      const boardGame = await createBoardGame(newGame)
      
      res.send({success: "Success! The following game has been created:", data: boardGame})
  
    } catch (error) {
  
      res.send(error);
    }
});

// PUT - /api/board-games/:id - update a single board game by id
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const fields = req.body
  
    try {
      const updatedGame = await updateBoardGame(id, fields)
  
      res.send({success: "Your boardgame was succesfully updated.", message: updatedGame})
   
    } catch (error) {
      res.send(error)
    }
});

// DELETE - /api/board-games/:id - delete a single board game by id
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
      const deletedGame = await deleteBoardGame(id)

      if (!deletedGame) {
        res.send({error: "Error", message: `There is not a boardgame with the ID of ${id}`})
      } else {
        res.send({success: "Success", message: `The following boardgame has been deleted:`, result: deletedGame})
      }
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;
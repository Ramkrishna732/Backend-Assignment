module.exports = (app) => {
    const movie = require('../controllers/movie.controller.js');

    // Create a new Note
    app.post('/movie', movie.create);

    // Retrieve all Notes
    app.get('/movie', movie.findAll);

    // Retrieve a single Note with noteId
    app.get('/movie/:movieId', movie.findOne);

    // Update a Note with noteId
    app.put('/movie/:movieId', movie.update);

    // Delete a Note with noteId
    app.delete('/movie/:movieId', movie.delete);
}
module.exports = (app) => {
    const movie = require('../controllers/movie.controller.js');

    
    //route for creating data
    app.post('/movie', movie.create);

    //route for retriving data
    app.get('/movie', movie.findAll);

    //route for retriving data
    app.get('/movie/:movieId', movie.findOne);

    //route for updating data
    app.put('/movie/:movieId', movie.update);

    //route for deleting data
    app.delete('/movie/:movieId', movie.delete);
}
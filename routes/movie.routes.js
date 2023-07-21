module.exports = (app) => {
    const movie = require('../controllers/movie.controller.js');

    
    app.post('/movie', movie.create);

    
    app.get('/movie', movie.findAll);

    
    app.get('/movie/:movieId', movie.findOne);

    
    app.put('/movie/:movieId', movie.update);

    
    app.delete('/movie/:movieId', movie.delete);
}
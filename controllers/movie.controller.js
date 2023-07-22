const Movie = require('../models/movie.model.js');


//creating new data
exports.create = (req, res) => {
    
    if(!req.body.name) {
        return res.status(400).send({
            message: "Movie name can not be empty"
        });
    }
    if(!req.body.img) {
        return res.status(400).send({
            message: "Movie Image URl can not be empty"
        });
    }
    if(!req.body.summary) {
        return res.status(400).send({
            message: "Movie summary can not be empty"
        });
    }

    
    const movie = new Movie({
        name: req.body.name, 
        img: req.body.img,
        summary: req.body.summary
    });

    
    movie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the movie data."
        });
    });
};

//retriving data
exports.findAll = (req, res) => {
    Movie.find()
    .then(movie => {
        res.send(movie);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });            
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Movie with id " + req.params.movieId
        });
    });
};

//updating data
exports.update = (req, res) => {
    
    if(!req.body.summary) {
        return res.status(400).send({
            message: "movie content can not be empty"
        });
    }

    
    Movie.findByIdAndUpdate(req.params.movieId, {
        name: req.body.name || "Untitled Note",
        img:req.body.img,
        summary: req.body.summary
    }, {new: true})
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error updating movie with id " + req.params.movieId
        });
    });
};

//deleting data

exports.delete = (req, res) => {
    Movie.findByIdAndRemove(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        res.send({message: "Movie deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Movie with id " + req.params.movieId
        });
    });
};
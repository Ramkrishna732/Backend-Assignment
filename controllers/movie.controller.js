const Movie = require('../models/movie.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
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

    // Create a Note
    const movie = new Movie({
        name: req.body.name, 
        img: req.body.img,
        summary: req.body.summary
    });

    // Save Note in the database
    movie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the movie data."
        });
    });
};

// Retrieve and return all notes from the database.
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

// Find a single movie with a movieId
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

// Update a note identified by the movieId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.summary) {
        return res.status(400).send({
            message: "movie content can not be empty"
        });
    }

    // Find note and update it with the request body
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

// Delete a note with the specified noteId in the request
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
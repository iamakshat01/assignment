const { model, Schema } = require('mongoose');


const movieSchema = new Schema({
    Title: {
        type: String,
        required: true,
        unique: true
    },

    Year: {
        type: Number,
        required: true
    },

    imdbID: {
        type: String,
        required: true
    },

    imdbRating: {
        type: String,
        required: true
    },

    imdbVotes: {
        type: String,
        required: true
    },

    Ratings: {
        type: [],
    } 

})


module.exports = model('Movies', movieSchema);
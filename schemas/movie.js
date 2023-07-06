const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    director: { type: String, required: true },
    published_date: { type: Date, required: true },
    genre: { type: Array, required: true },
    rating: { type: Number, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

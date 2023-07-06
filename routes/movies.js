const express = require("express");
const Movie = require("../schemas/movie");

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
    const page = parseInt(req.query.page || "1");
    const perPage = parseInt(req.query.perPage || "10");
    const minRating = parseInt(req.query.minRating || "0");
    const maxRating = parseInt(req.query.maxRating || "10");

    console.log(req.query);

    const query = { rating: { $gte: minRating, $lte: maxRating } };

    if (req.query.genre) {
        query.genre = { $in: req.query.genre };
    }

    console.log(query);

    const projection = { title: 1, rating: 1, genre: 1 };

    const movies = await Movie.find(query, projection)
        .skip((page - 1) * perPage)
        .limit(perPage);

    res.send(movies);
});

// Create a new movie
router.post("/", async (req, res) => {
    const body = req.body;
    // validate body

    const newMovie = new Movie({
        title: body.title,
        director: body.director,
        published_date: body.published_date,
        genre: body.genre,
        rating: body.rating,
    });

    const data = await newMovie.save().catch((err) => {
        console.log(err);
    });
    res.send(data);
});

// delete a movie
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const result = await Movie.deleteOne({ _id: id }).catch((err) => {
        res.send({ error: err.message });
    });
    res.send(result);
});

// update a movie
router.put("/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    const data = await Movie.updateOne({ _id: id }, body).catch((err) => {});
    res.send(data);
});

module.exports = router;

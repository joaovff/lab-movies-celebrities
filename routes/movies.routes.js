const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// Create
router.get("/movies/create", async (req, res, next) => {
  try {
    const allCelebs = await Celebrity.find();
    res.render("movies/new-movie", { celebs: allCelebs });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;
    const createdMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    console.log("new movie was created", createdMovie);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// Read
router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render("movies/movies", { movies: allMovies });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/movie-details", movie); // how can i pass the name??
  } catch (error) {
    next(error);
  }
});

// Delete
router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    console.log("Deleted!!");
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// Update
router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    const celeb = await Celebrity.find();
    const celeb2 = celeb.filter((celeb) => {
      if (!movie.cast.includes(celeb)) {
        return celeb;
      }
    });
    res.render("movies/edit-movie", { movie, celeb2, celebrities: celeb });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
    const updatedBook = await Movie.findByIdAndUpdate(id, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect(`/movies/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

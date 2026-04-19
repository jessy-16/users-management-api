import * as movieService from "../services/movie.service.js";

const getAllMovies = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const movies = await movieService.getAllMovies(page, limit);
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

const getMovieById = async (req, res, next) => {
    try {
        const movie = await movieService.getMovieById(req.params.id);
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

const createMovie = async (req, res, next) => {
    try {
        const { title, releaseYear, genre, director } = req.body;

        if (!title || !releaseYear || !genre || !director) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const movie = await movieService.createMovie(req.body);
        res.status(201).json(movie);
    } catch (error) {
        next(error);
    }
};

const updateMovie = async (req, res, next) => {
    try {
        const movie = await movieService.updateMovie(req.params.id, req.body);
        res.json(movie);
    } catch (error) {
        next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        await movieService.deleteMovie(req.params.id);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const searchMovies = async (req, res, next) => {
    try {
        const { title, genre } = req.query;
        const movies = await movieService.searchMovies(title, genre);
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

export {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovies
};
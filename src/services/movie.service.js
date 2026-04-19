import prisma from "../models/prisma.js";

const getAllMovies = async (page = 1, limit = 10) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;

    const movies = await prisma.movie.findMany({
        skip,
        take: limit
    });

    const total = await prisma.movie.count();

    return {
        data: movies,
        total,
        page,
        limit
    };
};

const getMovieById = async (id) => {
    const movie = await prisma.movie.findUnique({
        where: { id }
    });

    if (!movie) {
        const error = new Error("Movie not found");
        error.statusCode = 404;
        throw error;
    }

    return movie;
};

const createMovie = async (data) => {
    const movie = await prisma.movie.create({
        data: {
            title: data.title,
            description: data.description,
            releaseYear: data.releaseYear,
            genre: data.genre,
            director: data.director,
            rating: data.rating || 0
        }
    });

    return movie;
};

const updateMovie = async (id, data) => {
    const movie = await prisma.movie.update({
        where: { id },
        data: {
            ...(data.title && { title: data.title }),
            ...(data.description && { description: data.description }),
            ...(data.releaseYear && { releaseYear: data.releaseYear }),
            ...(data.genre && { genre: data.genre }),
            ...(data.director && { director: data.director }),
            ...(data.rating !== undefined && { rating: data.rating })
        }
    });

    return movie;
};

const deleteMovie = async (id) => {
    await prisma.movie.delete({
        where: { id }
    });
};

const searchMovies = async (title, genre) => {
    const movies = await prisma.movie.findMany({
        where: {
            AND: [
                title
                    ? {
                          title: {
                              contains: title,
                              mode: "insensitive"
                          }
                      }
                    : {},
                genre
                    ? {
                          genre: {
                              contains: genre,
                              mode: "insensitive"
                          }
                      }
                    : {}
            ]
        }
    });

    return movies;
};

export {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovies
};
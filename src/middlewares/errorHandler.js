const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Prisma erreurs
    if (err.code === "P2002") {
        return res.status(409).json({ message: "Duplicate value" });
    }

    if (err.code === "P2025") {
        return res.status(404).json({ message: "Resource not found" });
    }

    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
};

export default errorHandler;
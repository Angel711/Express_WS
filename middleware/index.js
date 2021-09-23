module.exports = (req, res, next) => {
    return res.status(201).json({ code: 1, message: "Welcome to the Pokedex" });
}
const router = require("express").Router();
const { User, Score, Song } = require("../models");
const withAuth = require("../utils/auth");

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            // include: [{ model: nameof the model }],
        });

        const user = userData.get({ plain: true });

        res.render("profile", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect("/profile");
        return;
    }

    res.render("login");
});

// * Leaderboard page
// TODO: add auth when login works
router.get("/scores", async (req, res) => {
    try {
        const scoreData = await Score.findAll({
            // The names of the users from the User model
            include: [{ model: User }],
            // Highest points at the top of the board
            order: [["points", "DESC"]],
        });
        const scores = scoreData.map((score) => score.get({ plain: true }));

        res.render("scores", {
            scores,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// * Songs page
// TODO: add auth when login works and where user_id == session
router.get("/songs", async (req, res) => {
    try {
        const songData = await Song.findAll({
            // ! Add when finish testing
            // where: {
            //     user_id: req.session.user_id,
            // },
        });
        const songs = songData.map((song) => song.get({ plain: true }));

        res.render("songs", {
            songs,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

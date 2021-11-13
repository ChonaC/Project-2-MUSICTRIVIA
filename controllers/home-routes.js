const router = require("express").Router();
const { User, Score } = require("../models");
const withAuth = require("../utils/auth");

// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            // include: [{ model: nameof the model }],
        });

        const user = userData.get({ plain: true });

        res.render('quiz', {
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
        res.redirect("/");
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

module.exports = router;
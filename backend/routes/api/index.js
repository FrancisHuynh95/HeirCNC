// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spot')
const reviewRouter = require('./review')
const bookingsRouter = require('./bookings')
const spotImages = require('./spot-images')
const reviewImages = require('./review-image')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/spots', spotRouter);

router.use('/spot-images', spotImages)

router.use('/review-images', reviewImages)

router.use('/bookings', bookingsRouter);

router.use('/reviews', reviewRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

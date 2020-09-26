// Initialize express router
const router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API running',
        message: 'Linkedin API Index - By Kevin Derome and Elies Senouci',
    });
});

// Import controllers
const usersController = require('./usersController');
const postController = require('./postController');
const commentController = require('./commentController');
const establishmentController = require('./establishmentController');

// User routes
router.route('/users')
    .get(usersController.index)
    .post(usersController.new);
router.route('/users/:userID')
    .get(usersController.view)
    .put(usersController.update)
    .delete(usersController.delete);
router.route('/users/relations/:userID')
    .get(usersController.relations);
router.route('/users/login')
    .post(usersController.login);
router.route('/users/subscribe/:userID')
    .put(usersController.subscribe);
router.route('/users/unsubscribe/:userID')
    .put(usersController.unsubscribe);
router.route('/users/follow/:userID')
    .put(usersController.follow);
router.route('/users/unfollow/:userID')
    .put(usersController.unfollow);
router.route('/users/ban/:userID')
    .put(usersController.ban);

// Post routes
router.route('/post')
    .get(postController.get)
    .post(postController.newpost);
router.route('/post/:id')
    .delete(postController.delete)
    .put(postController.update);

// Comment routes
router.route('/comment')
    .get(commentController.get)
    .post(commentController.post);
router.route('/comment/:id')
    .get(commentController.getPost)
    .delete(commentController.delete)
    .put(commentController.update);

router.route('/establishment')
    .get(establishmentController.get)
    .post(establishmentController.post);
router.route('/establishment/:id')
    .delete(establishmentController.delete)
    .put(establishmentController.update);

// Export API routes
module.exports = router;
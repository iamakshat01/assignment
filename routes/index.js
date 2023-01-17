const router = require('express').Router();
const {searchHandler, registerHandler, loginHandler, updateHandler, findTopHandler} = require('../controller/index.js');
const auth = require('../middleware/auth.js');

router.get('/search',auth, searchHandler);
router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.patch('/update/:id',auth, updateHandler);
router.get('/find',auth, findTopHandler);

module.exports = router;
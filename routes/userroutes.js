const express = require('express');
const { getusercontroller, updateusercontroller, resetpasswordcontroller, updatepasswordcontroller, deleteusercontroller } = require('../controllers/userController');
const authmiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.get('/getuser', authmiddleware, getusercontroller);
router.put('/upadateuser', authmiddleware, updateusercontroller);
router.post('/resetpassword', authmiddleware, resetpasswordcontroller);
router.post('/updatepassword', authmiddleware, updatepasswordcontroller);
router.delete('/deleteuser', authmiddleware, deleteusercontroller);


module.exports = router;
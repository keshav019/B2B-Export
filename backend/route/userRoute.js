const express = require('express');
const { registerUser, loginUser, getAllUsers, getSingleUser, updateUserRole, deleteUser, verifyOtp, addUser } = require('../controller/userController');
const { isAuthenticatedUser, authorizeRoles, checkSelf } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify/otp/:id').put(verifyOtp);
router.route("/profile/:id").get(checkSelf, getSingleUser);



router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/users").post(isAuthenticatedUser, authorizeRoles("admin"), addUser);

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
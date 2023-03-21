const addUser = require('./addUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const getUserData = require('./getUserData');
const updateUser = require('./updateUser');
const sendSubscriptionEmail = require('./inviteForSubsciption');
const addSubscription = require('./addSubscription');
const ctrlWrapper = require('../ctrlWrapper');

module.exports = {
  addUser: ctrlWrapper(addUser),
  loginUser: ctrlWrapper(loginUser),
  getUserData: ctrlWrapper(getUserData),
  logoutUser: ctrlWrapper(logoutUser),
  updateUser: ctrlWrapper(updateUser),
  sendSubscriptionEmail: ctrlWrapper(sendSubscriptionEmail),
  addSubscription: ctrlWrapper(addSubscription),
};

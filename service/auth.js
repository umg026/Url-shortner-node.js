// const sessionIdToUser = new Map() // for stateful authentication
const jwt = require("jsonwebtoken")
const secretKey = "$umang$123";


function setUser( user) {
  const payload = {
    _id : user._id,
    email: user.email,
    role: user.role

  }
  // sessionIdToUser.set(id, user);
  return jwt.sign(payload, secretKey)
}

function getUser(token) {
  // return sessionIdToUser.get(id);
  if(!token) return null;
  return jwt.verify(token, secretKey)
}

module.exports = {
  setUser,
  getUser
}
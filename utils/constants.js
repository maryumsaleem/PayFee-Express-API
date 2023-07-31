const success = "success";
const fail = "failed";
// Student Statuses
const schoolStatuses = {
  page: "This page does not exist",
  invalidId: "Record not found with provided id",
};

// Restrict Statuses
const restrictedStatuses = {
  unauthorized: "You are not authorized",
};
// Auth Statuses
let authMessages = {
  duplicateUser: "User already exists!",
  requiredEmail: "Email and Password are required!",
  requiredUser: "No user found with email address!",
  validEmail: "Email or Password is incorrect!",
  loggedIn: "You are Successfully Signed in!",
};

module.exports = {
  success,
  fail,
  schoolStatuses,
  restrictedStatuses,
  authMessages,
};

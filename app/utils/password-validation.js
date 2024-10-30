export function validatePassword(password) {
  console.log("password validation started");
  const lowerCaseRegex = /[a-z]/g;
  const upperCaseRegex = /[A-Z]/g;
  const numberRegex = /\d/g;

  // Check if password length is at least 6
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  // Check for at least 2 lowercase letters
  const lowerCaseMatches = password.match(lowerCaseRegex) || [];
  if (lowerCaseMatches.length < 2) {
    return "Password must contain at least 2 lowercase letters.";
  }

  // Check for at least 2 uppercase letters
  const upperCaseMatches = password.match(upperCaseRegex) || [];
  if (upperCaseMatches.length < 2) {
    return "Password must contain at least 2 uppercase letters.";
  }

  // Check for at least 2 numbers
  const numberMatches = password.match(numberRegex) || [];
  if (numberMatches.length < 2) {
    return "Password must contain at least 2 numbers.";
  }

  return null; // Password is valid
}

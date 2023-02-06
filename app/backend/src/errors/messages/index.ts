// 400
export const FIELDS_FILLED = 'All fields must be filled';

// 401
export const INCORRECT_LOGIN = 'Incorrect email or password';
export const TOKEN_INVALID = 'Token must be a valid token';

// 404
export const TEAM_NOT_FOUND = 'There is no team with such id!';
export const MATCH_NOT_FOUND = 'There is no match with such id!';
export const NOT_UPDATED = 'Not updated';

// 422
const EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';
export default EQUAL_TEAMS;

// 500
export const SERVER_ERROR = 'Internal Server Error';

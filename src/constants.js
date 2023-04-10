const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';

export const BACKEND_BASE_URL = 'https://tic-tac-toe-c5q2.onrender.com';
export const CREATE_NEW_ROOM_BACKEND_URL = `${BACKEND_BASE_URL}/create`;
export const JOIN_ROOM_BACKEND_URL = `${BACKEND_BASE_URL}/join`;

export const SUCCESS_SNACKBAR_CONTEXT_TYPE = SUCCESS;
export const FAIL_SNACKBAR_CONTEXT_TYPE = FAIL;
export const GENERAL_SNACKBAR_CONTEXT_TYPE = 'GENERAL';
export const INVISIBLE_SNACKBAR_CONTEXT_TYPE = '';

export const ROOM_CREATE_FAIL_MESSAGE = 'Unable to create room!';

export const JOIN_ROOM_REQ_EVENT = 'JOIN_ROOM_REQ_EVENT';
export const JOIN_ROOM_RES_EVENT = 'JOIN_ROOM_RES_EVENT';

export const JOIN_ROOM_SUCCESS_EVENT = SUCCESS;

export const NEW_PLAYER_JOIN_EVENT = 'NEW_PLAYER_JOIN_EVENT';
export const GET_PLAYERS_IN_ROOM_EVENT = 'GET_PLAYERS_IN_ROOM_EVENT';

export const VERIFY_TOKEN_REQ_EVENT = 'VERIFY_TOKEN_REQ_EVENT';
export const VERIFY_TOKEN_RES_EVENT = 'VERIFY_TOKEN_RES_EVENT';
export const VERIFY_TOKEN_SUCCESS = SUCCESS;
export const VERIFY_TOKEN_FAIL = FAIL;

export const VERIFY_GAME_REQ_EVENT = 'VERIFY_GAME_REQ_EVENT';
export const VERIFY_GAME_RES_EVENT = 'VERIFY_GAME_RES_EVENT';
export const VERIFY_GAME_SUCCESS = SUCCESS;
export const VERIFY_GAME_FAIL = FAIL;

export const GAME_ABANDONED_EVENT = 'GAME_ABANDONED_EVENT';
export const GAME_ABANDONED_MESSAGE = 'Opponent left the game. You Won!';

export const GET_GAME_STATE_REQ = 'GET_GAME_STATE_REQ';
export const GET_GAME_STATE_RES = 'GET_GAME_STATE_RES';

export const CROSS = 'X';
export const CIRCLE = 'O';

export const GAME_NOT_STARTED = 'GAME_NOT_STARTED';
export const GAME_IN_PROGRESS = 'GAME_IN_PROGRESS';
export const GAME_FINISHED = 'GAME_FINISHED';
export const GAME_STARTED_EVENT = 'GAME_STARTED_EVENT';

export const CLICK_EVENT_REQ = 'CLICK_EVENT_REQ';
export const CLICK_EVENT_RES = 'CLICK_EVENT_RES';

export const CHOOSE_NEXT_PLAYER_REQ = 'CHOOSE_NEXT_PLAYER_REQ';
export const CHOOSE_NEXT_PLAYER_RES = 'CHOOSE_NEXT_PLAYER_RES';

export const NOT_YOUR_MOVE_MESSAGE = 'Please wait for your turn!';
export const GAME_FINISHED_EVENT = 'GAME_FINISHED_EVENT';

export const GAME_FINISHED_RES = 'GAME_FINISHED_RES';
export const GAME_WON_MESSAGE = 'You won the game';
export const GAME_LOST_MESSAGE = 'You lost the game';

export const CURRENT_USER_PROMPT = 'Its your move';

export const GAME_TIE = 'GAME_TIE';

export const INVALID_USERNAME_MESSAGE = 'Username cannot be empty';
export const USERNAME_TOO_LONG_MESSAGE =
  'Username cannot have more than 20 characters';

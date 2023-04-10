import io from 'socket.io-client';
import { BACKEND_BASE_URL } from './constants';
export let socket = io.connect(BACKEND_BASE_URL);

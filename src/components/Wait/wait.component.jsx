import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User.context';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket.client';
import {
  GET_PLAYERS_IN_ROOM_EVENT,
  NEW_PLAYER_JOIN_EVENT,
  GENERAL_SNACKBAR_CONTEXT_TYPE,
  VERIFY_TOKEN_REQ_EVENT,
  VERIFY_TOKEN_FAIL,
  INVISIBLE_SNACKBAR_CONTEXT_TYPE,
  VERIFY_TOKEN_RES_EVENT,
} from '../../constants';
import { SnackbarContext } from '../../contexts/Snackbar';
import Player from '../Player/player.component';
import './wait.styles.scss';
const Wait = () => {
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext);
  const { setSnackbarContext } = useContext(SnackbarContext);
  const { token, userName, roomId } = userContext;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (
      !token ||
      token === '' ||
      !userName ||
      userName === '' ||
      !roomId ||
      roomId === ''
    )
      return navigate('/', { replace: true });

    socket.emit(VERIFY_TOKEN_REQ_EVENT, userContext);
    socket.on(VERIFY_TOKEN_RES_EVENT, (data) => {
      const { status } = data;
      if (status === VERIFY_TOKEN_FAIL) return navigate('/', { replace: true });
      socket.emit(GET_PLAYERS_IN_ROOM_EVENT, { roomId });
    });
    socket.on(NEW_PLAYER_JOIN_EVENT, (data) => {
      const { players, message } = data;
      setSnackbarContext({
        type: GENERAL_SNACKBAR_CONTEXT_TYPE,
        message,
      });
      setPlayers(players);
    });
  }, []);

  useEffect(() => {
    if (players.length === 2) {
      setTimeout(() => {
        setSnackbarContext({
          type: INVISIBLE_SNACKBAR_CONTEXT_TYPE,
          message: '',
        });
        navigate(`/game/${roomId}`, { replace: true });
      }, 1500);
    }
  }, [players]);

  return (
    <div className='players-container'>
      {players.map((player, index) => (
        <Player key={index}>{player}</Player>
      ))}
    </div>
  );
};

export default Wait;

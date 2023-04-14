import { useContext, useEffect } from 'react';
import axios from 'axios';
import './join.styles.scss';
import Button from '../Helpers/Button/button.component';
import {
  CREATE_NEW_ROOM_BACKEND_URL,
  FAIL_SNACKBAR_CONTEXT_TYPE,
  JOIN_ROOM_SUCCESS_EVENT,
  JOIN_ROOM_REQ_EVENT,
  JOIN_ROOM_RES_EVENT,
  INVALID_USERNAME_MESSAGE,
  ROOM_CREATE_FAIL_MESSAGE,
  SUCCESS_SNACKBAR_CONTEXT_TYPE,
  GAME_ABANDONED_EVENT,
  GAME_ABANDONED_MESSAGE,
  USERNAME_TOO_LONG_MESSAGE,
} from '../../constants';
import { SnackbarContext } from '../../contexts/Snackbar';
import { InitialUserContext, UserContext } from '../../contexts/User.context';
import { socket } from './../../socket.client';
import { useNavigate } from 'react-router-dom';
let clicked = false;
const Join = () => {
  const { userContext, setUserContext } = useContext(UserContext);
  const { userName, roomId } = userContext;
  const { setSnackbarContext } = useContext(SnackbarContext);
  const navigate = useNavigate();
  useEffect(() => {
    setUserContext(InitialUserContext);
    socket.disconnect();
    socket.connect();
    socket.on(GAME_ABANDONED_EVENT, () => {
      setSnackbarContext({
        type: SUCCESS_SNACKBAR_CONTEXT_TYPE,
        message: GAME_ABANDONED_MESSAGE,
      });
      navigate('/', { replace: true });
    });
    clicked = false;
  }, []);
  useEffect(() => {
    socket.on(JOIN_ROOM_RES_EVENT, (data) => {
      const { status, message } = data;
      console.log('JOIN data: ', data);
      setSnackbarContext({ type: status, message });
      if (status === JOIN_ROOM_SUCCESS_EVENT) {
        const { token, symbol, id } = data;
        setUserContext((userContext) => ({
          ...userContext,
          token,
          symbol,
          id,
        }));
        setTimeout(() => {
          navigate('/waiting', { replace: true });
        }, 1000);
      }
    });
  }, []);

  const joinRoom = () => {
    if (clicked) return;

    if (userName.length === 0) {
      return setSnackbarContext({
        type: FAIL_SNACKBAR_CONTEXT_TYPE,
        message: INVALID_USERNAME_MESSAGE,
      });
    }
    if (userName.length > 20) {
      return setSnackbarContext({
        type: FAIL_SNACKBAR_CONTEXT_TYPE,
        message: USERNAME_TOO_LONG_MESSAGE,
      });
    }
    clicked = true;
    socket.emit(JOIN_ROOM_REQ_EVENT, { userName, roomId });
  };

  const createNewRoom = async () => {
    try {
      const res = await axios.get(CREATE_NEW_ROOM_BACKEND_URL);
      const { status, data, message } = res.data;
      if (status !== SUCCESS_SNACKBAR_CONTEXT_TYPE) {
        return setSnackbarContext({
          type: FAIL_SNACKBAR_CONTEXT_TYPE,
          message: ROOM_CREATE_FAIL_MESSAGE,
        });
      }
      setUserContext({ ...userContext, roomId: data });
      setSnackbarContext({
        type: SUCCESS_SNACKBAR_CONTEXT_TYPE,
        message,
      });
    } catch (err) {
      let message = ROOM_CREATE_FAIL_MESSAGE;
      try {
        message = err.response.data.data;
      } catch (err) {}
      setSnackbarContext({
        type: FAIL_SNACKBAR_CONTEXT_TYPE,
        message,
      });
    }
  };

  return (
    <div className='join-container'>
      <div className='join-heading'>Join A Room</div>
      <form className='form'>
        <input
          className='input'
          name='username'
          type='text'
          placeholder='username'
          value={userName}
          onChange={(event) =>
            setUserContext({ ...userContext, userName: event.target.value })
          }
          required
        />
        <input
          name='room-id'
          className='input'
          type='text'
          placeholder='roomId'
          value={roomId}
          onChange={(event) =>
            setUserContext({ ...userContext, roomId: event.target.value })
          }
          required
        />
      </form>
      <div className='buttons-container'>
        <Button buttonType='join' customClickEvent={joinRoom}>
          Join Room
        </Button>
        <Button buttonType='new' customClickEvent={createNewRoom}>
          New Room
        </Button>
      </div>
    </div>
  );
};
export default Join;

import { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../contexts/User.context';
import './game.styles.scss';
import Card from './../Card/card.component';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from './../../socket.client';
import {
  CLICK_EVENT_RES,
  NOT_YOUR_MOVE_MESSAGE,
  VERIFY_GAME_FAIL,
  VERIFY_GAME_REQ_EVENT,
  VERIFY_GAME_RES_EVENT,
  GAME_STARTED_EVENT,
  GAME_NOT_STARTED,
  FAIL_SNACKBAR_CONTEXT_TYPE,
  GAME_IN_PROGRESS,
  CHOOSE_NEXT_PLAYER_REQ,
  CHOOSE_NEXT_PLAYER_RES,
  CLICK_EVENT_REQ,
  SUCCESS_SNACKBAR_CONTEXT_TYPE,
  GAME_WON_MESSAGE,
  GAME_LOST_MESSAGE,
  GAME_FINISHED_EVENT,
  CURRENT_USER_PROMPT,
  GAME_TIE,
  GAME_FINISHED,
} from '../../constants';
import { SnackbarContext } from '../../contexts/Snackbar';

const Game = () => {
  const [gameState, setGameState] = useState({
    currentState: GAME_NOT_STARTED,
    tiles: [],
  });
  const { setSnackbarContext } = useContext(SnackbarContext);
  const { userContext, setUserContext } = useContext(UserContext);
  const { token, userName, roomId, myMove, symbol } = userContext;
  const { id } = useParams();
  const { currentState, tiles } = gameState;
  const navigate = useNavigate();

  useEffect(() => {
    if (myMove) {
      setSnackbarContext({
        type: SUCCESS_SNACKBAR_CONTEXT_TYPE,
        message: CURRENT_USER_PROMPT,
      });
    }
  }, [myMove]);

  const updateTiles = ({ tileId, symbol }) => {
    setGameState((gameState) => {
      const newTiles = [...gameState.tiles];
      newTiles[tileId] = { image: symbol };
      return { ...gameState, tiles: newTiles };
    });
  };

  useEffect(() => {
    if (
      !token ||
      token === '' ||
      !userName ||
      userName === '' ||
      !roomId ||
      roomId === '' ||
      roomId !== id
    ) {
      return navigate('/', { replace: true });
    }

    socket.emit(VERIFY_GAME_REQ_EVENT, userContext);
    socket.on(VERIFY_GAME_RES_EVENT, (data) => {
      const { status } = data;
      if (status === VERIFY_GAME_FAIL) return navigate('/', { replace: true });
    });
    socket.on(GAME_STARTED_EVENT, ({ tiles, firstPlayer }) => {
      setUserContext((userContext) => ({
        ...userContext,
        myMove: userContext.id === firstPlayer,
      }));
      setGameState({
        currentState: GAME_IN_PROGRESS,
        tiles,
      });
    });

    socket.on(CLICK_EVENT_RES, ({ tileId, symbol, socketid }) => {
      if (userContext.id === socketid) {
        console.log('UC: ', userContext);
        socket.emit(CHOOSE_NEXT_PLAYER_REQ, { socketid, roomId });
      }
      updateTiles({ tileId, symbol });
    });
    socket.on(CHOOSE_NEXT_PLAYER_RES, ({ socketid }) => {
      if (userContext.id === socketid) {
        setUserContext((userContext) => ({ ...userContext, myMove: true }));
      }
    });

    socket.on(GAME_FINISHED_EVENT, ({ tileId, symbol, socketid }) => {
      setGameState((gameState) => ({
        ...gameState,
        currentState: GAME_FINISHED,
      }));
      updateTiles({ tileId, symbol });
      if (userContext.id === socketid)
        setSnackbarContext({
          type: SUCCESS_SNACKBAR_CONTEXT_TYPE,
          message: GAME_WON_MESSAGE,
        });
      else
        setSnackbarContext({
          type: FAIL_SNACKBAR_CONTEXT_TYPE,
          message: GAME_LOST_MESSAGE,
        });
      socket.disconnect();
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    });

    socket.on(GAME_TIE, ({ message, tileId, symbol }) => {
      setGameState((gameState) => ({
        ...gameState,
        currentState: GAME_FINISHED,
      }));
      updateTiles({ tileId, symbol });
      setSnackbarContext({
        type: SUCCESS_SNACKBAR_CONTEXT_TYPE,
        message,
      });
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    });
  }, []);

  const clickHandler = (tileId) => {
    if (currentState !== GAME_IN_PROGRESS || tiles[tileId].image !== '') return;
    if (!myMove) {
      return setSnackbarContext({
        type: FAIL_SNACKBAR_CONTEXT_TYPE,
        message: NOT_YOUR_MOVE_MESSAGE,
      });
    }
    socket.emit(CLICK_EVENT_REQ, {
      roomId,
      symbol,
      tileId,
      socketid: userContext.id,
    });
    setUserContext((userContext) => ({ ...userContext, myMove: false }));
  };

  return (
    <div className='game-container'>
      {currentState !== GAME_NOT_STARTED &&
        tiles.map((tile, index) => (
          <Card
            key={index}
            image={tile.image}
            id={index}
            customClickEvent={clickHandler}
          />
        ))}
    </div>
  );
};
export default Game;

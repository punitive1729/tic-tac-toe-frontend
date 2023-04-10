import './player.styles.scss';
const Player = (props) => {
  return <div className='player-container'>{props.children}</div>;
};
export default Player;

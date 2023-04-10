import './card.styles.scss';
import Cross from './../../images/X.svg';
import Circle from './../../images/O.svg';
import { CIRCLE, CROSS } from '../../constants';

const Card = ({ image, customClickEvent, id }) => {
  let source = null;
  if (image === CROSS) source = Cross;
  if (image === CIRCLE) source = Circle;

  return (
    <div className='card-container' onClick={() => customClickEvent(id)}>
      {source && <img src={source} alt={image} className='card-image' />}
    </div>
  );
};

export default Card;

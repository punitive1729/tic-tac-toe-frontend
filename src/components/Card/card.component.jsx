import './card.styles.scss';
import Cross from './../../images/X.svg';
import Circle from './../../images/O.svg';
import { CIRCLE, CROSS } from '../../constants';

const Card = ({ image, customClickEvent, id }) => {
  let source = null;
  if (image === CROSS)
    source = <img src={Cross} alt={image} className='card-image' />;
  if (image === CIRCLE)
    source = <img src={Circle} alt={image} className='card-image' />;

  return (
    <div className='card-container' onClick={() => customClickEvent(id)}>
      source
    </div>
  );
};

export default Card;

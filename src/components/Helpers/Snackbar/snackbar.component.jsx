import { useContext } from 'react';
import './snackbar.styles.scss';
import { SnackbarContext } from '../../../contexts/Snackbar';
import {
  SUCCESS_SNACKBAR_CONTEXT_TYPE,
  FAIL_SNACKBAR_CONTEXT_TYPE,
  GENERAL_SNACKBAR_CONTEXT_TYPE,
} from '../../../constants';
const SnackBar = () => {
  const { snackbarContext } = useContext(SnackbarContext);
  const { type, message } = snackbarContext;
  let color = 'green',
    classname = 'no-show';
  if (type === SUCCESS_SNACKBAR_CONTEXT_TYPE) {
    classname = `snackbar-container`;
  }
  if (type === FAIL_SNACKBAR_CONTEXT_TYPE) {
    classname = `snackbar-container`;
    color = 'red';
  }
  if (type === GENERAL_SNACKBAR_CONTEXT_TYPE) {
    classname = `snackbar-container`;
    color = 'blue';
  }
  return (
    <div className={classname}>
      <div className='snackbar' style={{ backgroundColor: color }}>
        {message}
      </div>
    </div>
  );
};
export default SnackBar;

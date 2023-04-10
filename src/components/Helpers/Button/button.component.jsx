import './button.styles.scss';
const Button = ({ children, buttonType, customClickEvent }) => {
  return (
    <div className={`button-${buttonType}`} onClick={customClickEvent}>
      {children}
    </div>
  );
};
export default Button;

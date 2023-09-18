interface Props {
    children: string;
    // color?: "primary" | "secondary" | "danger";
    style: string;
    onClick: () => void;
  }
  
  const Button = ({ children, style="gray-200", onClick }: Props) => {
    return (
      <button className={style} onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default Button;
  
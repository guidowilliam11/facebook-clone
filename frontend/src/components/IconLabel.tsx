import { ReactNode } from "react";

interface Props {
  children: string;
  icon: ReactNode;
  style: string;
  onClick: () => void;
}

const IconLabel = ({ icon, children, style = "gray-200", onClick }: Props) => {
  return (
    <div className={style} onClick={onClick}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
        {icon}
      </div>
      <div className="unselectable">{children}</div>
    </div>
  );
};

export default IconLabel;

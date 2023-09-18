import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const FormLayout = ({ children }: Props) => {
    const navigate = useNavigate();
    const gotoHome = () => {
        navigate('/');
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png"
        alt="Facebook"
        className="w-[250px] mb-16"
        onClick={gotoHome}
      />
      <div className="block bg-white border border-gray-200 rounded-lg shadow max-w-md">
        {children}
      </div>
    </div>
  );
};

export default FormLayout;

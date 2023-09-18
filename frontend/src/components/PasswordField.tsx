import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  onChange: any;
  value: string;
};

const PasswordField = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center w-full h-fit">
      <input
        className="border border-gray-200 rounded p-3 w-full"
        type={showPassword ? "text" : "password"}
        required
        placeholder="New Password"
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
      <div
        className="absolute right-[10px] top-1/2 -translate-y-1/3"
        onClick={handleTogglePassword}
      >
        {showPassword ? <FaEyeSlash className="text-gray-500"/> : <FaEye className="text-gray-500"/>}
      </div>
    </div>
  );
};

export default PasswordField;

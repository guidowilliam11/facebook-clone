import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props{
    children: ReactNode,
    activePage: string,
    onClick: () => void,
}

const CircleButton = ({ children, activePage, onClick }: Props) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(window.location.pathname);

  return (
    <button
      className={page != activePage ?"flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-blue-200 hover:text-fblue focus:outline-none" : "flex items-center justify-center w-8 h-8 rounded-full text-fblue bg-blue-200 hover:bg-blue-300 focus:outline-none"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CircleButton;
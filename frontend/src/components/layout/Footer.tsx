import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <nav className="text-gray-500 text-sm break-words unselectable">
      <div>
        <span>
          <a href="" className="hover:underline">Privacy</a>
        </span>
        <span> . </span>
        <span>
          <a href="" className="hover:underline">Terms</a>
        </span>
        <span> . </span>
        <span>
          <a href="" className="hover:underline">Advertising</a>
        </span>
        <span> . </span>
        <span>
          <a href="" className="hover:underline">Ad Choices</a>
        </span>
        <span> . </span>
        <span>
          <a href="" className="hover:underline">Cookies</a>
        </span>
        <span> . </span>
        <span>
          <a href="" className="hover:underline">More</a>
        </span>
        <span> . </span>
        <span>
          <a href="" className="hover:underline">GW &copy; 2023</a>
        </span>
      </div>
    </nav>
  );
};

export default Footer;

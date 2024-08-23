import { useNavigate } from "react-router-dom";
import back from "./Assests/Desktop - 1.png";
import NavBar from "./NavBar";
const Home = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <NavBar></NavBar>
      <div className="h-96">
        <img className="w-full h-screen" alt="image" src={back}></img>
      </div>
    </div>
  );
};

export default Home;

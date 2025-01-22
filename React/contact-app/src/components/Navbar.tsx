import { FaPlus } from "react-icons/fa6";
import { useContext } from "react";
import { contactContext } from "../context/ContactContext";
const Navbar = () => {
  const context = useContext(contactContext);

  if (context) {
    const { popup, setPopup, totalCount } = context;

    const handlePopup = () => {
      setPopup(!popup);
    };

    return (
      <div className="container h-[100px]">
        <div className="mt-[20px] px-2 py-4 justify-between flex items-center">
          <h1 className="text-1xl font-bold">Contact Lists({totalCount})</h1>
          <span className="bg-blue-500 rounded-md p-2 text-white">
            <button className="gap-1 flex items-center" onClick={handlePopup}>
              <FaPlus /> Add New
            </button>
          </span>
        </div>
      </div>
    );
  }
};

export default Navbar;

import { FaPlus } from "react-icons/fa6";
const Navbar = () => {
  return (
    <div className="m-auto md:w-[70%] w-[full] h-[100px] bg-white ">
      <div className="mt-[20px] px-2 py-4 justify-between flex items-center">
        <h1 className="text-1xl font-bold">Contact Lists(0)</h1>
        <span className="bg-blue-500 rounded-md p-2 text-white">
          <button className="gap-1 flex items-center ">
            <FaPlus /> Add New
          </button>
        </span>
      </div>
    </div>
  );
};

export default Navbar;

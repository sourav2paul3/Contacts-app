import { useContext } from "react";
import { contactContext } from "../context/ContactContext";
const CreateContact = () => {
  const context = useContext(contactContext);
  if (context) {
    const { setPopup } = context;
    const handleClosePopup = () => {
      setPopup(false);
    };
    const handleSave = () => {};
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-gray-400 bg-opacity-70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold">New Contact</h1>
          <form onAbort={handleClosePopup} onSubmit={handleSave}>
            <div className="grid grid-cols-2 py-4 gap-4">
              <div>
                <h1 className="font-semibold">Name</h1>
                <input type="text" className="input" />
              </div>
              <div>
                <h1 className="font-semibold">Email</h1>
                <input type="text" className="input" />
              </div>
              <div>
                <h1 className="font-semibold">Title</h1>
                <input type="text" className="input" />
              </div>
              <div>
                <h1 className="font-semibold">Phone Number</h1>
                <input type="text" className="input" />
              </div>
              <div>
                <h1 className="font-semibold">Address</h1>
                <input type="text" className="input" />
              </div>
              <div>
                <h1 className="font-semibold">Status</h1>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer " />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 peer-focus:ring-opacity-75 rounded-full transition duration-200 peer-checked:bg-blue-500"></div>
                </label>
              </div>
              <div className="flex flex-col col-span-2 gap-2">
                <h1 className="font-semibold">Profile Photo</h1>
                <div className="flex items-center gap-2">
                  <button className="bg-blue-900 rounded p-1 text-sm text-gray-300">
                    Choose File
                  </button>
                  <input
                    className="bg-transparent "
                    value="No file chosen"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 px-2 py-1 text-white rounded-md"
                type="submit"
              >
                Cancel
              </button>
              <button
                className="bg-blue-900 px-2 py-1 text-white rounded-md"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default CreateContact;

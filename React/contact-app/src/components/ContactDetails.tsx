import { useContext, useEffect, useState, useRef } from "react";
import { contactContext } from "../context/ContactContext";
import CreateContact from "./CreateContact";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Contact } from "../Types/ContactType";
import { FaUserAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";

const ContactDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useContext(contactContext);
  const [contact, setContact] = useState<Contact>({} as Contact);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8091/contacts/getContact?id=${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch contact");
        const data = await response.json();
        setContact(data);
      } catch (error) {
        toast.error("Error fetching contact details");
      }
    };
    fetchData();
  }, [id]);

  const uploadPic = async (id: string, image: File) => {
    try {
      if (id && image) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("file", image);
        await fetch("http://localhost:8091/contacts/updatePhoto", {
          method: "PUT",
          body: formData,
        });
        setContact((prev) => ({
          ...prev,
          photoUrl: `${prev.photoUrl}?update_at=${new Date().getTime()}`,
        }));
        toast.success("Photo updated");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleBack = () => {
    navigate("/contacts");
    window.location.reload();
  };

  if (!context) {
    return (
      <div>
        <div className="loader"></div>
      </div>
    );
  }

  const { popup } = context;

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <button className="flex items-center font-bold mb-4" onClick={handleBack}>
        <IoIosArrowBack className="mr-1" />
        Back to Contact Lists
      </button>
      <div className="flex gap-4 mb-6">
        {contact.photoUrl ? (
          <img
            src={contact.photoUrl}
            alt="Contact"
            className="w-[120px] h-[120px] rounded-lg object-cover"
          />
        ) : (
          <FaUserAlt size={120} className="p-2 text-gray-400" />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{contact.name || "No Name"}</h1>
          <p className="text-xs text-gray-500">
            JPG, GIF, or PNG, Max size of 10MB
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm flex items-center gap-2"
            onClick={handleFileSelect}
          >
            <IoCloudUploadOutline size={20} />
            Choose Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadPic(contact.id, file);
            }}
          />
        </div>
      </div>
      <div className="bg-blue-100 p-4 rounded-lg shadow">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold">
                Name <span className="text-red-800">*</span>
              </label>
              <input
                type="text"
                className="input w-full"
                value={contact?.name || ""}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block font-bold">Email</label>
              <input
                type="email"
                className="input w-full"
                value={contact?.email || ""}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block font-bold">Title</label>
              <input
                type="text"
                className="input w-full"
                value={contact?.title || ""}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block font-bold">
                Phone Number <span className="text-red-800">*</span>
              </label>
              <input
                type="tel"
                className="input w-full"
                maxLength={10}
                pattern="[0-9]*"
                value={contact?.phone || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setContact((prev) => ({ ...prev, phone: value }));
                  }
                }}
              />
            </div>
            <div>
              <label className="block font-bold">Address</label>
              <input
                type="text"
                className="input w-full"
                value={contact?.address || ""}
                onChange={(e) =>
                  setContact((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>
            <div>
              <h1 className="font-bold">Status</h1>
              <label className="inline-flex items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={contact?.status === "Y"}
                  className="sr-only peer"
                  onChange={(e) => {
                    const newStatus = e.target.checked ? "Y" : "N";
                    setContact((prev) => ({ ...prev, status: newStatus }));
                  }}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-red-800 px-4 py-2 text-white rounded-md w-[100px] flex items-center gap-2"
              type="submit"
              onClick={handleBack}
            >
              <span>
                <MdOutlineCancel />
              </span>
              Cancel
            </button>
            <button
              className="bg-blue-500 px-4 py-2 text-white rounded-md w-[100px] flex items-center gap-2"
              type="submit"
            >
              <span>
                <IoSaveOutline />
              </span>
              Save
            </button>
          </div>
        </form>
      </div>
      {popup && <CreateContact />}
      <ToastContainer />
    </div>
  );
};

export default ContactDetails;

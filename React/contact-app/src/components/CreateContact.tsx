import { useContext, useState, useRef } from "react";
import { contactContext } from "../context/ContactContext";
import { Contact } from "../Types/ContactType";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
const CreateContact = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [contact, setContact] = useState<Contact | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const context = useContext(contactContext);
  if (context) {
    const { setPopup } = context;
    const handleClosePopup = (event: React.FormEvent) => {
      event.preventDefault();
      setPopup(false);
    };
    const handleSave = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        if (contact && contact.name && contact.phone) {
          const responseCreateContact = await fetch(
            "http://localhost:8091/contacts/create",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(contact),
            }
          );
          const data = await responseCreateContact.json();
          const id = data.id;
          if (id) {
            if (image) {
              const formData = new FormData();
              formData.append("id", id);
              formData.append("file", image);
              await fetch("http://localhost:8091/contacts/updatePhoto", {
                method: "PUT",
                body: formData,
              });
            }
            setPopup(false);
          }
        } else {
          toast.error("Name and Phone Number are required");
        }
      } catch (error) {
        toast.error("Error while creating contact");
      }
    };

    const handleFileSelect = () => {
      fileInputRef.current?.click();
    };
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-400 bg-opacity-70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold">New Contact</h1>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-2 py-4 gap-4">
                <div>
                  <h1 className="font-semibold">
                    Name <span className="text-red-800">*</span>
                  </h1>
                  <input
                    type="text"
                    className="input"
                    value={contact?.name}
                    onChange={(e) => {
                      if (contact) {
                        setContact({ ...contact, name: e.target.value });
                      } else {
                        setContact({ name: e.target.value } as Contact);
                      }
                    }}
                  />
                </div>
                <div>
                  <h1 className="font-semibold">Email</h1>
                  <input
                    type="email"
                    className="input"
                    value={contact?.email}
                    onChange={(e) => {
                      if (contact) {
                        setContact({ ...contact, email: e.target.value });
                      } else {
                        setContact({ email: e.target.value } as Contact);
                      }
                    }}
                  />
                </div>
                <div>
                  <h1 className="font-semibold">Title</h1>
                  <input
                    type="text"
                    className="input"
                    value={contact?.title}
                    onChange={(e) => {
                      if (contact) {
                        setContact({ ...contact, title: e.target.value });
                      } else {
                        setContact({ title: e.target.value } as Contact);
                      }
                    }}
                  />
                </div>
                <div>
                  <h1 className="font-semibold">
                    Phone Number <span className="text-red-800">*</span>
                  </h1>
                  <input
                    type="tel"
                    className="input"
                    maxLength={10}
                    pattern="[0-9]*"
                    value={contact?.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Validate input to allow only digits
                      if (/^\d*$/.test(value)) {
                        if (contact) {
                          setContact({ ...contact, phone: e.target.value });
                        } else {
                          setContact({ phone: e.target.value } as Contact);
                        }
                      }
                    }}
                  />
                </div>
                <div>
                  <h1 className="font-semibold">Address</h1>
                  <input
                    type="text"
                    className="input"
                    value={contact?.address}
                    onChange={(e) => {
                      if (contact) {
                        setContact({ ...contact, address: e.target.value });
                      } else {
                        setContact({ address: e.target.value } as Contact);
                      }
                    }}
                  />
                </div>
                <div>
                  <h1 className="font-semibold">Status</h1>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer "
                      checked={contact?.status === "Y"}
                      onChange={(e) => {
                        const newStatus = e.target.checked ? "Y" : "N";
                        if (contact) {
                          setContact({ ...contact, status: newStatus });
                        } else {
                          setContact({ status: newStatus } as Contact);
                        }
                      }}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 peer-focus:ring-opacity-75 rounded-full transition duration-200 peer-checked:bg-blue-500"></div>
                  </label>
                </div>
                <div className="flex flex-col col-span-2 gap-2">
                  <h1 className="font-semibold">Profile Photo</h1>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm flex items-center gap-2 w-[150px]"
                      type="button"
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
                        if (file) setImage(file);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-red-500 px-2 py-1 text-white rounded-md w-[100px] flex items-center gap-2"
                  type="submit"
                  onClick={handleClosePopup}
                >
                  <span>
                    <MdOutlineCancel />
                  </span>
                  Cancel
                </button>
                <button
                  className="bg-blue-900 px-2 py-1 text-white rounded-md w-[100px] flex items-center gap-2"
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
        </div>
        <ToastContainer />
      </>
    );
  }
};

export default CreateContact;

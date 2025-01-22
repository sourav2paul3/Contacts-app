import { useContext, useEffect, useState } from "react";
import { contactContext } from "../context/ContactContext";
import CreateContact from "./CreateContact";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Contact } from "../Types/ContactType";
import { FaUserAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";

const ContactDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useContext(contactContext);
  const [contact, setContact] = useState<Contact>({} as Contact);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8091/contacts/getContact?id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setContact(data);
    };
    fetchData();
  }, []);

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
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const handleBack = () => {
    navigate("/contacts");
    window.location.reload();
  };

  if (context) {
    const { popup } = context;
    return (
      <div className="container h-[400px]">
        <button className="flex items-center font-bold" onClick={handleBack}>
          <span>
            <IoIosArrowBack />
          </span>
          Back to Contact Lists
        </button>

        <div className="flex gap-2 mt-4">
          <div className="flex gap-2 bg-blue-100">
            {contact.photoUrl ? (
              <img
                src={contact.photoUrl}
                className="w-[90px] h-[100px] p-1 rounded-lg "
              />
            ) : (
              <FaUserAlt size={80} className="p-2" />
            )}

            <div className="flex flex-col gap-2 mt-4 px-2 mb-[10px]">
              <h1 className="text-md font-semibold">{contact.name}</h1>
              <p className="text-xs text-gray-500">
                JPG, GIF or PNG, Max size of 10MB
              </p>
              <input
                type="file"
                className="bg-transparent text-xs"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    uploadPic(contact.id, file);
                  }
                }}
              />
            </div>
          </div>
          <div className="border border-black bg-blue-100">Details Dedo</div>
        </div>
        {popup && <CreateContact />}
      </div>
    );
  } else {
    return (
      <div>
        <div className="loader"></div>
      </div>
    );
  }
};

export default ContactDetails;

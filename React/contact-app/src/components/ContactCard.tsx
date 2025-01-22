import { Contact } from "../Types/ContactType";
import { FaRegEnvelope } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdPhone } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { RxCheckCircled } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
const ContactCard = ({ contact }: { contact: Contact }) => {
  return (
    <div className="w-[260px] h-[235px] bg-blue-100 rounded-md shadow-md">
      <div className=" flex items-center ml-3 mt-3">
        {contact.photoUrl ? (
          <img
            className="w-[50px] h-[50px] rounded-full border-2 border-blue-900"
            src={contact.photoUrl}
            alt={contact.name}
          />
        ) : (
          <FaUserCircle
            size={55}
            className="w-[50px] h-[50px] rounded-full border-2 border-blue-900"
          />
        )}
        <div className="ml-3 ">
          <h1 className="text-2xl font-semibold">{contact.name}</h1>
          <p className="px-2 text-sm font-semibold text-blue-900 bg-gray-300 rounded-md">
            {contact.title}
          </p>
        </div>
      </div>
      <div className="ml-5 mt-4 text-blue-900 py-2 space-y-3">
        <div className="flex gap-4 items-center">
          <FaRegEnvelope className="text-[#1E3A8A]" />
          <span>{contact.email}</span>
        </div>
        <div className="flex gap-4 items-center">
          <HiOutlineLocationMarker className="text-[#1E3A8A]" />
          <span>{contact.address}</span>
        </div>
        <div className="flex gap-4 items-center">
          <MdPhone className="text-[#1E3A8A]" />
          <span>{contact.phone}</span>
        </div>
        <div className="flex gap-4 items-center">
          {contact.status === "N" ? (
            <RxCrossCircled className="text-red-500" />
          ) : (
            <RxCheckCircled className="text-green-500" />
          )}
          <span>{contact.status === "Y" ? "Active" : "Inactive"}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;

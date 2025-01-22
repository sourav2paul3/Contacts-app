import { useContext } from "react";
import ContactCard from "./ContactCard";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { contactContext } from "../context/ContactContext";
import CreateContact from "./CreateContact";
import { Link } from "react-router-dom";

const ContactList = () => {
  const context = useContext(contactContext);

  if (context) {
    const {
      contacts,
      currentPage,
      totalPages,
      loading,
      setCurrentPage,
      popup,
    } = context;

    const handlePrevious = () => {
      if (currentPage > 0) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages - 1) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    return (
      <div className="w-full">
        <div className="container grid grid-cols-2 lg:grid-cols-4 h-[full] bg-blue gap-9">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <Link to={`/contact/${contact.id}`} key={contact.id}>
                <ContactCard key={contact.id} contact={contact} />
              </Link>
            ))
          ) : (
            <p>No contacts found.</p>
          )}
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-300 rounded mr-2 disabled:opacity-50"
          >
            <MdNavigateBefore />
          </button>
          <span className="px-4 py-2">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 bg-gray-300 rounded ml-2 disabled:opacity-50"
          >
            <MdNavigateNext />
          </button>
        </div>
        {popup && <CreateContact />}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="loader"></div>
    </div>
  );
};

export default ContactList;

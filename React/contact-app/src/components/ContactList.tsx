import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import { Contact } from "../Types/ContactType";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:8091/contacts/getContacts?page=${currentPage}&size=10`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.content.length !== 0) {
          setContacts(data.content);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [currentPage]);

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
      <div className="grid grid-cols-2 md:grid-cols-4 m-auto md:w-[70%] w-full h-full bg-blue gap-2 border border-black">
        {loading ? (
          <p>Loading...</p>
        ) : contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard key={contact.id} {...contact} />
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
    </div>
  );
};

export default ContactList;

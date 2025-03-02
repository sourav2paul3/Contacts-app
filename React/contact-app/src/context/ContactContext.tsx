// contactContext.tsx
import React, { createContext, useMemo } from "react";
import { Contact } from "../Types/ContactType";
import { ContactContextType } from "../Types/ContactContextType";
import { useEffect, useState } from "react";

export const contactContext = createContext<ContactContextType | undefined>(
  undefined
);

export const ContactProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:8091/contacts/getContacts?page=${currentPage}&size=8`;
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
          setTotalCount(data.totalElements);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [currentPage, popup]);

  const contextValue = useMemo(
    () => ({
      contacts,
      currentPage,
      setCurrentPage,
      totalPages,
      loading,
      popup,
      setPopup,
      totalCount,
    }),
    [contacts, currentPage, totalPages, loading, popup, totalCount]
  );

  return (
    <contactContext.Provider value={contextValue}>
      <div>{children}</div>
    </contactContext.Provider>
  );
};

export default ContactProvider;

import React from "react";
import { Contact } from "./ContactType";
export type ContactContextType = {
  contacts: Contact[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  loading: boolean;
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  totalCount: number;
};

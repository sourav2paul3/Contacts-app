import { useContext } from "react";
import { contactContext } from "../context/ContactContext";

const ContactDetails = () => {
  const context = useContext(contactContext);
  if (context) {
    return <div>HI</div>;
  } else {
    return (
      <div>
        <div className="loader"></div>
      </div>
    );
  }
};

export default ContactDetails;

import React, { useState, useRef, useEffect } from "react";
import "./Modal.css";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Data validation
    if (!username || !email || !phone || !dob) {
      alert("Please fill out all fields");
      return;
    }

    if (!email.includes("@")) {
      alert(
        `Please include an '@' in the email address. '${email}' is missing an '@'.`
      );
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    const currentDate = new Date();
    const inputDate = new Date(dob);

    if (inputDate > currentDate) {
      alert("Invalid Date of birth. Date of birth cannot be in the future.");
      return;
    }

    // Submission logic
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <button onClick={openModal}>Open Form</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form>
              <label>
                Username:
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br />
              <label>
                Phone:
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <br />
              <label>
                Date of Birth:
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </label>
              <br />
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

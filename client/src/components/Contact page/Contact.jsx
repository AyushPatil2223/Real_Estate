import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import './Contact.css'; // Import your CSS file

const ContactPage = () => {
  const [formData, setFormData] = useState({ 
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const commonSubjects = [
    "General Inquiry",
    "Product Support",
    "Billing Question",
    "Partnership Opportunity"
  ];

  useEffect(() => {
    if (formData.subject) {
      const filtered = commonSubjects.filter(subject =>
        subject.toLowerCase().includes(formData.subject.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [formData.subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "subject":
        if (!value.trim()) {
          newErrors.subject = "Subject cannot be empty";
        } else {
          delete newErrors.subject;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      // Simulating form submission
      setTimeout(() => {
        setIsLoading(false);
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 2000);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, subject: suggestion }));
    setSuggestions([]);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="title">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
              aria-label="Your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input ${errors.email ? 'border-red-500' : ''}`}
              required
              aria-label="Your email address"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="error" role="alert">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="label">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`input ${errors.subject ? 'border-red-500' : ''}`}
              required
              aria-label="Subject of your message"
              aria-invalid={errors.subject ? "true" : "false"}
            />
            {errors.subject && <p className="error" role="alert">{errors.subject}</p>}
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message" className="label">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="textarea"
              required
              aria-label="Your message"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`submit-button ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              aria-label="Submit contact form"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;

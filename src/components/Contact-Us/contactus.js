import React, { useState } from "react";
import "./contactus.css";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";
import FadeWrapper from "../FadeOnScroll/FadeOnScroll";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name should only contain letters")
        .required("Name is Required"),
      email: Yup.string().email("Invalid Email").required("Email is Required"),
      message: Yup.string().required("Message is Required"),
    });

    validation
      .validate(formData, { abortEarly: false })
      .then(async () => {
        setStatus("Sending...");
        try {
          const res = await fetch(
            "https://amexi-q-server.vercel.app/api/sendmail",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            }
          );

          if (res.ok) {
            setStatus("Message sent successfully! ✅");
            setFormData({ name: "", email: "", message: "" });
          } else {
            setStatus("Failed to send. Please try again.");
          }

          setTimeout(() => setStatus(""), 3000);
        } catch (err) {
          setStatus("Error occurred: " + err.message);
        }
      })
      .catch((err) => {
        const fieldErrors = {};
        err.inner.forEach((error) => {
          fieldErrors[error.path] = error.message;
        });
        setValidationErrors(fieldErrors);
      });
  };

  return (
    <>
      {/* Banner */}
      <section className="contact-banner">
        <div className="contact-content">
          <p className="contact-eyebrow">Get In Touch</p>
          <h1>Contact Us</h1>
          <div className="breadcrumb">
            <span className="home">Home</span>
            <span className="separator">›</span>
            <span className="current">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <FadeWrapper baseDelay={0} gap={150}>
        <section className="contact-main">
          <div className="contact-page">
            {/* Left Section - Info */}
            <div className="contact-details">
              <h1>Get in Touch with Amexiq</h1>
              <p>
                Have a question, an idea, or want to collaborate? Our team is
                always ready to connect and help you. Reach out using any of the
                following options.
              </p>

              <div className="contact-points">
                {/* Visit Us */}
                <div className="contact-card">
                  <div className="contact-icon">
                    <LocationOnIcon fontSize="large" />
                  </div>
                  <div>
                    <h3>Visit Us</h3>
                    <p>
                      Dubai Festival City Mall, Dubai <br />
                      Nakheel Mall, Jumeirah <br />
                      Zabeel Park, Dubai <br />
                      The Galleria, Abu Dhabi <br />
                      Deerfields Mall, Abu Dhabi <br />
                      Abu Dhabi Mall, Abu Dhabi <br />
                      Faby Land & Xtream Zone, Sharjah
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="contact-card">
                  <div className="contact-icon">
                    <CallIcon fontSize="large" />
                  </div>
                  <div>
                    <h3>Call Us</h3>
                    <p>
                      📞 +971 52 123 4567 <br />☎ +971 4 234 5678
                    </p>
                    <small>
                      Available daily <br />
                      Mon–Fri: 10:00 AM – 9:00 PM <br />
                      Sat–Sun: 12:00 PM – 10:00 PM
                    </small>
                  </div>
                </div>

                {/* Email Us */}
                <div className="contact-card">
                  <div className="contact-icon">
                    <EmailIcon fontSize="large" />
                  </div>
                  <div>
                    <h3>Email Us</h3>
                    <p>
                      📧 info@amexiq.com <br />
                      support@amexiq.com
                    </p>
                    <small>
                      For partnerships: business@amexiq.com <br />
                      We aim to reply within 24 hours.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="contact-form">
              <form className="contact-form-page" onSubmit={handleSubmit}>
                <h3>Send Us a Message</h3>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {validationErrors.name && (
                  <p className="error">{validationErrors.name}</p>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && (
                  <p className="error">{validationErrors.email}</p>
                )}

                <textarea
                  rows={4}
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {validationErrors.message && (
                  <p className="error">{validationErrors.message}</p>
                )}

                <p className="privacy-note">
                  *We respect your privacy and never share your info with third
                  parties.
                </p>

                <button type="submit" disabled={status === "Sending..."}>
                  <SendIcon style={{ marginRight: "8px" }} />
                  {status === "Sending..." ? "Sending..." : "Send Message"}
                </button>

                {status && (
                  <p
                    style={{
                      marginTop: "10px",
                      fontWeight: "600",
                      color: status.includes("successfully")
                        ? "green"
                        : status.includes("Sending")
                        ? "#f5c332"
                        : "red",
                    }}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Google Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="500"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              title="Amexiq Locations"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </FadeWrapper>
    </>
  );
}

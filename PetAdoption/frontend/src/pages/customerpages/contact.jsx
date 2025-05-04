import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../services/api";
import Location from "./location";

const Contact = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const steps = [
    {
      id: "step1",
      question: "🐶 What's your name?",
      inputType: "text",
      placeholder: "Enter your name",
      key: "name",
    },
    {
      id: "step2",
      question: "📧 What's your email?",
      inputType: "email",
      placeholder: "Enter your email",
      key: "email",
    },
    {
      id: "step3",
      question: "📱 Your phone number?",
      inputType: "text",
      placeholder: "Enter phone number",
      maxLength: 11,
      key: "phone",
    },
    {
      id: "step4",
      question: "📝 Your message",
      inputType: "textarea",
      placeholder: "Tell us about your adoption interest...",
      key: "message",
    },
  ];

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await API.sendContact(formData);
      setToast("🎉 Contact submitted successfully!");
      setStep(1);
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      alert("Failed to submit contact.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-gradient-to-br from-white to-yellow-50 text-gray-800 p-6 flex flex-col items-center">
      {/* ✅ Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500" data-aos="fade-down">
          {toast}
        </div>
      )}

      <div className="w-full max-w-6xl mt-10">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-4"
          data-aos="zoom-in"
        >
          🐾 Let's Get You a Furry Friend!
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10" data-aos="fade-up">
          Reach out and we’ll help you meet your perfect pet companion 🐕🐈
        </p>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Contact Info */}
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-md w-full md:w-1/2" data-aos="fade-right">
            <h2 className="text-2xl font-bold mb-6">📇 Contact Information</h2>
            <div className="space-y-6">
              <ContactInfo
                label="Email"
                value="adopt@petcenter.org"
                iconSrc="https://cdn-icons-png.flaticon.com/512/5968/5968534.png"
                alt="Gmail Icon"
              />
              <ContactInfo
                label="Phone"
                value="123-456-7890"
                iconSrc="https://cdn-icons-png.flaticon.com/512/455/455705.png"
                alt="Phone Icon"
              />
              <ContactInfo
                label="Location"
                value="123 Puppy Lane, Petville"
                iconSrc="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                alt="Location Icon"
              />
            </div>
            <p className="mt-6 text-sm text-gray-500">We usually respond within 1–2 days 🕒</p>
          </div>

          {/* Form Steps */}
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-md w-full md:w-1/2" data-aos="fade-left">
            {steps.map((s, index) => (
              <div key={s.id} className={step === index + 1 ? "" : "hidden"}>
                <h2 className="text-xl font-semibold mb-4">{s.question}</h2>
                {s.inputType === "textarea" ? (
                  <>
                    <textarea
                      rows="4"
                      placeholder={s.placeholder}
                      className="w-full p-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      value={formData[s.key]}
                      onChange={(e) => handleChange(s.key, e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Characters: {formData.message.length}/1000
                    </p>
                  </>
                ) : (
                  <input
                    type={s.inputType}
                    placeholder={s.placeholder}
                    maxLength={s.maxLength}
                    className="w-full p-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={formData[s.key]}
                    onChange={(e) => handleChange(s.key, e.target.value)}
                  />
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex justify-between items-center mt-6">
              {step > 1 ? (
                <button
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-5 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < steps.length ? (
                <button
                  onClick={() => setStep((prev) => prev + 1)}
                  className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-xl transition"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-white"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit ✅"}
                </button>
              )}
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full ${
                    step === index + 1 ? "w-8 bg-yellow-500" : "w-2 bg-gray-300"
                  } transition-all`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full" data-aos="fade-up">
        <Location />
      </div>
    </div>
  );
};

const ContactInfo = ({ label, value, iconSrc, alt }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-3 bg-gray-100 rounded-full transition-transform group-hover:translate-y-1">
      <img src={iconSrc} alt={alt} className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  </div>
);

export default Contact;

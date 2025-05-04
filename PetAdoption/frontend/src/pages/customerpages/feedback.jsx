import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../services/api"; 

const Feedback = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !comment || rating === 0) {
      setErrorMessage("Please fill in all fields and provide a rating.");
      return;
    }

    const feedbackData = {
      name,
      email,
      comment,
      rating,
    };

    try {
      setIsSubmitting(true);
      await API.addFeedback(feedbackData); 
      setName("");
      setEmail("");
      setComment("");
      setRating(0);
      setErrorMessage(""); 

      // Show the success message
      setToast("Thank you for your feedback! 🐾");

      // After 3 seconds, refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage("There was an error submitting your feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center justify-center bg-white p-4 sm:p-6 font-['Poppins']">
      {/* Feedback Form */}
      <div
        className="w-full sm:max-w-md bg-gray-50 border border-gray-200 rounded-2xl shadow-md p-6 mb-8 lg:mb-0 lg:mr-10"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          🐾 Pawzio Feedback
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Tell us what made your tail wag or how we can improve! 🐕📬
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="email"
            placeholder="you@pawmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <div>
            <label className="text-sm block mb-1">Rate your experience 🐶⭐</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-transform hover:scale-125 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  aria-label={`Rate ${star} star`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            rows="4"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors duration-300 font-medium"
          >
            {isSubmitting ? "Sending..." : "✉️ Send Paw-ment"}
          </button>
        </form>
      </div>

      {/* Info Section */}
      <div
        className="w-full sm:max-w-md text-left"
        data-aos="fade-left"
      >
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent mb-4">
          🌿 Why Your Feedback Matters ❤️
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mb-3">
          Every bark, meow, and squeak counts! At <strong>Pawzio</strong>, we’re always sniffing out ways to improve your adoption experience. 🐕🐈‍⬛
        </p>
        <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
          <li>🐾 Help us build paw-sitive memories</li>
          <li>💌 Improve communication with pet parents</li>
          <li>🎯 Make matches more accurate and joyful</li>
          <li>🌈 Add fun, safe, and furry-friendly features</li>
          <li>📊 Shape the future of Pawzio with your voice</li>
        </ul>
      </div>

      {/* Success Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Feedback;

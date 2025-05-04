import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "../../services/api"; 

const FeedbackView = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        // Fetch feedbacks from API
        const fetchFeedbacks = async () => {
            try {
                const response = await API.getAllFeedback();
                setFeedbacks(response.data);
            } catch (error) {
                console.error("Failed to fetch feedback:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    const renderStars = (count) => {
        const fullStars = "★".repeat(count);
        const emptyStars = "☆".repeat(5 - count);
        return fullStars + emptyStars;
    };

    const visibleFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 4);

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50 min-h-screen font-['Poppins']">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                    💬 Paw-some Feedback from Our Community
                </h2>

                <p className="text-lg text-center text-gray-700 mb-6">
                    <span className="font-semibold text-teal-600">
                        {feedbacks.length}
                    </span>{" "}
                    customers have shared their thoughts and experiences with us! Read on to see why Pawzio is loved by so many. 🐾
                </p>

                <div className="grid gap-6 md:gap-8">
                    {visibleFeedbacks.map((fb) => (
                        <div key={fb.id} className="relative group" data-aos="fade-up">
                            <div className="absolute -bottom-1 left-0 h-1 w-full bg-teal-400 rounded-b-lg opacity-80 group-hover:opacity-100 transition-all duration-300"></div>

                            <div className="relative p-6 bg-white rounded-lg shadow-[inset_0_-2px_0_0_rgba(20,184,166,0.3)] hover:shadow-[inset_0_-3px_0_0_rgba(20,184,166,0.5)] transition-all duration-300">
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-teal-50 to-green-50 flex items-center justify-center text-teal-600 text-3xl md:text-4xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.05)]">
                                        👤
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                                    {fb.name}
                                                </h3>
                                                <p className="text-sm text-teal-600">{fb.email}</p>
                                            </div>
                                            <span className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-full shadow-sm">
                                                {new Date(fb.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </div>

                                        <div className="mb-3 text-yellow-500 text-lg md:text-xl">
                                            {renderStars(fb.rating)}
                                        </div>

                                        <p className="text-gray-700 md:text-lg leading-relaxed italic">
                                            &quot;{fb.comment}&quot;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {feedbacks.length > 4 && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="relative px-8 py-3 bg-white text-teal-600 font-medium rounded-lg hover:text-teal-700 transition duration-300 group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {showAll ? (
                                    <>
                                        <span>Show Less</span>
                                        <span>↑</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Show More</span>
                                        <span>↓</span>
                                    </>
                                )}
                            </span>
                            <span className="absolute bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-300"></span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackView;

import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Location = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  return (
    <section className="bg-gradient-to-br from-yellow-50 to-indigo-50 py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl font-extrabold text-gray-900">
            🗺️ Visit Pawzio's Home Base
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Where love finds its paws and tails begin new adventures 🐾
          </p>
        </div>

        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Section */}
            <div className="rounded-xl overflow-hidden shadow-xl" data-aos="fade-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757687!2d79.8607554153281!3d6.921682595003654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593e65e3a5e5%3A0x53e9b5a4f8a1a3f2!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="480"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-xl"
                title="Pawzio Location in Colombo"
              ></iframe>
            </div>

            {/* Info Section */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden" data-aos="fade-left">
              <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-blue-500">
                <h3 className="text-xl font-bold text-white">
                  📍 Our Adoption Hub
                </h3>
              </div>
              
              <div className="px-6 py-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🏢</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <p className="mt-1 text-gray-600">
                      No. 123, Pet Paradise Lane<br />
                      Colombo 03, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⏰</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Visiting Hours</h3>
                    <p className="mt-1 text-gray-600">
                      <span className="font-medium">Mon-Fri:</span> 9:00 AM - 6:00 PM<br />
                      <span className="font-medium">Sat:</span> 10:00 AM - 4:00 PM<br />
                      <span className="font-medium">Sun:</span> By appointment only 💝
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Get In Touch</h3>
                    <p className="mt-1 text-gray-600">
                      <span className="font-medium">📧 Email:</span> hello@pawzio.lk<br />
                      <span className="font-medium">📱 Phone:</span> +94 76 123 4567<br />
                      <span className="font-medium">💬 WhatsApp:</span> +94 76 765 4321
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 bg-blue-50">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">ℹ️</span>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Note:</span> Virtual consultations available!<br />
                    Schedule a video call to meet your future pet 🐶🐱
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
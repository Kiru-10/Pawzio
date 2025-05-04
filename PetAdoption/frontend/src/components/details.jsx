import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Details = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 overflow-x-hidden">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        {/* Text Content */}
        <div className="mr-auto place-self-center lg:col-span-7 text-center lg:text-left" data-aos="fade-up">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl xl:text-6xl dark:text-white transition-all duration-300">
            Adopt Your <br /> New Best Friend <span role="img" aria-label="paw">🐾</span>
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 transition-colors duration-300">
            Welcome to our Virtual Pet Adoption Center, where every pawprint matters. Whether you're looking for a loyal dog, a curious cat, or a playful bunny, we’ve got companions ready to meet you.
          </p>

          <ul className="max-w-2xl mb-6 space-y-3 text-left text-gray-700 dark:text-gray-300 font-medium transition-all duration-300">
            <li>🐶 <strong>Variety of breeds:</strong> High-energy or cuddle bugs — we’ve got them.</li>
            <li>📋 <strong>Verified health:</strong> Digital doctor card with vaccines & vet history.</li>
            <li>🧠 <strong>Behavior checked:</strong> Evaluated for safe adoption experiences.</li>
            <li>📦 <strong>Starter kit:</strong> Toys, food & a welcome bundle delivered.</li>
            <li>❤️ <strong>Fostered with care:</strong> Socialized and loved before rehoming.</li>
          </ul>

          <p className="max-w-2xl mb-6 text-sm text-gray-500 dark:text-gray-400 italic">
            🌐 100% online process with video meetups. Safe nationwide pet delivery available.
          </p>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center lg:justify-start">
            <a
              href="/adopt"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transform hover:scale-105 transition duration-300"
            >
              🐾 Browse Pets
            </a>

            <a
              href="/about"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white transform hover:scale-105 transition duration-300"
            >
              📖 Learn More
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="mt-12 lg:mt-0 lg:col-span-5 flex justify-center items-center" data-aos="fade-left">
          <img
            src="https://demo.themesberg.com/landwind/images/hero.png"
            alt="Adopt a pet hero"
            className="rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Details;

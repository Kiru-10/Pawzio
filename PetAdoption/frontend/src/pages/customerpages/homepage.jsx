import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MiniCard from '../../components/minicard';
import Service from '../../components/service';
import Details from '../../components/details';
import About from './about';
import Feedback from './feedback';
import FeedbackView from './feedbackview';
import Capture from './capture';
import CountCard from '../../components/countcard';

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
              <span className="block mb-2">Adopt a loving friend</span>
              <span className="bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent">
                from our Virtual Pet Center
              </span>
            </h1>

            <div
              className="mt-4 text-lg text-blue-600"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Find your perfect companion — in minutes!
            </div>

            <p
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:mt-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Explore adorable virtual pets, learn about their personalities,
              and bring joy to your screen by adopting a furry (or scaly!) friend.
              Interactive, fun, and totally heartwarming.
            </p>

            <div className="mt-8 sm:mt-10 flex justify-center" data-aos="zoom-in">
              <a
                href="#"
                className="inline-flex items-center rounded-md bg-emerald-500 px-8 py-3 text-base font-medium text-white shadow hover:bg-emerald-600 hover:scale-105 transition-transform md:text-lg"
              >
                Start Adopting 🐾
              </a>
            </div>

            {/* Animated Emoji Row */}
            <div
              className="mt-10 flex justify-center space-x-4 text-3xl"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <span className="animate-pulse">🐶</span>
              <span className="animate-pulse delay-100">🐱</span>
              <span className="animate-pulse delay-200">🐰</span>
              <span className="animate-pulse delay-300">🐢</span>
            </div>
          </div>
        </div>
      </div>

      {/* MiniCard */}
      <MiniCard />

      {/* Countcard */}
      <CountCard />

      {/* Serivce */}
      <Service />

      {/* Details */}
      <Details />

      {/* capture */}
      <Capture />

      {/* About */}
      <About />

      {/* Feedback */}
      <Feedback />

      {/* Feedbackview */}
      <FeedbackView />

    </div>
  );
};

export default HomePage;

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
import backgroundVideo from '../../assets/video.mp4';

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block mb-2">Adopt a loving friend</span>
              <span className="block bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent">
                from our Virtual Pet Center
              </span>
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Find your perfect companion — in minutes!
            </p>

            <p
              className="mx-auto mt-4 max-w-2xl text-white/90 sm:text-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Explore adorable virtual pets, learn about their personalities,
              and bring joy to your screen by adopting a furry (or scaly!) friend.
            </p>

            <div
              className="mt-8 sm:mt-10 flex justify-center gap-4 flex-wrap"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <a
                href="/adopt"
                className="inline-flex items-center rounded-md bg-emerald-500 px-8 py-3 text-base font-medium text-white shadow hover:bg-emerald-600 hover:scale-105 transition-transform md:text-lg"
              >
                Start Adopting 🐾
              </a>
              <a
                href="/about"
                className="inline-flex items-center rounded-md bg-white/20 px-8 py-3 text-base font-medium text-white shadow hover:bg-white/30 hover:scale-105 transition-transform md:text-lg backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>

            {/* Animated Emoji Row */}
            <div
              className="mt-10 flex justify-center space-x-4 text-3xl"
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <span className="animate-bounce">🐶</span>
              <span className="animate-bounce delay-75">🐱</span>
              <span className="animate-bounce delay-100">🐰</span>
              <span className="animate-bounce delay-150">🐢</span>
              <span className="animate-bounce delay-200">🐦</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the content */}
      <div className="relative z-10 bg-white">
        {/* MiniCard */}
        <MiniCard />

        {/* Countcard */}
        <CountCard />

        {/* Service */}
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
    </div>
  );
};

export default HomePage;
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full min-h-screen m-auto flex flex-col items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-7xl flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Main Content Section */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-16">
          {/* Image Section with Floating Circles */}
          <div className="relative w-full lg:w-1/2" data-aos="fade-right">
            {/* Floating images */}
            <img
              className="absolute z-20 lg:left-8 -top-4 left-4 lg:w-32 lg:h-32 w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow-md"
              src="https://imgs.search.brave.com/TxE8tZxmqwvrS3GLPcrM_EDggpQ0I3E8s2yNzo4W2OU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/dXRlLWRvZy13aXRo/LW93bmVyLXBldC1z/aG9wXzIzLTIxNDg4/NzI1NDkuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA"
              alt="Side Image 1"
            />
            <img
              className="absolute z-20 lg:top-48 sm:top-44 top-20 sm:-left-6 -left-4 lg:w-32 lg:h-32 w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow-md"
              src="https://imgs.search.brave.com/gln-edHnbXaTKzWHiUwrS_LeGLfiMIj_Al4ivtCBN9E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzI2LzI3Lzk0/LzM2MF9GXzUyNjI3/OTQ0Ml9HR0dQbmFy/eVMwbVh2RGNVTVRJ/M1hMR0NPM1dhTTlH/MC5qcGc"
              alt="Side Image 2"
            />
            <img
              className="absolute z-20 lg:bottom-8 sm:bottom-6 bottom-4 left-4 lg:w-32 lg:h-32 w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow-md"
              src="https://imgs.search.brave.com/uuZL4SBQhohailg90M1eixxWdC8v36hSIhponWHKtl8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jdXRlLWdpcmwt/d2l0aC1oZXItcG9v/ZGxlLXB1cHB5LXBl/dC1zaG9wXzQ3Mzcx/Mi0yMzYwLmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA"
              alt="Side Image 3"
            />
            {/* Main Image */}
            <img
              className="rounded-full relative object-cover mx-auto lg:w-[30rem] lg:h-[30rem] w-64 h-64 sm:w-96 sm:h-96 outline outline-4 outline-green-500 outline-offset-4 shadow-xl"
              src="https://imgs.search.brave.com/1AH3SzqAxeQpSbDc6H1WeQDM-EmLcjfe4Q2ncT72TRw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tb3RoZXItZGF1/Z2h0ZXItd2l0aC10/aGVpci1wb29kbGUt/cHVwcHktcGV0LXNo/b3BfNDczNzEyLTIz/ODEuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA"
              alt="About us"
            />
          </div>

          {/* Text Section */}
          <div
            className="w-full lg:w-1/2 p-6 shadow-xl shadow-green-300/40 flex flex-col justify-center items-center rounded-xl bg-white dark:bg-gray-800"
            data-aos="fade-left"
          >
            <h2 className="text-3xl sm:text-4xl text-center text-green-600 dark:text-green-400 font-bold mb-4">
              About Us
            </h2>
            <p className="text-2xl sm:text-3xl text-center text-gray-800 dark:text-gray-200 font-bold mb-6">
              Virtual Pet Adoption Center
            </p>
            <p className="text-base sm:text-lg md:text-xl mt-2 text-justify dark:text-gray-300 mb-4">
              Our mission is to connect loving homes with adorable pets in need.
              Through our virtual platform, you can browse, meet, and adopt pets
              from the comfort of your home. Whether you're looking for a playful
              pup or a calm kitty, we're here to help you find your perfect companion.
            </p>
            <p className="text-base sm:text-lg md:text-xl mt-4 text-justify dark:text-gray-300 mb-6">
              Every adoption helps save a life and opens a new chapter of happiness.
              Join our community and make a difference today!
            </p>

            {/* Read More Button */}
            <button className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 transition-colors rounded-md text-lg sm:text-xl text-white font-semibold shadow-lg">
              Read More
            </button>
          </div>
        </div>

        {/* Vision, Mission, Goals Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Vision Card */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center text-base sm:text-lg">
              To create a world where every pet has a loving home and no animal suffers from neglect or abandonment.
            </p>
          </div>

          {/* Mission Card */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center text-base sm:text-lg">
              To revolutionize pet adoption through technology, making the process easier, faster, and more accessible while ensuring animal welfare.
            </p>
          </div>

          {/* Goals Card */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center md:col-span-2 lg:col-span-1"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">Our Goals</h3>
            <ul className="text-gray-600 dark:text-gray-300 text-base sm:text-lg space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Increase pet adoption rates by 50% in 3 years</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Reduce shelter overcrowding nationwide</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Educate 1 million people on responsible pet ownership</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md" data-aos="zoom-in">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10K+</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Pets Adopted</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md" data-aos="zoom-in" data-aos-delay="100">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">200+</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Shelter Partners</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md" data-aos="zoom-in" data-aos-delay="200">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Cities Served</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md" data-aos="zoom-in" data-aos-delay="300">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Happy Families</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
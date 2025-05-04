import React, { useEffect } from 'react'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const MiniCard = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="my-8 sm:my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 p-6">
      {/* Card 1: Adopt a Pet */}
      <div className="flex flex-col justify-center" data-aos="fade-up" data-aos-delay="100">
        <div className="flex flex-col h-full shadow justify-between rounded-lg pb-8 p-6 xl:p-8 mt-3 bg-gray-50">
          <div>
            <h4 className="font-bold text-2xl leading-tight">Adopt a Pet</h4>
            <div className="my-4">
              <p>Browse our adorable pets waiting for a loving home. Find your perfect companion today.</p>
            </div>
          </div>
          <div>
            <a
              className="mt-1 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-gray-700 active:ring-0 active:ring-offset-0 leading-normal bg-link text-gray-700 hover:bg-opacity-80 text-base rounded-lg py-1.5"
              aria-label="Adopt a Pet"
              target="_self"
              href="/adopt"
            >
              View Pets
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                className="duration-100 ease-in transition -rotate-90 inline ml-1"
                style={{ minWidth: '20px', minHeight: '20px' }}>
                <g fill="none" fillRule="evenodd">
                  <path fill="currentColor" fillRule="nonzero" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Card 2: Login */}
      <div className="flex flex-col justify-center" data-aos="fade-up" data-aos-delay="200">
        <div className="flex flex-col h-full shadow justify-between rounded-lg pb-8 p-6 xl:p-8 mt-3 bg-gray-50">
          <div>
            <h4 className="font-bold text-2xl leading-tight">Member Login</h4>
            <div className="my-4">
              <p>Already a member? Log in to track your adoptions, manage your profile, and more.</p>
            </div>
          </div>
          <div>
            <a
              className="mt-1 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-gray-700 active:ring-0 active:ring-offset-0 leading-normal bg-link text-gray-700 hover:bg-opacity-80 text-base rounded-lg py-1.5"
              aria-label="Login"
              target="_self"
              href="/login"
            >
              Login
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                className="duration-100 ease-in transition -rotate-90 inline ml-1"
                style={{ minWidth: '20px', minHeight: '20px' }}>
                <g fill="none" fillRule="evenodd">
                  <path fill="currentColor" fillRule="nonzero" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniCard;

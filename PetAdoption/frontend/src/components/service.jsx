import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Service = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      title: 'Adopt a Pet',
      description:
        'Choose from a variety of adorable virtual pets. Customize their names, appearances, and more to create your perfect companion.',
      icon: 'https://cdn-icons-png.flaticon.com/512/9513/9513736.png',
    },
    {
      title: 'Interactive Pet Care',
      description:
        'Feed, groom, and play with your pet in real-time. Learn about pet wellness through our interactive dashboard.',
      icon: 'https://cdn-icons-png.flaticon.com/512/4261/4261289.png',
    },
    {
      title: 'Pet Community',
      description:
        'Join our community forum to share pet stories, ask questions, and participate in events with fellow pet lovers.',
      icon: 'https://cdn-icons-png.flaticon.com/512/2190/2190552.png',
    },
    {
      title: 'Doctor Support',
      description:
        'Get access to certified virtual veterinarians for pet consultations, advice, and emergency support anytime.',
      icon: 'https://cdn-icons-png.flaticon.com/512/11312/11312510.png',
    },
    {
      title: 'Verified Pets with Documents',
      description:
        'Each pet is verified with proper virtual documentation to ensure quality, safety, and authenticity.',
      icon: 'https://cdn-icons-png.flaticon.com/512/1687/1687116.png',
    },
    {
      title: 'Island-wide Delivery',
      description:
        'We deliver your adopted virtual pet instantly to your profile, accessible anywhere across the island.',
      icon: 'https://cdn-icons-png.flaticon.com/512/609/609361.png',
    },
    {
      title: 'Premium Pet Care Services',
      description:
        'Subscribe to our premium plans for grooming tips, scheduled care reminders, and expert pet parenting tools.',
      icon: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 overflow-x-hidden">
      <div className="container mx-auto pt-12 pb-20">
        <h1
          className="text-4xl font-bold text-gray-800 text-center mb-8"
          data-aos="fade-down"
        >
          Welcome to the Virtual Pet Adoption Center
        </h1>
        <p
          className="text-gray-700 text-lg text-center mb-12 max-w-2xl mx-auto"
          data-aos="fade-up"
        >
          Bringing happiness to homes—one paw at a time. Explore our services to help you find, adopt, and bond with your perfect virtual pet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col items-center text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={service.icon}
                alt={`${service.title} Icon`}
                className="w-16 h-16 mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {service.title}
              </h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;

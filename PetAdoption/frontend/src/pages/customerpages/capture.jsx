import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Capture = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [pawPrints, setPawPrints] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const addPawPrint = (e) => {
    if (pawPrints.length >= 8) return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const newPawPrint = {
      id: Date.now(),
      x: e.clientX - container.left,
      y: e.clientY - container.top,
      emoji: ['🐾', '🐕', '🐈', '🐶', '🐱', '🦴', '🧶', '🐇'][Math.floor(Math.random() * 8)],
      rotation: Math.floor(Math.random() * 60) - 30
    };
    
    setPawPrints([...pawPrints, newPawPrint]);
    setShowTooltip(false);
    
    setTimeout(() => {
      setPawPrints(prev => prev.filter(paw => paw.id !== newPawPrint.id));
    }, 3000);
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg" data-aos="fade-right">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              🐾 Capture Paw-some Moments 🐾
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Freeze time with your furry friends! Our virtual adoption center helps you 
              cherish every tail wag, purr, and hop forever. 📸✨
            </p>
          </div>
          
          <div className="mt-10">
            {/* Interactive paw print area */}
            <div 
              className="relative inline-block cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={addPawPrint}
            >
              <div className={`relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 ${
                isHovered 
                  ? 'bg-gradient-to-r from-teal-50 to-green-50 text-teal-600 shadow-lg ring-2 ring-teal-200' 
                  : 'bg-gray-50 text-gray-600 shadow-md'
              }`}>
                <span className="text-xl transition-transform duration-300">
                  {isHovered ? '📷' : '📸'}
                </span>
                <span className="font-medium transition-all duration-300">
                  {isHovered ? 'Click to leave paw prints!' : 'Your pet memories'}
                </span>
                <span className="text-xl transition-transform duration-300">
                  {isHovered ? '🐾' : '✨'}
                </span>

                {showTooltip && (
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-xs text-teal-600 border border-teal-100 animate-pulse">
                    Try clicking me!
                  </div>
                )}
              </div>
              
              {/* Animated paw prints */}
              {pawPrints.map((paw) => (
                <span 
                  key={paw.id}
                  className="absolute text-3xl pointer-events-none animate-[bounce_1s_ease-in-out]"
                  style={{
                    left: `${paw.x}px`,
                    top: `${paw.y}px`,
                    transform: `translate(-50%, -50%) rotate(${paw.rotation}deg)`,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                >
                  {paw.emoji}
                </span>
              ))}
            </div>

            {/* Decorative image grid */}
            <div 
              aria-hidden="true" 
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div 
                className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div 
                      className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 transition-all duration-500 hover:scale-105"
                      data-aos="fade-up"
                    >
                      <img 
                        src="https://placedog.net/200/300?random=1" 
                        alt="Happy dog with tongue out" 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div 
                      className="h-64 w-44 overflow-hidden rounded-lg transition-all duration-500 hover:scale-105"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <img 
                        src="https://imgs.search.brave.com/aad25JESdlFPN1VSoBHr7blgrFizDy8evHBQA6dH8sA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/dXRlLXRlcnJpZXIt/cHVwcHktc3VuZ2xh/c3Nlcy1wb3Npbmct/b3V0ZG9vcnMtZ2Vu/ZXJhdGl2ZS1haV8x/ODg1NDQtMTU0ODQu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MA" 
                        alt="Curious kitten playing" 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div 
                      className="h-64 w-44 overflow-hidden rounded-lg transition-all duration-500 hover:scale-105"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <img 
                        src="https://imgs.search.brave.com/WLdy7s21VCG1YeEinGTojtcsmP-vCh3Na76IgRwp3fI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTMv/MTc1LzMyNC9zbWFs/bC9tYW4tY2FyZXNz/aW5nLWh1c2t5LWRv/Zy1hbmQtc2l0dGlu/Zy1vbi1ncmFzcy1p/bi1wYXJrLWR1cmlu/Zy1zdHJvbGwtdmlk/ZW8uanBn" 
                        alt="Dog smiling at camera" 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div 
                      className="h-64 w-44 overflow-hidden rounded-lg transition-all duration-500 hover:scale-105"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <img 
                        src="https://imgs.search.brave.com/ySbe-ENjsSjPMFX5_UDy0TsOKM9Boa4Ei3gDR5SeY94/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvODI2/NTU3NTI2L3Bob3Rv/L2JpZy1tZW93Lmpw/Zz9iPTEmcz02MTJ4/NjEyJnc9MCZrPTIw/JmM9cXRHTmNpQWlJ/ZVhBU3FuTXl5UzZV/Y2NSLU03aWJIamlh/OWtiVXl4bkZIOD0" 
                        alt="Cat sleeping peacefully" 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div 
                      className="h-64 w-44 overflow-hidden rounded-lg transition-all duration-500 hover:scale-105"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <img 
                        src="https://imgs.search.brave.com/l-ak02tPWS9nXc3cQhzUvb0NOz3_LQbhKOafLO9rZdQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/NS8yMS8xMi80MC9k/b2ctODAwODQ4M182/NDAuanBn" 
                        alt="Bear cub playing" 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div 
                      className="h-64 w-44 overflow-hidden rounded-lg transition-all duration-500 hover:scale-105"
                      data-aos="fade-up"
                      data-aos-delay="500"
                    >
                      <img 
                        src="https://imgs.search.brave.com/WHWYMlAbj02Xhc-2s032hOj1MNoktpA7i6AsLCkLOyE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzBmLzc3/L2MwLzBmNzdjMDU0/M2E0ZDY0MThhNmU2/Y2RjYTg5NmE5NmEz/LmpwZw" 
                        alt="Dog running happily" 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div 
                      className="h-64 w-44 overflow-hidden rounded-lg transition-all duration-500 hover:scale-105"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      <img 
                        src="https://imgs.search.brave.com/ZmcOD_aRffq5cX8hi_ggStU9f-VrGJJRgXU4CFiUTBE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDkv/OTI1Lzk4My9zbWFs/bC9naXJsLWhvbGRp/bmctaGVyLXBldC1z/bWFsbC1kb2ctaW4t/aGVyLWFybXMtdmlk/ZW8uanBn" 
                        alt="Kitten looking curious" 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capture;
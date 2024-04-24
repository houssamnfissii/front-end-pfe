import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      setIsVisible(scrollTop > 500); // Show button when scrollTop is greater than 500
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
<button
  onClick={scrollToTop}
  className={`fixed z-50 bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full shadow-md bg-purple-700 hover:bg-purple-700 text-white text-lg font-semibold transition-colors duration-300 ${
    isVisible ? '' : 'hidden'
  }`}
  title="Go To Top"
>
  <div className="flex items-center justify-center"> {/* Flex container */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"> {/* Adjust size here */}
      <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
    </svg>
  </div>
  <span className="sr-only">Go to top</span>
</button>


  );
}

export default ScrollToTopButton;

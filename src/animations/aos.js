import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS file

const initializeAOS = () => {
  AOS.init({
    duration: 500, // Animation duration in milliseconds
    easing: 'ease-in-out', // Easing function for the animation
    // once: true, // Whether animation should only happen once

  });
};

export default initializeAOS;
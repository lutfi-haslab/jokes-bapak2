import { useState, useEffect } from 'react';
import jokesData from './jokes_data.json';

// Chewy font is already imported in index.css
// We will use Tailwind classes for styling

const BACKGROUND_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Cyan
  '#FFA07A', // Light Salmon
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#F1948A', // Light Red
  '#82E0AA', // Light Green
  '#F0B27A', // Orange
  '#E59866', // Burnt Orange
  '#5DADE2', // Blue
  '#AF7AC5', // Violet
  '#F4D03F', // Sunflower
  '#58D68D', // Emerald
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState(BACKGROUND_COLORS[0]);

  const currentJoke = jokesData[currentIndex];

  const changeColor = () => {
    const randomColor = BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)];
    setBgColor(randomColor);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % jokesData.length);
    changeColor();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? jokesData.length - 1 : prev - 1));
    changeColor();
  };

  const handleRandom = () => {
    let newIndex = Math.floor(Math.random() * jokesData.length);
    // Avoid same joke twice if possible
    while (newIndex === currentIndex && jokesData.length > 1) {
        newIndex = Math.floor(Math.random() * jokesData.length);
    }
    setCurrentIndex(newIndex);
    changeColor();
  };

  // Set initial random color on mount? No, maybe consistent start is fine, 
  // but "random background color juga setiap pertanyaan" implies change on joke change.
  // We can also set a random color initially.
  useEffect(() => {
     changeColor();
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center pt-20 px-4 transition-colors duration-500 ease-in-out font-['Chewy']"
      style={{ backgroundColor: bgColor }}
    >
      {/* Top Section: Joke ID */}
      <div className="text-white text-3xl mb-8 drop-shadow-md tracking-wide">
        Joke #{currentJoke.id}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-16">
        <button 
          onClick={handlePrev}
          className="bg-white border-2 border-black px-6 py-2 text-xl rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer text-black hover:bg-gray-50 bg-white"
        >
          « Prev
        </button>
        <button 
          onClick={handleRandom}
           className="bg-white border-2 border-black px-6 py-2 text-xl rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer text-black hover:bg-gray-50 bg-white"
        >
          Random
        </button>
        <button 
          onClick={handleNext}
           className="bg-white border-2 border-black px-6 py-2 text-xl rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer text-black hover:bg-gray-50 bg-white"
        >
          Next »
        </button>
      </div>

      {/* Joke Content */}
      <div className="max-w-4xl w-full text-center flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)] leading-tight">
          {currentJoke.setup}
        </h1>
        
        <p className="text-5xl md:text-7xl text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)] leading-tight">
          {currentJoke.punchline}
        </p>
      </div>

      {/* Footer with GitHub icon */}
      <a
        href="https://github.com/lutfi-haslab/jokes-bapak2"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-white hover:scale-105 transition-transform flex items-center gap-2"
        aria-label="View source on GitHub"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span className="text-xl font-bold drop-shadow-md">@lutfi-haslab</span>
      </a>
    </div>
  );
}

export default App;

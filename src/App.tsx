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
      
    </div>
  );
}

export default App;

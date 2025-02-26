'use client';
import { useState, useEffect } from 'react';

const languageOptions = [
  {
    name: 'Spanish',
    emoji: '🇪🇸',
    greeting: 'Hola',
  },
  {
    name: 'French',
    emoji: '🇫🇷',
    greeting: 'Bonjour',
  },
  {
    name: 'Arabic',
    emoji: '🇦🇪',
    greeting: 'مرحبا',
  },
];

export default function Home() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [translatedText, setTranslatedText] = useState('');
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fade, setFade] = useState('opacity-100');

  useEffect(() => {
    const interval = setInterval(() => {
      setFade('opacity-0');

      setTimeout(() => {
        setGreetingIndex((prevIndex) => (prevIndex + 1) % languageOptions.length);
        setFade('opacity-100');
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleTranslate = async () => {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    });
    const data = await res.json();
    console.log(data);
    setTranslatedText(data.translation);
  };

  // Current rotating greeting
  const rotatingGreeting = languageOptions[greetingIndex].greeting;

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col gap-5 items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white p-8 rounded shadow-lg w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">
            AI Translator
          </h1>
          <textarea
            className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to translate..."
            rows={4}
          />
          <div className="mb-4 flex flex-col gap-3">
            {languageOptions.map((option) => (
              <label
                key={option.name}
                className="flex items-center space-x-3 cursor-pointer text-black"
              >
                <input
                  type="radio"
                  name="language"
                  value={option.name}
                  checked={language === option.name}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="text-2xl">{option.emoji}</span>
                <span>{option.name}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleTranslate}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Translate
          </button>
        </div>
        <div className="border p-4 rounded bg-gray-50 w-full">
          <h2 className="text-xl font-semibold mb-2 text-black">Translation</h2>
          <p className="text-black">
            {translatedText || (
              <span className={`transition-opacity duration-500 ${fade}`}>
                {rotatingGreeting}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

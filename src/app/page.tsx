'use client';
import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  // Progress,
} from '@heroui/react';
import { GiRobotGolem } from 'react-icons/gi';
import { TbLanguage } from 'react-icons/tb';
import { Progress } from '@heroui/react';
import { Spinner } from '@heroui/react';
import { BsSoundwave } from 'react-icons/bs';

const languageOptions = [
  { name: 'English', code: 'en', flagUrl: 'https://flagcdn.com/w40/us.png' },
  { name: 'Spanish', code: 'es', flagUrl: 'https://flagcdn.com/w40/es.png' },
  { name: 'French', code: 'fr', flagUrl: 'https://flagcdn.com/w40/fr.png' },
  { name: 'German', code: 'de', flagUrl: 'https://flagcdn.com/w40/de.png' },
  { name: 'Arabic', code: 'ar', flagUrl: 'https://flagcdn.com/w40/sa.png' },
  { name: 'Chinese ', code: 'zh', flagUrl: 'https://flagcdn.com/w40/cn.png' },
  { name: 'Hindi', code: 'hi', flagUrl: 'https://flagcdn.com/w40/in.png' },
  { name: 'Portuguese', code: 'pt', flagUrl: 'https://flagcdn.com/w40/pt.png' },
  { name: 'Russian', code: 'ru', flagUrl: 'https://flagcdn.com/w40/ru.png' },
  { name: 'Japanese', code: 'ja', flagUrl: 'https://flagcdn.com/w40/jp.png' },
  { name: 'Korean', code: 'ko', flagUrl: 'https://flagcdn.com/w40/kr.png' },
  { name: 'Italian', code: 'it', flagUrl: 'https://flagcdn.com/w40/it.png' },
  { name: 'Turkish', code: 'tr', flagUrl: 'https://flagcdn.com/w40/tr.png' },
  { name: 'Dutch', code: 'nl', flagUrl: 'https://flagcdn.com/w40/nl.png' },
  { name: 'Bengali', code: 'bn', flagUrl: 'https://flagcdn.com/w40/bd.png' },
  { name: 'Urdu', code: 'ur', flagUrl: 'https://flagcdn.com/w40/pk.png' },
  { name: 'Vietnamese', code: 'vi', flagUrl: 'https://flagcdn.com/w40/vn.png' },
  { name: 'Persian', code: 'fa', flagUrl: 'https://flagcdn.com/w40/ir.png' },
  { name: 'Swahili', code: 'sw', flagUrl: 'https://flagcdn.com/w40/ke.png' },
  { name: 'Thai', code: 'th', flagUrl: 'https://flagcdn.com/w40/th.png' },
];

export default function Home() {
  const [text, setText] = useState('');

  const [toLanguage, setToLanguage] = useState(languageOptions[4]);

  const [fade, setFade] = useState('opacity-100');
  const [fromLanguage, setFromLanguage] = useState(languageOptions[0]);
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, toLanguage, fromLanguage }),
    });
    const data = await res.json();
    console.log(data);
    setTranslatedText(data.translation);
  };

  const handleSpeech = (text: string, langCode: string) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = langCode;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);

    console.log('click');
  };

  return (
    <div className=" flex flex-col max-w-7xl items-center justify-center mx-auto px-6   ">
      <div className="max-w-4xl  w-full space-y-6 ">
        <div
          className="flex flex-col  items-center p-5  rounded border border-gray-400 
        bg-gradient-to-tl from-gray-950 via-blue-950 to-black animate-gradient-x bg-[length:800%_100%]
        w-full"
        >
          <div className="flex justify-center items-center  text-white gap-2">
            <h1
              className="text-3xl  font-bold text-center mb-3
            bg-gradient-to-r from-blue-100 via-blue-400 to-blue-200 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]
            "
            >
              GPTranslate
            </h1>
            <TbLanguage size={50} />
          </div>
          <textarea
            className="w-full font-semibold p-3 border border-gray-400 rounded mb-4 focus:outline-none focus:ring-1  focus:border-blue-400
                  bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950 
            text-gray-200 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to translate..."
            rows={4}
          />
          <div className="self-start ">
            <button
              onClick={() => handleSpeech(text, fromLanguage.code)}
              className="flex items-center border border-gray-400  rounded py-1 px-3 shadow-sm shadow-gray-600 text-xl  font-semibold transition-all duration-300 ease-in-out bg-gray-950 bg-gradient-to-bl  from-transparent via-blue-900 to-transparent hover:bg-blue-950 hover:from-transparent hover:via-blue-700 "
            >
              <BsSoundwave size={30} color="white" />
            </button>
          </div>
          <div className=" flex justify-around w-full ">
            <div className="mb-4 flex justify-center items-center gap-3 ">
              <label className=" text-xl font-bold">From</label>
              <Dropdown>
                <DropdownTrigger className="flex ">
                  <Button
                    variant="bordered"
                    className=" text-lg p-2 rounded-md  border border-gray-400 
                    transition-all duration-300 ease-in-out font-semibold w-40 
                    bg-gray-950 bg-gradient-to-r  from-transparent via-blue-900 to-transparent
                    hover:bg-blue-950 hover:from-transparent hover:via-blue-700
                    "
                  >
                    <img
                      src={fromLanguage.flagUrl}
                      alt={fromLanguage.name}
                      className="w-10 h-6 rounded shadow-sm shadow-blue-800"
                    />
                    {fromLanguage.name}
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  selectedKeys={fromLanguage.name}
                  selectionMode="single"
                  onAction={(key) => {
                    const lang = languageOptions.find((l) => l.code === key);
                    if (lang) setFromLanguage(lang);
                    setText('');
                  }}
                  className="bg-gray-900 border border-blue-500  w-full max-h-80 overflow-y-auto rounded-md shadow-lg shadow-blue-950 custom-scrollbar"
                >
                  {languageOptions.map((lang) => (
                    <DropdownItem
                      key={lang.code}
                      className=" flex justify-start mb-2  hover:bg-blue-700 rounded-md transition-all duration-100 ease-in-out"
                    >
                      <div className="flex gap-2 items-center min-w-full  p-2">
                        <img
                          src={lang.flagUrl}
                          alt={lang.name}
                          className="w-8 rounded-md h-5"
                        />
                        <span className="font-semibold">{lang.name}</span>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="mb-4 flex justify-center items-center gap-3 ">
              <label className=" text-xl font-bold">To </label>
              <Dropdown>
                <DropdownTrigger className="flex ">
                  <Button
                    variant="bordered"
                    className=" text-lg p-2 rounded-md  border border-gray-400 
                    transition-all duration-300 ease-in-out font-semibold w-40 
                    bg-gray-950 bg-gradient-to-r  from-transparent via-blue-900 to-transparent
                    hover:bg-blue-950 hover:from-transparent hover:via-blue-700 "
                  >
                    <img
                      src={toLanguage.flagUrl}
                      alt={toLanguage.name}
                      className="w-10 h-6  rounded shadow-sm shadow-blue-800"
                    />
                    {toLanguage.name}
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  selectedKeys={toLanguage.name}
                  selectionMode="single"
                  onAction={(key) => {
                    const lang = languageOptions.find((l) => l.code === key);
                    if (fromLanguage.name !== lang?.name && lang) {
                      setToLanguage(lang);
                    }
                  }}
                  className="bg-gray-900 border border-blue-500  w-full max-h-80 overflow-y-auto rounded-md shadow-lg shadow-blue-950 custom-scrollbar"
                >
                  {languageOptions.map((lang) => (
                    <DropdownItem
                      key={lang.code}
                      className="flex justify-start mb-2  hover:bg-blue-800 rounded-md transition-all duration-100 ease-in-out"
                    >
                      <div className="flex gap-2  items-center min-w-full  p-2">
                        <img
                          src={lang.flagUrl}
                          alt={lang.name}
                          className="w-8 rounded-md h-5 "
                        />
                        <span className="font-semibold">{lang.name}</span>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <button
            onClick={handleTranslate}
            className="w-4/6 flex items-center justify-center text-lg text-white font-semibold py-2 px-4 rounded
            border border-gray-400 transition-all duration-300 ease-in-out bg-gray-950 bg-gradient-to-r  from-transparent via-blue-900 to-transparent hover:bg-blue-950 hover:from-transparent hover:via-blue-700 
            "
          >
            <TbLanguage size={30} />
            Translate
          </button>
        </div>
        <div
          className="border p-4 rounded border-gray-400  w-full
        bg-gradient-to-bl from-gray-950 via-blue-950 to-black animate-gradient-x bg-[length:150%_100%]
        "
        >
          <div className="flex mb-5 justify-center items-center text-white gap-2">
            <h1 className="text-3xl font-bold  mb-2 ">GPTranslate</h1>
            <GiRobotGolem size={45} />
          </div>
          <div
            className="w-full font-semibold bg-gray-900  p-4 border border-gray-400 rounded mb-4 text-gray-200 
          focus:outline-none focus:ring-1  focus:border-blue-400
                  bg-gradient-to-r from-gray-950 via-blue-950 to-gray-950
          "
          >
            <p className="text-black">
              {translatedText || (
                <span className={`transition-opacity duration-500 ${fade}`}></span>
              )}
            </p>
          </div>
          <div
            className="flex flex-wrap items-end gap-8 text-blue-500
          
          "
          ></div>
          <div className="text-blue-500">
            <button
              onClick={() => handleSpeech(text, fromLanguage.code)}
              className="flex items-center border border-gray-400  rounded py-1 px-3 shadow-sm shadow-gray-600 text-xl  font-semibold transition-all duration-300 ease-in-out bg-gray-950 bg-gradient-to-r  from-transparent via-blue-900 to-transparent hover:bg-blue-950 hover:from-transparent hover:via-blue-700 "
            >
              <BsSoundwave size={30} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

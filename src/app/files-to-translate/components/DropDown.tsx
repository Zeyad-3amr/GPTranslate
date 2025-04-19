import React from 'react';
import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';
const languageOptions = [
  { name: 'Arabic', code: 'ar', flagUrl: 'https://flagcdn.com/w40/sa.png' },
  { name: 'Bengali', code: 'bn', flagUrl: 'https://flagcdn.com/w40/bd.png' },
  { name: 'Chinese ', code: 'zh', flagUrl: 'https://flagcdn.com/w40/cn.png' },
  { name: 'Dutch', code: 'nl', flagUrl: 'https://flagcdn.com/w40/nl.png' },
  { name: 'English', code: 'en', flagUrl: 'https://flagcdn.com/w40/us.png' },
  { name: 'French', code: 'fr', flagUrl: 'https://flagcdn.com/w40/fr.png' },
  { name: 'German', code: 'de', flagUrl: 'https://flagcdn.com/w40/de.png' },
  { name: 'Hindi', code: 'hi', flagUrl: 'https://flagcdn.com/w40/in.png' },
  { name: 'Italian', code: 'it', flagUrl: 'https://flagcdn.com/w40/it.png' },
  { name: 'Japanese', code: 'ja', flagUrl: 'https://flagcdn.com/w40/jp.png' },
  { name: 'Korean', code: 'ko', flagUrl: 'https://flagcdn.com/w40/kr.png' },
  { name: 'Persian', code: 'fa', flagUrl: 'https://flagcdn.com/w40/ir.png' },
  { name: 'Portuguese', code: 'pt', flagUrl: 'https://flagcdn.com/w40/pt.png' },
  { name: 'Russian', code: 'ru', flagUrl: 'https://flagcdn.com/w40/ru.png' },
  { name: 'Spanish', code: 'es', flagUrl: 'https://flagcdn.com/w40/es.png' },
  { name: 'Swahili', code: 'sw', flagUrl: 'https://flagcdn.com/w40/ke.png' },
  { name: 'Thai', code: 'th', flagUrl: 'https://flagcdn.com/w40/th.png' },
  { name: 'Turkish', code: 'tr', flagUrl: 'https://flagcdn.com/w40/tr.png' },
  { name: 'Urdu', code: 'ur', flagUrl: 'https://flagcdn.com/w40/pk.png' },
  { name: 'Vietnamese', code: 'vi', flagUrl: 'https://flagcdn.com/w40/vn.png' },
];
export default function DropDown() {
  const [targetLanguage, setTargetLanguage] = useState(languageOptions[0]);

  return (
    <div className=" gap-3 ">
      <Dropdown>
        <DropdownTrigger className="flex ">
          <Button
            variant="bordered"
            className=" text-lg text-gray-800 p-2 rounded-md w-full border border-gray-400 font-semibold
                    transition-all duration-300 ease-in-out bg-gray-500 bg-gradient-to-r from-transparent via-gray-200 to-transparent hover:bg-gray-950 hover:from-transparent hover:via-gray-300 hover:shadow-sm hover:shadow-white
                      "
          >
            <img
              src={targetLanguage.flagUrl}
              alt={targetLanguage.name}
              className="w-10 h-6 rounded shadow-sm shadow-blue-800"
            />
            {targetLanguage.name}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          selectedKeys={targetLanguage.name}
          selectionMode="single"
          onAction={(key) => {
            const lang = languageOptions.find((l) => l.code === key);

            if (targetLanguage.name !== lang?.name && lang) {
              setTargetLanguage(lang);
              // setText('');
            }
          }}
          className="bg-gray-800 border border-gray-500  w-full max-h-80 overflow-y-auto rounded-md shadow-lg shadow-gray-800 custom-scrollbar
                  bg-gradient-to-r  from-transparent via-gray-500 to-transparent
                  "
        >
          {languageOptions.map((lang) => (
            <DropdownItem
              key={lang.code}
              className=" flex  mb-2  hover:bg-gray-900 
                    rounded-md transition-all duration-100 ease-in-out "
            >
              <div className="flex gap-2 items-center min-w-full  p-2">
                <img src={lang.flagUrl} alt={lang.name} className="w-8 rounded-md h-5" />
                <span className="font-semibold">{lang.name}</span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

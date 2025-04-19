import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';

interface Language {
  name: string;
  code: string;
  flagUrl: string;
}
interface languageOptions {
  name: string;
  code: string;
  flagUrl: string;
}

export default function DropDown({
  targetLanguage,
  setTargetLanguage,
  languageOptions,
}: {
  targetLanguage: Language;
  setTargetLanguage: (language: Language) => void;
  languageOptions: languageOptions[];
}) {
  return (
    <div className="gap-3">
      <Dropdown>
        <DropdownTrigger className="flex">
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

'use client';
import Link from 'next/link';
import { useState } from 'react';
import { GiRobotGolem } from 'react-icons/gi';
import { TbLanguage } from 'react-icons/tb';

export default function NavList() {
  const [activeTab, setActiveTab] = useState<'TextTranslate' | 'FileTranslate'>(
    'TextTranslate'
  );

  return (
    <div
      className="w-64  p-4 border-r bg-black border-gray-400 flex flex-col
    bg-gradient-to-b from-gray-950 via-gray-700 to-gray-950 
    
    "
    >
      <div className="flex items-center text-white justify-center gap-2 ">
        <h1 className="text-3xl mt-8 font-bold text-center mb-10 bg-gradient-to-r from-gray-100 via-gray-600 to-gray-200 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
          GPTranslate
        </h1>
        <TbLanguage
          size={50}
          color="bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200"
          className=""
        />
      </div>
      <div className="flex flex-col gap-20 items-center justify-center  mb-8 ">
        <div className="flex flex-col gap-3 mb-5">
          <Link
            href="/"
            onClick={() => setActiveTab('TextTranslate')}
            className={`p-2 text-2xl font-bold transition-all duration-500 ease-in-out ${
              activeTab === 'TextTranslate'
                ? '    rounded bg-gradient-to-r from-gray-50 via-gray-400 to-gray-50 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]'
                : 'text-gray-600  rounded'
            }`}
          >
            Text Translate
          </Link>
          <Link
            href="/files-to-translate"
            onClick={() => setActiveTab('FileTranslate')}
            className={`p-2 text-2xl font-bold transition-all duration-500 ease-in-out ${
              activeTab === 'FileTranslate'
                ? '    rounded bg-gradient-to-r from-gray-50 via-gray-300 to-gray-50 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]'
                : 'text-gray-600  rounded'
            }`}
          >
            Files Translate
          </Link>
        </div>
      </div>
    </div>
  );
}

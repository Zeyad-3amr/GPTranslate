'use client';
import Link from 'next/link';
import { useState } from 'react';
import { GiRobotGolem } from 'react-icons/gi';
import { TbLanguage } from 'react-icons/tb';

export default function Header() {
  const [activeTab, setActiveTab] = useState<'TextTranslate' | 'FileTranslate'>(
    'TextTranslate'
  );

  return (
    <div>
      <div className="flex items-center text-white justify-center gap-2">
        <GiRobotGolem size={55} />
        <h1 className="text-3xl mt-8 font-bold text-center mb-10 ">GPTranslate</h1>
        <TbLanguage size={50} />
      </div>
      <div className="flex gap-20 items-center justify-center border-b mb-8 border-blue-400">
        <div className="flex gap-3 mb-5">
          <Link
            href="/"
            onClick={() => setActiveTab('TextTranslate')}
            className={`p-2 transition-all duration-500 ease-in-out ${
              activeTab === 'TextTranslate'
                ? 'border-b text-xl font-bold border-b-blue-400 text-white'
                : 'text-gray-500 text-xl font-bold border-none'
            }`}
          >
            Text Translate
          </Link>
          <Link
            href="/files-to-translate"
            onClick={() => setActiveTab('FileTranslate')}
            className={`p-2 transition-all duration-500 ease-in-out ${
              activeTab === 'FileTranslate'
                ? 'border-b text-xl font-bold border-b-blue-400 text-white'
                : 'text-gray-500 text-xl font-bold border-none'
            }`}
          >
            Files Translate
          </Link>
        </div>
      </div>
    </div>
  );
}

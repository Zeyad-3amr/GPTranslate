'use client';
import React, { useRef, useState } from 'react';
import { BiUpload, BiFile } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import DropDown from './components/DropDown';
import { TbLanguage } from 'react-icons/tb';

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

export default function FilesToTranslate() {
  const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const [file, setFile] = useState<{ id: string; name: string; base64: string } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [targetLanguage, setTargetLanguage] = useState(languageOptions[0]);

  const handleFileChange = async (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first one

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert('Only PDF, TXT, DOCX, DOC, CSV, and XLSX files are allowed.');
        return;
      }

      try {
        const base64File = await convertToBase64(file);
        setFile(base64File);
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const convertToBase64 = (
    file: File
  ): Promise<{ id: string; name: string; base64: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: file.name,
          base64: reader.result as string,
        });
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDivClick = () => {
    fileInputRef.current?.click(); // Manually trigger file selection
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(event.target.files); // Pass the FileList directly
  };

  const handleDeleteFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer && event.dataTransfer.files) {
      handleFileChange(event.dataTransfer.files); // Pass the FileList directly
    } else {
      console.error('No files found in the drag event.');
    }
  };

  const handleTranslate = async () => {};

  return (
    <div className=" flex flex-col gap-5 justify-center items-center">
      <label className="mb-1 block font-bold">Upload Files To Translate</label>

      <div className="w-full border border-1  rounded-lg border-gray-500 p-4">
        {!file ? (
          <div className="flex  w-full items-center mb-4 justify-center p-2 transition-all duration-500 ">
            <div
              onClick={handleDivClick} // Make the whole div clickable
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group flex w-4/6 cursor-pointer flex-col justify-center self-center rounded-lg border-2 border-dashed border-gray-300 relative overflow-hidden
              ${isDragging ? '  bg-gray-700    ' : 'border-primary '}
              p-6 transition-all duration-200 `}
            >
              <BiUpload className="self-center text-gray-300" size={50} />

              <p className="mt-2 self-center text-lg">Click or drag to upload</p>
              <p className="mt-2 self-center text-sm">
                only pdf, txt, docx, doc, csx, and xlsx files.
              </p>

              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept=".pdf,.txt,.docx,.doc,.csv,.xlsx"
                multiple
                onChange={handleInputChange}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col mb-4">
            <div className="mt-4 flex items-center justify-center  text-sm">
              <div className="flex flex-col gap-2 justify-center items-center">
                <BiFile className="text-gray-300" size={80} />
                <span>{file?.name}</span>
              </div>
              <button
                onClick={handleDeleteFile}
                className="ml-2 text-red-500 hover:text-red-800"
              >
                <MdDeleteForever size={25} />
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-evenly gap-3 items-center">
          <div className="flex gap-3">
            <p className=" self-center font-bold">Translate To</p>

            <DropDown />
          </div>
          <button
            onClick={handleTranslate}
            className="w-3/12 flex items-center justify-center text-lg text-gray-900 font-semibold py-2 px-4 rounded
            border border-gray-400 transition-all duration-300 ease-in-out bg-gray-500 bg-gradient-to-r  from-transparent via-gray-200 to-transparent
                    hover:bg-gray-950 hover:from-transparent hover:via-gray-300  hover:shadow-sm hover:shadow-white
            "
          >
            <TbLanguage size={30} />
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}

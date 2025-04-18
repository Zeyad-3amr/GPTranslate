'use client';
import React, { useRef, useState } from 'react';
import { BiUpload, BiFile } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

export default function FilesToTranslate() {
  const ALLOWED_FILE_TYPES = [
    'application/pdf', // PDF
    'text/plain', // TXT
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'application/msword', // DOC
    'text/csv', // CSV
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
  ];

  const [file, setFile] = useState<{ id: string; name: string; base64: string } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  console.log(file);

  return (
    <div className=" flex flex-col justify-center items-center">
      <label className="mb-1 block font-bold">Upload Files To Translate</label>
      {!file ? (
        <div className="flex  w-full items-center  justify-center p-2 transition-all duration-500 ">
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
      )}
    </div>
  );
}

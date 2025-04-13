'use client';
import React, { useState } from 'react';
import { BiUpload, BiFile } from 'react-icons/bi';
export default function FilesToTranslate() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className=" flex flex-col justify-center items-center">
      <label className="mb-1 block font-bold">Upload Files To GPTalk To Translate</label>

      <div className="flex w-full items-center justify-center p-2 transition-all duration-500 ">
        <div
          // onClick={handleDivClick} // Make the whole div clickable
          // onDragOver={handleDragOver}
          // onDragLeave={handleDragLeave}
          // onDrop={handleDrop}
          className={`flex w-4/6 cursor-pointer flex-col justify-center self-center rounded-lg border-2 border-dashed border-blue-400 
             ${isDragging ? 'border-secondary bg-primary/10' : 'border-primary'} 
          p-6 transition-all duration-200`}
        >
          <BiUpload className="self-center text-blue-400" size={50} />

          <p className="mt-2 self-center text-lg">Click or drag to upload</p>
          <p className="mt-2 self-center text-sm">
            only pdf, txt, docx, doc, csx, and xlsx files.
          </p>

          <input
            // ref={fileInputRef}
            className="hidden"
            type="file"
            accept=".pdf,.txt,.docx,.doc,.csv,.xlsx"
            multiple
            // onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a language translator. Your only task is to translate the following text from ${sourceLanguage.name} to ${targetLanguage.name}. Do not provide any extra explanations, comments, or help with the content. Translate exactly as the text appears, without any interpretation or additional advice.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });
    const translation = response.choices[0].message.content || 'Error translating';

    return NextResponse.json(translation);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}

// app/api/translate/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { OpenAI } from 'openai';
// import { Readable } from 'stream';
// import fs from 'fs';
// import path from 'path';
// import pdf from 'pdf-parse';
// import mammoth from 'mammoth';
// import { IncomingForm } from 'formidable';
// import archiver from 'archiver';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// function parseForm(req: any) {
//   const form = new IncomingForm({ multiples: true, keepExtensions: true });
//   return new Promise<{ files: any[] }>((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       const uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];
//       resolve({ files: uploadedFiles });
//     });
//   });
// }

// async function extractText(file: any): Promise<string> {
//   const ext = path.extname(file.originalFilename).toLowerCase();

//   if (ext === '.pdf') {
//     const buffer = fs.readFileSync(file.filepath);
//     const data = await pdf(buffer);
//     return data.text;
//   }

//   if (ext === '.docx') {
//     const result = await mammoth.extractRawText({ path: file.filepath });
//     return result.value;
//   }

//   return fs.readFileSync(file.filepath, 'utf8');
// }

// async function translateText(text: string): Promise<string> {
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content:
//           'Translate the following text from English to Arabic. Do not add any comments or extra text.',
//       },
//       {
//         role: 'user',
//         content: text,
//       },
//     ],
//   });

//   return response.choices[0].message.content ?? '';
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { files } = await parseForm(req);

//     const zipStream = archiver('zip', { zlib: { level: 9 } });
//     const stream = new Readable().wrap(zipStream);

//     const resHeaders = new Headers();
//     resHeaders.set('Content-Type', 'application/zip');
//     resHeaders.set('Content-Disposition', 'attachment; filename=translated.zip');

//     async () => {
//       for (const file of files) {
//         const rawText = await extractText(file);
//         const translatedText = await translateText(rawText);
//         const outputName = `translated-${file.originalFilename}.txt`;

//         zipStream.append(translatedText, { name: outputName });
//       }
//       zipStream.finalize();
//     };

//     const zipBuffer = await new Promise<Buffer>((resolve, reject) => {
//       const chunks: Buffer[] = [];
//       stream.on('data', (chunk) => chunks.push(chunk));
//       stream.on('end', () => resolve(Buffer.concat(chunks)));
//       stream.on('error', reject);
//     });

//     return new Response(zipBuffer, { headers: resHeaders });
//   } catch (err) {
//     console.error(err);
//     return new Response('Translation failed', { status: 500 });
//   }
// }

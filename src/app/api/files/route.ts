import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { Configuration, OpenAIApi } from 'openai';
import { Document, Packer, Paragraph } from 'docx';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

function base64ToBuffer(base64: string) {
  const base64Data = base64.split(';base64,').pop();
  if (!base64Data) throw new Error('Invalid base64');
  return Buffer.from(base64Data, 'base64');
}

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileBase64, targetLanguage } = await req.json();
    const buffer = base64ToBuffer(fileBase64);

    const extension = fileName.split('.').pop()?.toLowerCase();

    let extractedText = '';

    if (extension === 'pdf') {
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else if (extension === 'docx') {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value;
    } else {
      return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 });
    }

    // Translate using OpenAI
    const translated = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Translate this to ${targetLanguage}: \n\n${extractedText}`,
        },
      ],
    });

    const translatedText = translated.data.choices[0].message?.content || '';

    let outputBuffer: Buffer;

    if (extension === 'pdf') {
      // Generate a new PDF file from translated text
      // You can use pdf-lib or any package to generate PDF
      return NextResponse.json({
        error: 'PDF writing not implemented yet',
      });
    } else if (extension === 'docx') {
      const doc = new Document({
        sections: [
          {
            children: [new Paragraph(translatedText)],
          },
        ],
      });

      outputBuffer = await Packer.toBuffer(doc);
    }

    const outputBase64 = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${outputBuffer.toString(
      'base64'
    )}`;

    return NextResponse.json({
      translatedFile: outputBase64,
      fileName: `translated-${fileName}`,
    });
  } catch (error) {
    console.error('Translation Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

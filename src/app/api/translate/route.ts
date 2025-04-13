import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
// import { HfInference } from '@huggingface/inference';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, fromLanguage, toLanguage } = await request.json();
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a language translator. Your only task is to translate the following text from ${fromLanguage.name} to ${toLanguage.name}. Do not provide any extra explanations, comments, or help with the content. Translate exactly as the text appears, without any interpretation or additional advice.`,
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

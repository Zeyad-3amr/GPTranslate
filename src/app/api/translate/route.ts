import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('hi');
export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful Translator assistant who transaltes from English To ${language}.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const translation = response.choices[0].message?.content || 'Error translating';

    return NextResponse.json({ translation });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}

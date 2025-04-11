import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { HfInference } from '@huggingface/inference';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  console.log('hiiii');
  try {
    console.log('hiiii');
    const { text, fromLanguage, toLanguage } = await request.json();

    console.log(fromLanguage, toLanguage);
    const hf = new HfInference(process.env.HF_TOKEN);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful Translator who transaltes from ${fromLanguage.name} To ${toLanguage.name}.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const translation = response.choices[0].message.content || 'Error translating';
    // const audioResponse = await hf.textToSpeech({
    //   inputs: translation,
    //   model: 'speechbrain/tts-tacotron2-ljspeech',
    // });
    // console.log('hiiii');
    // console.log(audioResponse);

    return NextResponse.json({ translation });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}

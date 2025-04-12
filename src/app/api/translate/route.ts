import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
// import { HfInference } from '@huggingface/inference';
import { ElevenLabsClient } from 'elevenlabs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { text, fromLanguage, toLanguage } = await request.json();

    console.log(fromLanguage, toLanguage);
    // const hf = new HfInference(process.env.HF_TOKEN);

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

    const audio = await client.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
      text: translation,
      model_id: 'eleven_multilingual_v2',
      output_format: 'mp3_44100_128',
    });
    const audioBuffer = await audio.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');

    console.log('hi');
    // const audioBlob = await hf.textToSpeech({
    //   inputs: translation,
    //   model: 'facebook/mms-tts-yor',
    // });

    // console.log(audioBlob);
    // const audioBlob = 1;

    return NextResponse.json({ translation, base64Audio });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}

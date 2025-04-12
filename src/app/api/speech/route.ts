import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN);

export async function POST(request: NextRequest) {
  try {
    const { text, language } = await request.json();

    const audioResponse = await hf.textToSpeech({
      inputs: text,
      model: 'speechbrain/tts-tacotron2-ljspeech', // Adjust model if needed
    });

    return NextResponse.json({ audioUrl: audioResponse.audioUrl });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json({ error: 'Speech generation failed' }, { status: 500 });
  }
}

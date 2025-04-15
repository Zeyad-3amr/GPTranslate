import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('hi from back');
    const { text } = await request.json();

    const response = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVEN_API_KEY!,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          output_format: 'mp3_44100_128',
        }),
      }
    );

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json({ error: 'Speech generation failed' }, { status: 500 });
  }
}

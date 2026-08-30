import { NextRequest, NextResponse } from 'next/server';
import { recognizeFoodImage } from '@/lib/ai/visionService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType, filenameHint } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const result = await recognizeFoodImage(
      imageBase64,
      mimeType || 'image/jpeg',
      filenameHint
    );

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'AI recognition failed' }, { status: 500 });
  }
}

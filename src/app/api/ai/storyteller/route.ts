import { NextRequest, NextResponse } from 'next/server';
import { askHeritageStoryteller } from '@/lib/ai/ragService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== 'string' || question.trim() === '') {
      return NextResponse.json({ error: 'A question is required' }, { status: 400 });
    }

    const response = await askHeritageStoryteller(question);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Storyteller failed' }, { status: 500 });
  }
}

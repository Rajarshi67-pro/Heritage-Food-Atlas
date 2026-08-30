import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const documents = await prisma.aIKnowledgeDocument.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ documents });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch knowledge documents' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { title, topic, content, source, state, tags } = body;

    if (!title || !content || !source) {
      return NextResponse.json({ error: 'Title, content and source are required' }, { status: 400 });
    }

    const document = await prisma.aIKnowledgeDocument.create({
      data: {
        title,
        topic: topic || 'General Heritage',
        content,
        source,
        state: state || 'National',
        tags: tags ? (typeof tags === 'string' ? tags : JSON.stringify(tags)) : null,
      },
    });

    return NextResponse.json({ message: 'Knowledge document added to RAG corpus', document }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to add document' }, { status: 500 });
  }
}

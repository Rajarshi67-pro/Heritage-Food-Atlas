import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dishSlug = searchParams.get('dish');
    const generation = searchParams.get('generation');

    const where: any = { status: 'APPROVED' };

    if (dishSlug) {
      where.dish = { slug: dishSlug };
    }

    if (generation && generation !== 'ALL') {
      where.generation = generation;
    }

    const stories = await prisma.story.findMany({
      where,
      include: {
        dish: {
          include: { state: true },
        },
        user: {
          select: { name: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ stories });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = await req.json();
    const {
      title,
      storytellerName,
      generation,
      community,
      location,
      content,
      transcript,
      audioUrl,
      audioDuration,
      mediaUrl,
      dishId,
    } = body;

    if (!title || !storytellerName || !content || !location) {
      return NextResponse.json({ error: 'Title, storyteller, content and location are required' }, { status: 400 });
    }

    // Admins get auto-approved, others are pending
    const status = user?.role === 'ADMIN' ? 'APPROVED' : 'PENDING';

    const story = await prisma.story.create({
      data: {
        title,
        storytellerName,
        generation: generation || 'Grandmother',
        community,
        location,
        content,
        transcript: transcript || content,
        audioUrl: audioUrl || null,
        audioDuration: audioDuration ? parseInt(audioDuration) : null,
        mediaUrl: mediaUrl || null,
        dishId: dishId || null,
        userId: user?.id || null,
        status,
      },
    });

    return NextResponse.json({
      message: status === 'APPROVED' ? 'Story published' : 'Story submitted for curatorial moderation',
      story,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit story' }, { status: 500 });
  }
}

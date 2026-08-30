import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const contributions = await prisma.contribution.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ contributions });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required to contribute' }, { status: 401 });
    }

    const body = await req.json();
    const { type, title, dataPayload } = body;

    if (!type || !title || !dataPayload) {
      return NextResponse.json({ error: 'Contribution type, title, and data payload are required' }, { status: 400 });
    }

    const contribution = await prisma.contribution.create({
      data: {
        userId: user.id,
        type: type.toUpperCase(), // "DISH", "RECIPE", "STORY", "INGREDIENT", "CORRECTION"
        title,
        dataPayload: typeof dataPayload === 'string' ? dataPayload : JSON.stringify(dataPayload),
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      message: 'Thank you! Your contribution has been submitted for curatorial review.',
      contribution,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit contribution' }, { status: 500 });
  }
}

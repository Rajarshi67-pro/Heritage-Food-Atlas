import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const stories = await prisma.story.findMany({
      include: {
        dish: { select: { name: true, slug: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ stories });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

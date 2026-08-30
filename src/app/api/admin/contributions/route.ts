import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const contributions = await prisma.contribution.findMany({
      include: {
        user: { select: { name: true, email: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ contributions });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
  }
}

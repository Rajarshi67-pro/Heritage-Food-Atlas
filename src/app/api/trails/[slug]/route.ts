import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const trail = await prisma.foodTrail.findUnique({
      where: { slug },
      include: {
        stops: {
          orderBy: { orderIndex: 'asc' },
          include: {
            specialtyDish: {
              include: { state: true },
            },
          },
        },
        user: {
          select: { name: true, avatarUrl: true },
        },
      },
    });

    if (!trail) {
      return NextResponse.json({ error: 'Food trail not found' }, { status: 404 });
    }

    return NextResponse.json({ trail });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve food trail' }, { status: 500 });
  }
}

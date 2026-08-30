import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const festival = await prisma.festival.findUnique({
      where: { slug },
      include: {
        festivalDishes: {
          include: {
            dish: {
              include: { state: true },
            },
          },
        },
      },
    });

    if (!festival) {
      return NextResponse.json({ error: 'Festival not found' }, { status: 404 });
    }

    return NextResponse.json({ festival });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve festival' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { significance: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const festivals = await prisma.festival.findMany({
      where,
      include: {
        festivalDishes: {
          include: {
            dish: {
              include: { state: true },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ festivals });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch festivals' }, { status: 500 });
  }
}

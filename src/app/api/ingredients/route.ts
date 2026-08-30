import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { botanicalName: { contains: search } },
        { originRegion: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (category && category !== 'ALL') {
      where.category = category;
    }

    const ingredients = await prisma.ingredient.findMany({
      where,
      include: {
        _count: {
          select: { dishIngredients: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ ingredients });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch ingredients' }, { status: 500 });
  }
}

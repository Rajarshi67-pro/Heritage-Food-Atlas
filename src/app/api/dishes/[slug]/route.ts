import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const dish = await prisma.dish.findUnique({
      where: { slug },
      include: {
        state: true,
        dishIngredients: {
          include: { ingredient: true },
        },
        festivalDishes: {
          include: { festival: true },
        },
        stories: {
          where: { status: 'APPROVED' },
          include: { user: { select: { name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' },
        },
        reviews: {
          include: { user: { select: { name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!dish) {
      return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
    }

    // Increment views asynchronously
    await prisma.dish.update({
      where: { id: dish.id },
      data: { viewsCount: { increment: 1 } },
    });

    // Find related dishes in same state or cuisine
    const relatedDishes = await prisma.dish.findMany({
      where: {
        id: { not: dish.id },
        OR: [
          { stateId: dish.stateId },
          { cuisineType: dish.cuisineType },
          { foodCategory: dish.foodCategory },
        ],
      },
      take: 4,
      include: { state: true },
    });

    return NextResponse.json({ dish, relatedDishes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to retrieve dish' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
    }

    const [
      totalDishes,
      totalStates,
      totalIngredients,
      totalFestivals,
      totalStories,
      pendingStories,
      totalContributions,
      pendingContributions,
      totalUsers,
      popularDishes,
    ] = await Promise.all([
      prisma.dish.count(),
      prisma.state.count({ where: { dishes: { some: {} } } }),
      prisma.ingredient.count(),
      prisma.festival.count(),
      prisma.story.count(),
      prisma.story.count({ where: { status: 'PENDING' } }),
      prisma.contribution.count(),
      prisma.contribution.count({ where: { status: 'PENDING' } }),
      prisma.user.count(),
      prisma.dish.findMany({
        take: 5,
        orderBy: { viewsCount: 'desc' },
        select: { id: true, name: true, slug: true, viewsCount: true, cuisineType: true, imageUrl: true },
      }),
    ]);

    return NextResponse.json({
      metrics: {
        totalDishes,
        totalStates,
        totalIngredients,
        totalFestivals,
        totalStories,
        pendingStories,
        totalContributions,
        pendingContributions,
        totalUsers,
      },
      popularDishes,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve admin metrics' }, { status: 500 });
  }
}

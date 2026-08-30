import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ favorites: [] }, { status: 200 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        dish: {
          include: { state: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ favorites });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { dishId } = body;

    if (!dishId) {
      return NextResponse.json({ error: 'Dish ID is required' }, { status: 400 });
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_dishId: {
          userId: user.id,
          dishId,
        },
      },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ favorited: false, message: 'Removed from favorites' });
    } else {
      await prisma.favorite.create({
        data: {
          userId: user.id,
          dishId,
        },
      });
      return NextResponse.json({ favorited: true, message: 'Added to favorites' });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to toggle favorite' }, { status: 500 });
  }
}

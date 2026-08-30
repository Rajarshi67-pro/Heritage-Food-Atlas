import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required to write a review' }, { status: 401 });
    }

    const body = await req.json();
    const { dishId, rating, comment } = body;

    if (!dishId || !comment) {
      return NextResponse.json({ error: 'Dish ID and review comment are required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        dishId,
        rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
        comment,
      },
      include: {
        user: { select: { name: true, avatarUrl: true } },
      },
    });

    return NextResponse.json({ message: 'Review posted successfully', review }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit review' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const ingredient = await prisma.ingredient.findUnique({
      where: { slug },
      include: {
        dishIngredients: {
          include: {
            dish: {
              include: { state: true },
            },
          },
        },
      },
    });

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
    }

    return NextResponse.json({ ingredient });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve ingredient' }, { status: 500 });
  }
}

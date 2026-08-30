import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { INDIA_STATES_META } from '@/data/indiaGeoData';

export async function GET() {
  try {
    const states = await prisma.state.findMany({
      include: {
        dishes: {
          select: {
            id: true,
            slug: true,
            name: true,
            foodCategory: true,
            cuisineType: true,
            imageUrl: true,
            isGiTagged: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    const enriched = states.map((s) => {
      const meta = INDIA_STATES_META[s.code] || {
        signatureFlavor: 'Indigenous Spice Traditions',
        traditionalGrain: 'Native Grains',
      };

      return {
        ...s,
        signatureFlavor: meta.signatureFlavor,
        traditionalGrain: meta.traditionalGrain,
        dishCount: s.dishes.length,
      };
    });

    return NextResponse.json({ states: enriched });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to load map data' }, { status: 500 });
  }
}

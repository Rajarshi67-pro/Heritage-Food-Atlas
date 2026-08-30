import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim();
    const stateCode = searchParams.get('state');
    const cuisine = searchParams.get('cuisine');
    const category = searchParams.get('category');
    const season = searchParams.get('season');
    const giOnly = searchParams.get('giOnly') === 'true';
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { cuisineType: { contains: search } },
        { historicalBackground: { contains: search } },
        { culturalSignificance: { contains: search } },
        { state: { name: { contains: search } } },
      ];
    }

    if (stateCode && stateCode !== 'ALL') {
      where.state = { code: stateCode };
    }

    if (cuisine && cuisine !== 'ALL') {
      where.cuisineType = cuisine;
    }

    if (category && category !== 'ALL') {
      where.foodCategory = category;
    }

    if (season && season !== 'ALL') {
      where.seasonalAvailability = { contains: season };
    }

    if (giOnly) {
      where.isGiTagged = true;
    }

    if (verifiedOnly) {
      where.verifiedStatus = 'VERIFIED';
    }

    const [dishes, total] = await Promise.all([
      prisma.dish.findMany({
        where,
        include: {
          state: true,
          dishIngredients: {
            include: { ingredient: true },
          },
          festivalDishes: {
            include: { festival: true },
          },
          _count: {
            select: { stories: true, favorites: true },
          },
        },
        orderBy: { viewsCount: 'desc' },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.dish.count({ where }),
    ]);

    return NextResponse.json({
      dishes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch dishes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user || (user.role !== 'ADMIN' && user.role !== 'CONTRIBUTOR')) {
      return NextResponse.json({ error: 'Unauthorized. Admin or Contributor role required.' }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      stateCode,
      regionName,
      cuisineType,
      foodCategory,
      description,
      culturalSignificance,
      historicalBackground,
      traditionalPreparation,
      seasonalAvailability,
      isGiTagged,
      giTagDetails,
      imageUrl,
      localNames,
      ingredientIds,
      festivalIds,
    } = body;

    if (!name || !stateCode || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const state = await prisma.state.findUnique({ where: { code: stateCode } });
    if (!state) {
      return NextResponse.json({ error: 'Invalid state code' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const dish = await prisma.dish.create({
      data: {
        slug,
        name,
        localNames: localNames ? JSON.stringify(localNames) : null,
        stateId: state.id,
        regionName,
        cuisineType: cuisineType || 'Regional Indian',
        foodCategory: foodCategory || 'Main',
        description,
        culturalSignificance: culturalSignificance || '',
        historicalBackground: historicalBackground || '',
        traditionalPreparation: traditionalPreparation || '',
        seasonalAvailability: seasonalAvailability || 'All Season',
        isGiTagged: !!isGiTagged,
        giTagDetails,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
        verifiedStatus: user.role === 'ADMIN' ? 'VERIFIED' : 'COMMUNITY',
      },
    });

    if (ingredientIds && Array.isArray(ingredientIds)) {
      for (const ingId of ingredientIds) {
        await prisma.dishIngredient.create({
          data: { dishId: dish.id, ingredientId: ingId, isKey: true },
        });
      }
    }

    if (festivalIds && Array.isArray(festivalIds)) {
      for (const festId of festivalIds) {
        await prisma.festivalDish.create({
          data: { dishId: dish.id, festivalId: festId },
        });
      }
    }

    return NextResponse.json({ message: 'Dish created successfully', dish }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create dish' }, { status: 500 });
  }
}

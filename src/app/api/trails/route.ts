import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    const trails = await prisma.foodTrail.findMany({
      where: { isPublished: true },
      include: {
        stops: {
          orderBy: { orderIndex: 'asc' },
        },
        user: {
          select: { name: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ trails });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch food trails' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { title, cityState, description, estimatedDuration, bestTime, imageUrl, stops } = body;

    if (!title || !cityState || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const trail = await prisma.foodTrail.create({
      data: {
        title,
        slug,
        cityState,
        description,
        estimatedDuration: estimatedDuration || '3-4 Hours',
        bestTime: bestTime || 'Morning / Evening',
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80',
        userId: user.id,
        isPublished: true,
        stops: {
          create: Array.isArray(stops)
            ? stops.map((s: any, idx: number) => ({
                orderIndex: idx + 1,
                placeName: s.placeName,
                specialtyDishName: s.specialtyDishName,
                historicalNote: s.historicalNote || '',
                latitude: parseFloat(s.latitude) || 22.5726,
                longitude: parseFloat(s.longitude) || 88.3639,
                imageUrl: s.imageUrl || null,
              }))
            : [],
        },
      },
      include: { stops: true },
    });

    return NextResponse.json({ message: 'Trail created successfully', trail }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create food trail' }, { status: 500 });
  }
}

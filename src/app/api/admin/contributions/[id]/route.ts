import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { status, adminNotes } = body;

    if (!status || !['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json({ error: 'Valid status is required' }, { status: 400 });
    }

    const contribution = await prisma.contribution.update({
      where: { id: params.id },
      data: {
        status,
        adminNotes: adminNotes !== undefined ? adminNotes : null,
      },
    });

    return NextResponse.json({ message: `Contribution marked as ${status}`, contribution });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update contribution' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve session', user: null }, { status: 500 });
  }
}

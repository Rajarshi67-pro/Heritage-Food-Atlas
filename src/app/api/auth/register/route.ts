import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const assignedRole = role === 'CONTRIBUTOR' ? 'CONTRIBUTOR' : 'USER';

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        role: assignedRole,
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const res = NextResponse.json({
      message: 'Account registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

    res.cookies.set('hfa_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/firebase-admin';

const prisma = new PrismaClient();

// Middleware pour vérifier l'authentification
async function authenticateRequest(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

// GET /api/barbers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const services = searchParams.get('services')?.split(',');
    const priceRange = searchParams.get('priceRange');

    let where = {};
    if (location) {
      where = {
        ...where,
        location: {
          contains: location,
          mode: 'insensitive',
        },
      };
    }

    if (services?.length) {
      where = {
        ...where,
        services: {
          some: {
            name: {
              in: services,
            },
          },
        },
      };
    }

    if (priceRange) {
      where = {
        ...where,
        services: {
          some: {
            price: {
              lte: parseInt(priceRange),
            },
          },
        },
      };
    }

    const barbers = await prisma.barber.findMany({
      where,
      include: {
        services: true,
        workingHours: true,
      },
    });

    return NextResponse.json(barbers);
  } catch (error) {
    console.error('Error fetching barbers:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/barbers
export async function POST(request: Request) {
  try {
    const decodedToken = await authenticateRequest(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const barber = await prisma.barber.create({
      data: {
        userId: decodedToken.uid,
        name: data.name,
        location: data.location,
        description: data.description,
        services: {
          create: data.services.map((service: any) => ({
            name: service.name,
            price: service.price,
            duration: service.duration,
          })),
        },
        workingHours: {
          create: data.workingHours.map((schedule: any) => ({
            dayOfWeek: schedule.dayOfWeek,
            openTime: schedule.openTime,
            closeTime: schedule.closeTime,
          })),
        },
      },
      include: {
        services: true,
        workingHours: true,
      },
    });

    return NextResponse.json(barber);
  } catch (error) {
    console.error('Error creating barber:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET /api/barbers/[id]
export async function GET_BARBER(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const barber = await prisma.barber.findUnique({
      where: { id: params.id },
      include: {
        services: true,
        workingHours: true,
      },
    });

    if (!barber) {
      return NextResponse.json(
        { error: 'Barber not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(barber);
  } catch (error) {
    console.error('Error fetching barber:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/reservations
export async function POST_RESERVATION(request: Request) {
  try {
    const decodedToken = await authenticateRequest(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const reservation = await prisma.reservation.create({
      data: {
        userId: decodedToken.uid,
        barberId: data.barberId,
        serviceId: data.serviceId,
        date: new Date(data.date),
        status: 'PENDING',
      },
      include: {
        barber: true,
        service: true,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET /api/reservations
export async function GET_RESERVATIONS(request: Request) {
  try {
    const decodedToken = await authenticateRequest(request);
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        userId: decodedToken.uid,
      },
      include: {
        barber: true,
        service: true,
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
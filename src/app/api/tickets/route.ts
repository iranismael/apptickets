import { TicketStatus } from '@/app/tickets/tickets.interface';
import { prisma } from '@/lib/prisma'
import { ticketSchema } from '@/lib/schemas/ticket.schema';
import { NextRequest, NextResponse } from "next/server";
import z from 'zod';

/*export async function GET(request: NextRequest) {
  try {
     const tickets = await prisma.ticket.findMany();
     return NextResponse.json({tickets})
   
  } catch (error) {
    console.error('Error fetching tickets:', error)

    return Response.json(
      { error: 'Error fetching tickets' },
      { status: 500 }
    )
  }
}*/

export async function GET(request: NextRequest) {
  try {
    const url = request.url;

    const { searchParams } = new URL(url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 2);
    const status = searchParams.get("status") as TicketStatus | undefined;

    const count = await prisma.ticket.count({
      where: {
        status: status || undefined,
      },
    });

    const totalPages = Math.ceil(count / limit);

    const tickets = await prisma.ticket.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        status: status || undefined,
      },
    });

    return NextResponse.json({ tickets, totalPages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, assignedTo, status } = ticketSchema.parse(body);

    await prisma.ticket.create({
      data: {
        title,
        description,
        assignedTo,
        status,
      },
    });

     return NextResponse.json({ message: "Ticket created successfully" });
   
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return Response.json(
      { error: 'Error fetching tickets' },
      { status: 500 }
    )
  }
}

// GET → obtener todos los tickets
/*export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return Response.json(tickets)
  } catch (error) {
    return Response.json({ error: 'Error fetching tickets' }, { status: 500 })
  }
}*/

// POST → crear ticket
/*export async function POST(req: Request) {
  try {
    const body = await req.json()

    const ticket = await prisma.ticket.create({
      data: {
        title: body.title,
        description: body.description,
        assignedTo: body.assignedTo,
      },
    })

    return Response.json(ticket)
  } catch (error) {
    return Response.json({ error: 'Error creating ticket' }, { status: 500 })
  }
}*/
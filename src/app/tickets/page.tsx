import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import Link from "next/link";
import { TicketCard } from "@/components/ticket-card";
import { getTickets } from "./tickets.api";
import { TicketPagination } from "@/components/ticket-pagination";
import { TicketFilter } from "@/components/ticket-filter";

interface Params {
  searchParams?: Promise<{
    page: number;
    limit: number;
    status: string;
  }>;
}



export default async function TicketsPage({ searchParams }: Params) {
  /*const tickets: Ticket[] = [
    {
        id: '1',
        title: 'Proyecto1',
        description: 'Un nuevo proyecto',
        status: 'DONE',
        assignedTo: 'Ismael'
    },
     {
        id: '2',
        title: 'Proyecto2',
        description: 'Diseño de proyecto',
        status: 'IN_PROGRESS',
        assignedTo: 'Ismael'
    },
     {
        id: '3',
        title: 'Proyecto3',
        description: 'Desarrollo de proyecto',
        status: 'REJECTED',
        assignedTo: 'Ismael'
    }

  ]*/
  const page = Number((await searchParams)?.page || 1);
  const limit = Number((await searchParams)?.limit || 2);
  const status = (await searchParams)?.status;

   const { tickets, totalPages } = await getTickets({ page, limit, status });
  return (
    <div className="w-full px-4 sm:px-8 xl:px-16 2xl:px-24 py-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold">Tickets</h1>

        <Button asChild className="w-full sm:w-auto">
          <Link href="/tickets/new">
            Agregar Ticket <LucidePlusCircle />
          </Link>
        </Button>
      </header>

      <div className="mb-6 overflow-x-auto">
        <TicketFilter status={status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0
          ? tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          : "No se encontraron tickets"}
      </div>

      <div className="mt-8">
        <TicketPagination
          currentPage={page}
          totalPages={totalPages}
          limit={limit}
        />
      </div>
    </div>
    

   
    
  );
}

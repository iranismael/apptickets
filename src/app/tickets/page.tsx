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
  const limit = Number((await searchParams)?.limit || 4);
  const status = (await searchParams)?.status;

   const { tickets, totalPages } = await getTickets({ page, limit, status });
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <div className="w-full px-4 sm:px-8 xl:px-16 2xl:px-24 py-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-end mb-10 border-b-2 border-dashed border-[#1B2438]/20 pb-6">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#1B2438]/50 mb-1">
              Mesa de ayuda · Panel
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#1B2438] tracking-tight">
              Tickets
            </h1>
          </div>

          <Button
            asChild
            className="w-full sm:w-auto bg-[#1B2438] hover:bg-[#1B2438]/90 text-[#FAF8F3] rounded-full px-6 h-11 font-medium"
          >
            <Link href="/tickets/new">
              Agregar ticket <LucidePlusCircle className="size-4" />
            </Link>
          </Button>
        </header>

        <div className="mb-8 overflow-x-auto">
          <TicketFilter status={status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.length > 0 ? (
            tickets.map((ticket, i) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                index={(page - 1) * limit + i + 1}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="font-mono text-sm text-[#1B2438]/40 mb-2">
                ░░░ SIN RESULTADOS ░░░
              </p>
              <p className="text-[#1B2438]/60">
                No se encontraron tickets con este filtro.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10">
          <TicketPagination
            currentPage={page}
            totalPages={totalPages}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
}

import { Ticket } from "@/app/tickets/tickets.interface";
import { getTicket } from "../tickets.api";
import { TicketForm } from "@/components/ticket-form";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewTicket({ params }: Params) {
  const id = (await params)?.id;

  let data: { ticket: Ticket } | undefined;
  if (id) {
    data = await getTicket(id);
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-6">
      <div className="w-full max-w-[440px] bg-white rounded-2xl border border-[#1B2438]/10 overflow-hidden">
        <div className="px-8 pt-8 pb-5">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#1B2438]/40 mb-1">
            {data?.ticket ? `Folio #${data.ticket.id.slice(0, 6)}` : "Nuevo folio"}
          </p>
          <h1 className="text-2xl font-semibold text-[#1B2438]">
            {data?.ticket ? "Editar ticket" : "Nuevo ticket"}
          </h1>
        </div>

        <div className="relative px-8">
          <div className="absolute -left-2.5 top-0 size-5 bg-[#FAF8F3] rounded-full border border-[#1B2438]/10" />
          <div className="border-t-2 border-dashed border-[#1B2438]/15" />
          <div className="absolute -right-2.5 top-0 size-5 bg-[#FAF8F3] rounded-full border border-[#1B2438]/10" />
        </div>

        <div className="px-8 py-6">
          <TicketForm ticket={data?.ticket} />
        </div>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  console.log(data);

  return (
    <div className="max-w-[400px] w-full p-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketForm ticket={data?.ticket} />
        </CardContent>
      </Card>
    </div>
  );
}

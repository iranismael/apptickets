"use client";

import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { deleteTicket } from "@/app/tickets/tickets.api";
import { revalidate } from "@/lib/actions";
import Link from "next/link";
import { LucideTrash } from "lucide-react";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<TicketStatus, { label: string; className: string }> = {
  TODO: { label: "To do", className: "bg-[#E2A33D] text-[#412402]" },
  IN_PROGRESS: { label: "En progreso", className: "bg-[#3B6FA0] text-white" },
  REJECTED: { label: "Cancelado", className: "bg-[#C1443C] text-white" },
  DONE: { label: "Finalizado", className: "bg-[#3F7A5E] text-white" },
};

export function TicketCard({
  ticket,
  index,
}: {
  ticket: Ticket;
  index?: number;
}) {
  const status = STATUS_STYLES[ticket.status] ?? STATUS_STYLES.TODO;

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await deleteTicket(ticket.id);
      await revalidate("/tickets");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link href={`/tickets/${ticket.id}/edit`} className="block group">
      <Card className="p-0 gap-0 overflow-hidden rounded-2xl border-[#1B2438]/10 shadow-none hover:shadow-md transition-shadow bg-white">
        <CardHeader className="p-5 pb-3 gap-1">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[11px] tracking-wider text-[#1B2438]/40">
              {index ? `#${String(index).padStart(3, "0")}` : ticket.id.slice(0, 6)}
            </span>
            <Button
              onClick={handleDelete}
              size="sm"
              variant="ghost"
              className="h-auto w-auto p-1 text-[#1B2438]/30 hover:text-[#C1443C] opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <LucideTrash className="size-4" />
            </Button>
          </div>
          <CardTitle className="text-base font-semibold text-[#1B2438] leading-snug">
            {ticket.title}
          </CardTitle>
          <CardDescription className="text-[#1B2438]/60 line-clamp-2">
            {ticket.description || "No description."}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative flex items-center px-5">
            <div className="absolute -left-2.5 size-5 bg-[#FAF8F3] rounded-full border border-[#1B2438]/10" />
            <div className="flex-1 border-t-2 border-dashed border-[#1B2438]/15" />
            <div className="absolute -right-2.5 size-5 bg-[#FAF8F3] rounded-full border border-[#1B2438]/10" />
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between px-5 py-4 bg-[#FAF8F3]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#1B2438]/40 mb-0.5">
              Asignado a
            </p>
            <p className="font-medium text-sm text-[#1B2438]">{ticket.assignedTo}</p>
          </div>
          <span
            className={cn(
              "text-xs font-semibold px-3 py-1.5 rounded-full",
              status.className
            )}
          >
            {status.label}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
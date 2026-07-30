// components/ticket-form.tsx
"use client";

import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import { toast } from "sonner";
import { createTicket, updateTicket } from "@/app/tickets/tickets.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

interface Inputs {
  title: string;
  assignedTo: string;
  status: TicketStatus;
  description: string;
}

const STATUS_OPTIONS: { value: TicketStatus; label: string; dot: string }[] = [
  { value: "TODO", label: "Por hacer", dot: "bg-[#E2A33D]" },
  { value: "IN_PROGRESS", label: "En progreso", dot: "bg-[#3B6FA0]" },
  { value: "DONE", label: "Finalizado", dot: "bg-[#3F7A5E]" },
  { value: "REJECTED", label: "Cancelado", dot: "bg-[#C1443C]" },
];

const inputClass =
  "border-[#1B2438]/15 focus-visible:ring-[#1B2438]/30 focus-visible:border-[#1B2438]/30";
const labelClass = "font-mono text-[11px] uppercase tracking-widest text-[#1B2438]/50 mb-2 block";

export const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const router = useRouter();

  const { register, handleSubmit, setValue, watch } = useForm<Inputs>({
    defaultValues: {
      title: ticket?.title,
      assignedTo: ticket?.assignedTo,
      status: ticket?.status,
      description: ticket?.description,
    },
  });

  const currentStatus = watch("status");

  const handleChange = (status: string) => {
    setValue("status", status as TicketStatus);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let response: any;

      if (ticket?.id) {
        response = await updateTicket(ticket.id, {
          assignedTo: data.assignedTo,
          description: data.description,
          title: data.title,
          status: data.status,
        });
      } else {
        response = await createTicket({
          assignedTo: data.assignedTo,
          description: data.description,
          title: data.title,
          status: data.status,
        });
      }

      toast.success("Success", {
        description: response.message,
      });

      router.push("/tickets");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <Label className={labelClass} htmlFor="title">
          Titulo
        </Label>
        <Input {...register("title", { required: true })} id="title" className={inputClass} />
      </div>

      <div>
        <Label className={labelClass} htmlFor="assigned">
          Asignado a
        </Label>
        <Input {...register("assignedTo", { required: true })} id="assigned" className={inputClass} />
      </div>

      <div>
        <Label className={labelClass} htmlFor="status">
          Estado
        </Label>
        <Select defaultValue={ticket?.status} onValueChange={handleChange}>
          <SelectTrigger id="status" className={cn("w-full", inputClass)}>
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <span className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", option.dot)} />
                  {option.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className={labelClass} htmlFor="description">
          Descripcion
        </Label>
        <Textarea {...register("description")} id="description" className={cn("min-h-24", inputClass)} />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <Button
          asChild
          variant="ghost"
          className="text-[#1B2438]/60 hover:text-[#1B2438] hover:bg-transparent px-0"
        >
          <Link href="/tickets">Regresar</Link>
        </Button>

        <Button
          type="submit"
          className="bg-[#1B2438] hover:bg-[#1B2438]/90 text-[#FAF8F3] rounded-full px-6"
        >
          {ticket?.id ? "Editar ticket" : "Crear ticket"}
        </Button>
      </div>
    </form>
  );
};
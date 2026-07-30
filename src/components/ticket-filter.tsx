"use client";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TicketFilter({ status }: { status?: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleStatus = (status: string = "ALL") => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (status === "ALL") {
      newSearchParams.delete("status");
    } else {
      newSearchParams.set("status", status.toString());
    }
    newSearchParams.set("page", "1");
    newSearchParams.set("limit", "2");

    router.replace(`${pathName}/?${newSearchParams.toString()}`);
  };

  return (
    <Tabs value={status ?? "ALL"} onValueChange={handleStatus} className="mb-6">
      <TabsList className="bg-white border border-[#1B2438]/10 rounded-full p-1 h-auto gap-1">
        <TabsTrigger
          value="ALL"
          className="rounded-full px-4 py-1.5 text-sm font-medium data-[state=active]:bg-[#1B2438] data-[state=active]:text-[#FAF8F3] text-[#1B2438]/60"
        >
          Todos
        </TabsTrigger>
        <TabsTrigger
          value="TODO"
          className="rounded-full px-4 py-1.5 text-sm font-medium data-[state=active]:bg-[#1B2438] data-[state=active]:text-[#FAF8F3] text-[#1B2438]/60"
        >
          Por hacer
        </TabsTrigger>
        <TabsTrigger
          value="IN_PROGRESS"
          className="rounded-full px-4 py-1.5 text-sm font-medium data-[state=active]:bg-[#1B2438] data-[state=active]:text-[#FAF8F3] text-[#1B2438]/60"
        >
          En progreso
        </TabsTrigger>
        <TabsTrigger
          value="REJECTED"
          className="rounded-full px-4 py-1.5 text-sm font-medium data-[state=active]:bg-[#1B2438] data-[state=active]:text-[#FAF8F3] text-[#1B2438]/60"
        >
          Cancelado
        </TabsTrigger>
        <TabsTrigger
          value="DONE"
          className="rounded-full px-4 py-1.5 text-sm font-medium data-[state=active]:bg-[#1B2438] data-[state=active]:text-[#FAF8F3] text-[#1B2438]/60"
        >
          Finalizado
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
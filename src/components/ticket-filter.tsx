"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
    <Tabs value={status} onValueChange={handleStatus} className="mb-6">
      <TabsList>
        <TabsTrigger value="ALL">Todos</TabsTrigger>
        <TabsTrigger value="TODO">Por hacer</TabsTrigger>
        <TabsTrigger value="IN_PROGRESS">En progreso</TabsTrigger>
        <TabsTrigger value="REJECTED">Cancelado</TabsTrigger>
        <TabsTrigger value="DONE">Finalizado</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

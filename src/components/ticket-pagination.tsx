"use client";

import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  limit: number;
}

export const TicketPagination = ({ currentPage, totalPages, limit }: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    handlePage(currentPage);
  }, []);

  const handlePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    newSearchParams.set("limit", limit.toString());
    router.replace(`${pathName}/?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-6">
      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => handlePage(currentPage - 1)}
        className="rounded-full border border-[#1B2438]/15 disabled:opacity-30"
      >
        <LucideChevronLeft className="size-4 text-[#1B2438]" />
      </Button>
      <span className="font-mono text-sm text-[#1B2438]/70">
        Página <span className="font-semibold text-[#1B2438]">{currentPage}</span> de {totalPages}
      </span>
      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => handlePage(currentPage + 1)}
        className="rounded-full border border-[#1B2438]/15 disabled:opacity-30"
      >
        <LucideChevronRight className="size-4 text-[#1B2438]" />
      </Button>
    </div>
  );
};
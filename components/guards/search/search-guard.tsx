"use client";

import { Input } from "@/components/ui/input";
import { useBoolean } from "@/hooks/use-boolean";
import { Search } from "lucide-react";
import { SearchGuardDialog } from "@/components/guards/search/search-guard-dialog";

export function SearchGuard() {
    const searchGuardDialogStates = useBoolean();

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                type="text"
                placeholder="Search for a guard"
                onFocus={searchGuardDialogStates.setTrue}
                className="pl-10 pr-10 cursor-pointer"
            />

            <SearchGuardDialog
                open={searchGuardDialogStates.value}
                onClose={searchGuardDialogStates.setFalse}
            />
        </div>
    )
}
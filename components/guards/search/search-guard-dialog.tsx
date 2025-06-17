import { useState } from "react";
import { Building2, Loader2, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ICompany } from "@/types/user";
import { genericClient } from "@/lib/generic-api-helper";
import { ApiError } from "@/lib/api-error";
import { IErrorResponse } from "@/types/response";
import { US_STATES } from "@/lib/enums";
import { ICompanyGuardSearchResponse } from "@/types/guard";
import Link from "next/link";

export function SearchGuardDialog({ open, onClose }: {
    open: boolean;
    onClose(): void;
}) {
    const [searchValue, setSearchValue] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [companySearch, setCompanySearch] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [guards, setGuards] = useState<ICompanyGuardSearchResponse[]>([]);
    const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
    const [isLoadingGuards, setIsLoadingGuards] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);


    function handleCompanySelect(company: ICompany) {
        setSelectedCompany(company);
        setCompanySearch(company.companyName);
        setShowCompanyDropdown(false);
    };

    function clearCompany() {
        setSelectedCompany(null);
        setCompanySearch("");
    };

    function clearGuard() {
        setGuards([]);
        setCompanySearch("");
        setSelectedCompany(null);
        setSearchValue("");
        setHasSearched(false);
        setSelectedState("");
    };

    async function handleCompanySearch(value: string) {
        setCompanySearch(value);
        setShowCompanyDropdown(true);
        setIsLoadingCompanies(true);

        try {
            const response = await genericClient({
                url: `/api/search/companies/`,
                method: 'get',
                params: {
                    query: value
                },
            });

            if (response.status === 'success' && response.data) {
                setCompanies(response.data);
            } else {
                setCompanies([]);
            }
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                const details = error.details as IErrorResponse;
                console.log(details);
                setCompanies([]);
            }
        } finally {
            setIsLoadingCompanies(false);
        }

        if (value === "") {
            setSelectedCompany(null);
        }
    };

    async function handleGuardSearch() {
        setIsLoadingGuards(true);

        try {
            const response = await genericClient({
                url: `/api/search/guards/`,
                method: 'get',
                params: {
                    query: searchValue,
                    filter: {
                        state: selectedState,
                        companyUuid: selectedCompany?.uuid
                    }
                },
            });

            if (response.status === 'success' && response.data) {
                setGuards(response.data);
                setHasSearched(true);
            } else {
                setGuards([]);
            }
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                const details = error.details as IErrorResponse;
                console.log(details);
                setGuards([]);
            }
        } finally {
            setIsLoadingGuards(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full p-0">
                <DialogTitle></DialogTitle>
                <div className="w-full">
                    <div className="p-4 border-b border-border">
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Company (Optional)
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        type="text"
                                        placeholder="Search company..."
                                        value={companySearch}
                                        onChange={(e) => handleCompanySearch(e.target.value)}
                                        onFocus={() => setShowCompanyDropdown(true)}
                                        className="pl-10 pr-10"
                                    />
                                    {selectedCompany && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                            onClick={clearCompany}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    )}
                                </div>

                                {showCompanyDropdown && companySearch && !selectedCompany && (
                                    <div className="absolute top-full left-0 right-0 bg-popover border border-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                                        {isLoadingCompanies ? (
                                            <div className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground">Searching companies...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            companies.map((company) => (
                                                <div key={company.uuid} className="p-3 flex items-center gap-4 hover:bg-accent  cursor-pointer border-b border-border last:border-b-0 justify-between" onClick={() => handleCompanySelect(company)}>
                                                    <div>
                                                        <div className="font-medium text-sm text-foreground">{company.companyName}</div>
                                                        <div className="text-xs text-muted-foreground">{company.city}, {company.state}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-8">
                                                            Select Company
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-end gap-3">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Name or License
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                        <Input
                                            type="text"
                                            placeholder="Search by name or license..."
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            className="pl-10 pr-10"
                                        />
                                    </div>
                                </div>

                                <div className="w-32">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        State
                                    </label>
                                    <Select value={selectedState} onValueChange={setSelectedState}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All States" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All States</SelectItem>
                                            {US_STATES.map((state) => (
                                                <SelectItem key={state.abbreviation} value={state.abbreviation}>
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                                    onClick={handleGuardSearch}
                                    disabled={isLoadingGuards}
                                >
                                    {isLoadingGuards ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Searching...
                                        </>
                                    ) : (
                                        "Search"
                                    )}
                                </Button>

                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={clearGuard}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {hasSearched && (
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-sm font-medium text-foreground">
                                    Found {guards.length} guard{guards.length !== 1 ? 's' : ''}
                                    {selectedCompany && (
                                        <span className="text-primary"> from {selectedCompany.companyName}</span>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>

                    {hasSearched && (
                        <div className="divide-y divide-border max-h-96 overflow-y-auto">
                            {isLoadingGuards ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="p-4 flex items-center gap-4">
                                        <Skeleton className="w-12 h-12 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-32" />
                                            <div className="flex items-center gap-4">
                                                <Skeleton className="h-3 w-20" />
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-3 w-24" />
                                                <Skeleton className="h-3 w-28" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                ))
                            ) : (
                                guards.map((guard) => (
                                    <div key={guard.uuid} className="p-4 flex items-center gap-4 hover:bg-accent">
                                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                                            <User className="h-6 w-6 text-muted-foreground" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-primary mb-1">{guard.firstName} {guard.lastName}</h3>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <span className="border border-border px-1.5 py-0.5 rounded text-xs">LIC</span>
                                                    <span>{guard.guardLicenses.map((guardLicense) => (guardLicense.licenseNumber)).join(",")}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="border border-border px-1.5 py-0.5 rounded text-xs">STATE</span>
                                                    <span>{guard.state}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Building2 className="h-4 w-4" />
                                                    <span>{guard.company.companyName}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-yellow-500">★</span>
                                                    <span>{guard.averageRating} ({guard.guardRatingCount} reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/guards/${guard.uuid}/view-ratings`}
                                                target="_blank"
                                            >
                                                <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-8">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
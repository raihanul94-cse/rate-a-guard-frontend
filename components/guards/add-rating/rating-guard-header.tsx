import { IGuardMeta } from '@/types/guard';

export function RatingGuardHeader({ guardData }: { guardData: IGuardMeta | null }) {
    return (
        <header className="sticky top-16 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto w-full max-w-[1224px] px-4 py-3">
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="text-[28px] font-bold block">
                            {guardData?.guard.firstName} {guardData?.guard.lastName}
                        </span>
                        <div className="text-[22px]">Add Rating</div>
                    </div>
                    <div className="flex items-center text-[14px] text-muted-foreground">
                        <span>
                            {guardData?.guard.city}, {guardData?.guard.state}
                        </span>
                        <span className="px-1">·</span>
                        <a href="#" className="hover:underline">
                            {guardData?.guard.company.companyName}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

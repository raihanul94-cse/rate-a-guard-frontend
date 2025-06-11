import { Loader2 } from 'lucide-react';

export function Spinner() {
    return (
        <div className="mx-auto flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
    );
}

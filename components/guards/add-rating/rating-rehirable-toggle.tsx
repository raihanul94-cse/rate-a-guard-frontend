import { forwardRef, useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface IProps {
    value: string | null;
    onChange(value: string | null): void;
}

const RatingRehirable = forwardRef<HTMLDivElement, IProps>(({ value, onChange }, ref) => {
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        setSelected(value);
    }, [value]);

    function handleToggle(select: string) {
        if (select !== selected) {
            setSelected(select);
            onChange(select);
        } else {
            setSelected(null);
            onChange(null);
        }
    }

    return (
        <div ref={ref} className="mt-4 p-6 bg-white rounded-lg shadow-md space-y-6">
            <label className="text-lg font-semibold text-gray-700">Would you hire this guard again?</label>
            <div className="flex gap-8 items-center justify-center">
                <button
                    type="button"
                    onClick={() => handleToggle('yes')}
                    aria-pressed={selected === 'yes'}
                    aria-label="Rehire Yes"
                    className="flex flex-col items-center"
                >
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${selected === 'yes'
                                ? 'bg-green-400 border-transparent'
                                : 'border-gray-300 hover:bg-green-100'
                            }`}
                    >
                        {selected === 'yes' && <Check className="text-white stroke-[3]" />}
                    </div>
                    <span className={`mt-1 text-sm ${selected === 'yes' ? 'text-black' : 'text-gray-400'}`}>Yes</span>
                </button>

                <button
                    type="button"
                    onClick={() => handleToggle('no')}
                    aria-pressed={selected === 'no'}
                    aria-label="Rehire No"
                    className="flex flex-col items-center"
                >
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${selected === 'no' ? 'bg-red-500 border-transparent' : 'border-gray-300 hover:bg-red-100'
                            }`}
                    >
                        {selected === 'no' && <X className="text-white stroke-[3]" />}
                    </div>
                    <span className={`mt-1 text-sm ${selected === 'no' ? 'text-black' : 'text-gray-400'}`}>No</span>
                </button>
            </div>
        </div>
    );
});

RatingRehirable.displayName = 'RatingRehirable';

export { RatingRehirable };

type TRequestPayload<T> = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    data?: T;
    params?: T;
};

export const genericClient = async <T>(payload: TRequestPayload<T>) => {
    try {
        const response = await fetch('/api/generic', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return { error: (error as Error).message };
    }
};

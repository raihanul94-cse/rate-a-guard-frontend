import { ApiError } from '@/lib/api-error';
import axiosHelper from '@/lib/axios-helper';
import { NextResponse } from 'next/server';

type TRequestPayload<T = unknown> = {
    url: string;
    method: string;
    data?: T;
    params?: T;
};

const POST = async (request: Request) => {
    try {
        const { url, method, data, params }: TRequestPayload = await request.json();

        if (method === 'get') {
            const response = await axiosHelper.get(url, {
                params: params,
            });

            return NextResponse.json(response);
        } else if (method === 'post') {
            const response = await axiosHelper.post(url, data, {
                params: params,
            });

            return NextResponse.json(response);
        } else if (method === 'put') {
            const response = await axiosHelper.put(url, data, {
                params: params,
            });

            return NextResponse.json(response);
        } else if (method === 'delete') {
            const response = await axiosHelper.delete(url, {
                params: params,
            });

            return NextResponse.json(response);
        }
    } catch (error: unknown) {
        if (error instanceof ApiError) {
            return NextResponse.json({ error: error.message, details: error.details }, { status: error.statusCode });
        }

        return NextResponse.json(
            { error: 'Internal Server Error', details: (error as Error).message },
            { status: 500 }
        );
    }
};

export { POST };

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
                params: params
            });

            return NextResponse.json(response);
        } else if (method === 'post') {
            const response = await axiosHelper.post(url, data, {
                params: params
            });
            console.log(response);

            return NextResponse.json(response);
        } else if (method === 'put') {
            const response = await axiosHelper.put(url, data, {
                params: params
            });

            return NextResponse.json(response);
        } else if (method === 'delete') {
            const response = await axiosHelper.delete(url, {
                params: params
            });

            return NextResponse.json(response);
        }
    } catch (error) {
        return NextResponse.json(error);
    }
};

export { POST };

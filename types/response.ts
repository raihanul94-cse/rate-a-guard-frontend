export interface ISuccessResponse<TData = unknown, TMeta = Record<string, unknown>, TLinks = Record<string, string>> {
    status: 'success';
    data: TData;
    metadata?: TMeta;
    links?: TLinks;
}

export interface IErrorResponse<
    TDetails = Record<string, unknown>,
    TMeta = Record<string, unknown>,
    TLinks = Record<string, string>,
> {
    status: 'error';
    error: {
        code: number;
        message: string;
        details?: TDetails;
    };
    metadata: {
        timestamp: string;
    } & TMeta;
    links?: TLinks;
}

export type TResponse<TData = unknown> = ISuccessResponse<TData> | IErrorResponse;

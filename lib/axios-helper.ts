import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

class AxiosHelper {
    private instance: AxiosInstance;

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                const accessToken = await this.getAccessToken();
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.instance.interceptors.response.use(
            async (response: AxiosResponse) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    await this.clearTokens();
                }
                console.log(JSON.stringify(error));
                
                return Promise.reject(error);
            }
        );
    }

    private async getAccessToken(): Promise<string | null> {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('access-token');

        return accessToken ? accessToken.value : null;
    }

    private async clearTokens() {
        const cookieStore = await cookies();
        cookieStore.delete('access-token');
    }

    public getInstance(): AxiosInstance {
        return this.instance;
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    public async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    public async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    }

    public async delete<T, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    }
}

const axiosHelper = new AxiosHelper(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000');
export default axiosHelper;

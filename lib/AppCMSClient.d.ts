export interface AppCMSClientConfig {
    apiKey: string;
    baseUrl?: string;
}
export declare class AppCMSClient<Content> {
    private clientConfig;
    private baseURL;
    constructor(clientConfig: AppCMSClientConfig);
    private generateURL;
    private makeRequest;
    get analytics(): {
        log: (event: string, platform: string, deviceId: string, data?: string) => Promise<Content>;
    };
    get appConfig(): {
        fetch: () => Promise<Content>;
    };
    get content(): {
        fetch: (locale: string) => Promise<Content>;
        file: (fileId: string) => Promise<Content>;
    };
}

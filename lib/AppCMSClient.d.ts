import * as FormData from 'form-data';
export interface AppCMSClientConfig {
    apiKey: string;
    baseUrl?: string;
    language?: string;
}
export declare class AppCMSClient<Content> {
    private clientConfig;
    private baseURL;
    private accessToken;
    private language;
    constructor(clientConfig: AppCMSClientConfig);
    setLanguage: (language: string) => void;
    setAccessToken: (token: string) => void;
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
    translations: (locale: string) => Promise<Content>;
    get vinduesgrossisten(): {
        login: (accessKey: string) => Promise<Content>;
        tasks: (date: string) => Promise<Content>;
        taskUpdate: (taskId: string, values: {
            note?: string;
            materials?: string;
        }) => Promise<Content>;
        tasksUpdateStatus: (taskId: string | number, statusId: string, note: string, delay?: number) => Promise<Content>;
        statuses: () => Promise<Content>;
        taskCreateDocumentations(taskId: string | number, data: FormData): Promise<Content>;
        taskUpdateDocumentations(taskId: string | number, documentationId: string | number, values: {
            note?: string;
        }): Promise<Content>;
        taskDocumentationImage(taskId: string | number, documentationId: string | number, config: {
            width?: string | number;
            height?: string | number;
            crop?: boolean;
        }): Promise<Content>;
        taskDeleteDocumentation(taskId: string | number, documentationId: string | number): Promise<Content>;
    };
    get cphtrucking(): {
        login: (accessKey: string) => Promise<Content>;
        customers: () => Promise<Content>;
        tasks: (date: string) => Promise<Content>;
        taskUpdate: (taskId: string, values: {
            note?: string;
            materials?: string;
        }) => Promise<Content>;
        tasksUpdateStatus: (taskId: string | number, statusId: string, note: string, delay?: number) => Promise<Content>;
        statuses: () => Promise<Content>;
        taskCreateDocumentations(taskId: string | number, data: FormData): Promise<Content>;
        taskUpdateDocumentations(taskId: string | number, documentationId: string | number, values: {
            note?: string;
        }): Promise<Content>;
        taskDocumentationImage(taskId: string | number, documentationId: string | number, config: {
            width?: string | number;
            height?: string | number;
            crop?: boolean;
        }): Promise<Content>;
        taskDeleteDocumentation(taskId: string | number, documentationId: string | number): Promise<Content>;
        taskStart: (taskId: string | number) => Promise<Content>;
        taskEnd: (taskId: string | number) => Promise<Content>;
        addresses: () => Promise<Content>;
        workshiftCurrent: () => Promise<Content>;
        workshiftIndex: () => Promise<Content>;
        workshiftStart: () => Promise<Content>;
        workshiftEnd: () => Promise<Content>;
        taskCreate: (task: Task) => Promise<Content>;
        taskWorklogs: (taskId: string | number) => Promise<Content>;
        taskWorklogsSet: (taskId: string | number, status: "start" | "end" | "pause") => Promise<Content>;
    };
}

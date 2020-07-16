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
    readonly analytics: {
        log: (event: string, platform: string, deviceId: string, data?: string) => Promise<Content>;
    };
    readonly appConfig: {
        fetch: () => Promise<Content>;
    };
    readonly content: {
        fetch: () => Promise<Content>;
        file: (fileId: string) => Promise<Content>;
    };
    translations: () => Promise<Content>;
    readonly vinduesgrossisten: {
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
    readonly cphtrucking: {
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
        taskWorklogsSet: (taskId: string | number, status: "start" | "pause" | "end") => Promise<Content>;
    };
}

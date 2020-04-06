import * as FormData from 'form-data';
export interface AppCMSClientConfig {
    apiKey: string;
    baseUrl?: string;
}
export declare class AppCMSClient<Content> {
    private clientConfig;
    private baseURL;
    private accessToken;
    constructor(clientConfig: AppCMSClientConfig);
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
        workshift: () => Promise<Content>;
        workshiftStart: () => Promise<Content>;
        workshiftEnd: () => Promise<Content>;
        taskCreate: (task: {
            id: number;
            type: string;
            description: string;
            estimate: number;
            task_id: string;
            task_date: string;
            task_name: string;
            task_type: string;
            is_delayed: boolean;
            ct_customer: {
                id: number;
                name: string;
                phone: string;
                email: string;
                address_street: string;
                address_city: string;
                address_postal_code: string;
            };
            status_note: {
                id: number;
                ct_status: {
                    id: number;
                    name: string;
                };
                note: string;
            };
            documentations: {
                id: number;
                doc_type: "other";
                note: string;
                image_path: string;
            }[];
            note: string;
            order_pdf: string;
            destination_street_address: string;
            destination_postal_code: string;
            destination_city: string;
            pickup_street_address: string;
            pickup_postal_code: string;
            pickup_city: string;
            contact_person: string;
        }) => Promise<Content>;
    };
}

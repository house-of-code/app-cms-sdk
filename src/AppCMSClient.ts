import fetch, {RequestInit} from 'node-fetch'
import * as FormData from 'form-data'
import * as querystring from 'query-string'

export interface AppCMSClientConfig {
    apiKey: string
    baseUrl?: string

}

export class AppCMSClient<Content> {

    private baseURL: string = "https://www.appcms.dk"
    private accessToken: string = ''

    constructor(
        private clientConfig: AppCMSClientConfig
    ) {

        if(clientConfig.baseUrl) {
            this.baseURL = clientConfig.baseUrl
        }

        this.accessToken = ''

    }

    public setAccessToken = (token: string) => {
        this.accessToken = token
    }

    private generateURL = (endpoint: string, withAPIKey: boolean = true, params?: {[key: string]: string}) => {
        let url = `${this.baseURL}`
        let queryParams = ""

        if(params) {
            queryParams = querystring.stringify(params)
            console.log("Generated params", queryParams)
        }





        if(withAPIKey) {
            url += `/api/${this.clientConfig.apiKey}`
        }

        if(endpoint.charAt(0) !== "/") {
            return `${url}/${endpoint}?${queryParams}`
        }

        return `${url}${endpoint}?${queryParams}`
    }

    private makeRequest = async (url: string, method="get", data?: any): Promise<Content> => {
        const requestOptions: RequestInit = {
            method,
            headers: {},
        }

        if(this.accessToken.length > 0) {
            requestOptions.headers["authorization"] = `Bearer ${this.accessToken}`
        }



        switch (method.toLowerCase()) {
            case "post":
            case "patch":
            case 'put':
                requestOptions.method = method

                if(data instanceof FormData) {
                    requestOptions.body = data
                }
                else {
                    requestOptions.body = JSON.stringify(data)
                    requestOptions.headers['content-type'] = 'application/json'
                }


                break
        }

        console.log(`[Request] init - ${url} - ${method} - ${JSON.stringify(data)} - ${JSON.stringify(requestOptions.headers)}`)


        const response = await fetch(url, requestOptions)
        const contentType: string|undefined = response.headers["content-type"]

        if(contentType && contentType.toLowerCase() !== "application/json") {
            const text = await response.text()

        }

        const json = await response.json()


        return json
    }


    get analytics() {
        return {
            log: (event: string, platform: string, deviceId: string, data?: string) => {
                return this.makeRequest(this.generateURL("/analytics/log"), "post", {
                    analytic: {
                        event,
                        platform,
                        device_id: deviceId,
                        data
                    }
                })
            }
        }
    }


    get appConfig() {
        return {
            fetch: () => {
                return this.makeRequest(this.generateURL(`/app_config`))
            }
        }
    }

    get content() {
        return {
            fetch: (locale: string): Promise<Content> => {
                return this.makeRequest(this.generateURL(`/content/${locale}`))
            },
            file: (fileId: string) => {
                return this.makeRequest(this.generateURL(`/content/file/${fileId}`))
            }
        }
    }


    get vinduesgrossisten() {
        const self = this
        function tasks(date: string) {
            return this.makeRequest(this.generateURL(`/vinduesgrossisten/tasks?date=${date}`))
        }

        return {
            login: (accessKey: string) => {
                return this.makeRequest(this.generateURL(`/vinduesgrossisten/engineer-login`), "post", {access_key: accessKey})
            },
            tasks: (date: string) => {
                return this.makeRequest(this.generateURL(`/vinduesgrossisten/tasks?date=${date}`))
            },
            taskUpdate: (taskId: string, values: {note?: string, materials?: string}) => {
                return this.makeRequest(this.generateURL(`/vinduesgrossisten/tasks/${taskId}`), "patch", values)
            },
            tasksUpdateStatus: (taskId: string|number, statusId: string, note: string, delay?: number)  => {
                return this.makeRequest(this.generateURL(`/vinduesgrossisten/tasks/${taskId}/status`), "put", {vin_status_id: statusId, note, delay})
            },
            statuses: () => {
                return this.makeRequest(this.generateURL(`/vinduesgrossisten/statuses`))
            },
            taskCreateDocumentations(taskId: number|string, data: FormData) {
                return self.makeRequest(self.generateURL(`/vinduesgrossisten/tasks/${taskId}/documentations`), 'post', data)
            },
            taskUpdateDocumentations(taskId: number|string, documentationId: string|number, values: {note?: string}) {
                return self.makeRequest(self.generateURL(`/vinduesgrossisten/tasks/${taskId}/documentations/${documentationId}`), 'patch', values)
            },
            taskDocumentationImage(taskId: string|number, documentationId: string| number, config: {width?: string|number, height?: string|number, crop?: boolean}) {
                const params : any = {}
                if(config.hasOwnProperty('width')) {
                    params.w = config.width
                }

                if(config.hasOwnProperty('height')) {
                    params.h = config.height
                }

                if(config.hasOwnProperty('crop')) {
                    params.crop = config.crop
                }

                const url = self.generateURL(`/vinduesgrossisten/tasks/${taskId}/documentations/${documentationId}/image`, true, params)

                return self.makeRequest(url)

            },
            taskDeleteDocumentation(taskId: number|string, documentationId: string|number) {
                return self.makeRequest(self.generateURL(`/vinduesgrossisten/tasks/${taskId}/documentations/${documentationId}`), "delete")
            },
        }
    }

    get cphtrucking() {
        const self = this
        function tasks(date: string) {
            return this.makeRequest(this.generateURL(`/cphtrucking/tasks?date=${date}`))
        }

        return {
            login: (accessKey: string) => {
                return this.makeRequest(this.generateURL(`/cphtrucking/engineer-login`), "post", {access_key: accessKey})
            },
            customers: () => {
                return this.makeRequest(this.generateURL(`/cphtrucking/customers`))
            },
            tasks: (date: string) => {
                return this.makeRequest(this.generateURL(`/cphtrucking/tasks?date=${date}`))
            },
            taskUpdate: (taskId: string, values: {note?: string, materials?: string}) => {
                return this.makeRequest(this.generateURL(`/cphtrucking/tasks/${taskId}`), "patch", values)
            },
            tasksUpdateStatus: (taskId: string|number, statusId: string, note: string, delay?: number)  => {
                return this.makeRequest(this.generateURL(`/cphtrucking/tasks/${taskId}/status`), "put", {vin_status_id: statusId, note, delay})
            },
            statuses: () => {
                return this.makeRequest(this.generateURL(`/cphtrucking/statuses`))
            },
            taskCreateDocumentations(taskId: number|string, data: FormData) {
                return self.makeRequest(self.generateURL(`/cphtrucking/tasks/${taskId}/documentations`), 'post', data)
            },
            taskUpdateDocumentations(taskId: number|string, documentationId: string|number, values: {note?: string}) {
                return self.makeRequest(self.generateURL(`/cphtrucking/tasks/${taskId}/documentations/${documentationId}`), 'patch', values)
            },
            taskDocumentationImage(taskId: string|number, documentationId: string| number, config: {width?: string|number, height?: string|number, crop?: boolean}) {
                const params : any = {}
                if(config.hasOwnProperty('width')) {
                    params.w = config.width
                }

                if(config.hasOwnProperty('height')) {
                    params.h = config.height
                }

                if(config.hasOwnProperty('crop')) {
                    params.crop = config.crop
                }

                const url = self.generateURL(`/cphtrucking/tasks/${taskId}/documentations/${documentationId}/image`, true, params)

                return self.makeRequest(url)

            },
            taskDeleteDocumentation(taskId: number|string, documentationId: string|number) {
                return self.makeRequest(self.generateURL(`/cphtrucking/tasks/${taskId}/documentations/${documentationId}`), "delete")
            },
            taskStart: (taskId: number|string) => {
                return this.makeRequest(this.generateURL(`/cphtrucking/tasks/${taskId}/start`), "patch")
            },
            taskEnd: (taskId: number|string) => {
                return this.makeRequest(this.generateURL(`/cphtrucking/tasks/${taskId}/end`), "patch")
            },
            addresses: () => {
                return this.makeRequest(this.generateURL(`/cphtrucking/addresses`))
            },
            workshift: () => {
                return this.makeRequest(this.generateURL(`/cphtrucking/workshift`))
            },
            workshiftStart: () => {
                return this.makeRequest(this.generateURL(`/cphtrucking/start_workshift`), "patch")
            },
            workshiftEnd: () => {
                return this.makeRequest(this.generateURL(`/cphtrucking/end_workshift`), "patch")
            },
            taskCreate: (task: {
                id: number
                type: string
                description: string
                estimate: number
                task_id: string
                task_date: string
                task_name: string
                task_type: string
                is_delayed: boolean
                ct_customer: {
                    id: number
                    name: string
                    phone: string
                    email: string
                    address_street: string
                    address_city: string
                    address_postal_code: string
                }
                status_note: {
                    id: number,
                    ct_status: {
                        id: number
                        name: string
                    }
                    note: string
                }
                documentations: Array<{
                    id: number
                    doc_type: 'other'
                    note:string
                    image_path: string
                }>
                note: string
                order_pdf: string
                destination_street_address: string
                destination_postal_code: string
                destination_city: string,
                pickup_street_address: string
                pickup_postal_code: string
                pickup_city: string
                contact_person: string
            }
            ) => {
                return this.makeRequest(this.generateURL(`/cphtrucking/engineer-login`), "post", {ct_task: {
                    task_date: task.task_date,
                    ct_customer_id: task.ct_customer.id,
                    task_name: task.task_name,
                    destinationStreetAddress: task.destination_street_address,
                    destination_postal_code: task.destination_postal_code,
                    destination_city: task.destination_city,
                    ct_status_id: task.status_note.ct_status,
                    ct_order_type_id: null,
                    estimate: task.estimate,
                    description: task.description,
                    note: task.note,
                    task_id: task.task_id
                }})
            }
        }
    }

}


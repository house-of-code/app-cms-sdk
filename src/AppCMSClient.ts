import fetch, {RequestInit} from 'node-fetch'

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

    }

    public setAccessToken = (token: string) => {
        this.accessToken = token
    }

    private generateURL = (endpoint: string, withAPIKey: boolean = true) => {
        let url = `${this.baseURL}`

        if(withAPIKey) {
            url += `/api/${this.clientConfig.apiKey}`
        }

        if(endpoint.charAt(0) !== "/") {
            return `${url}/${endpoint}`
        }

        return `${url}${endpoint}`
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
                requestOptions.body = JSON.stringify(data)
                requestOptions.headers['content-type'] = 'application/json'

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
        return {
            login: (accessKey: string) => {
                return this.makeRequest(this.generateURL(`/vinduesgrossisten/engineer-login`), "post", {access_key: accessKey})
            },
            tasks: (date: string) => {
                return this.makeRequest(this.generateURL(`/vinduesgrossisten/tasks?date=${date}`))
            }
        }
    }

}

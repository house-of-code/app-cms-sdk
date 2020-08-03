"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var FormData = require("form-data");
var querystring = require("query-string");
var AppCMSClient = /** @class */ (function () {
    function AppCMSClient(clientConfig) {
        var _this = this;
        this.clientConfig = clientConfig;
        this.baseURL = "https://www.appcms.dk";
        this.accessToken = '';
        this.language = 'en';
        this.setLanguage = function (language) {
            _this.language = language;
        };
        this.setAccessToken = function (token) {
            _this.accessToken = token;
        };
        this.generateURL = function (endpoint, withAPIKey, params) {
            if (withAPIKey === void 0) { withAPIKey = true; }
            var url = "" + _this.baseURL;
            var queryParams = "";
            if (params) {
                queryParams = querystring.stringify(params);
                console.log("Generated params", queryParams);
            }
            if (withAPIKey) {
                url += "/api/" + _this.clientConfig.apiKey;
            }
            if (endpoint.charAt(0) !== "/") {
                return url + "/" + endpoint + "?" + queryParams;
            }
            return "" + url + endpoint + "?" + queryParams;
        };
        this.makeRequest = function (url, method, data) {
            if (method === void 0) { method = "get"; }
            return __awaiter(_this, void 0, void 0, function () {
                var requestOptions, response, contentType, text, json;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestOptions = {
                                method: method,
                                headers: {},
                            };
                            if (this.accessToken.length > 0) {
                                requestOptions.headers["authorization"] = "Bearer " + this.accessToken;
                            }
                            switch (method.toLowerCase()) {
                                case "post":
                                case "patch":
                                case 'put':
                                    requestOptions.method = method;
                                    if (data instanceof FormData) {
                                        requestOptions.body = data;
                                    }
                                    else {
                                        requestOptions.body = JSON.stringify(data);
                                        requestOptions.headers['content-type'] = 'application/json';
                                    }
                                    break;
                            }
                            console.log("[Request] init - " + url + " - " + method + " - " + JSON.stringify(data) + " - " + JSON.stringify(requestOptions.headers));
                            return [4 /*yield*/, node_fetch_1.default(url, requestOptions)];
                        case 1:
                            response = _a.sent();
                            contentType = response.headers["content-type"];
                            if (!(contentType && contentType.toLowerCase() !== "application/json")) return [3 /*break*/, 3];
                            return [4 /*yield*/, response.text()];
                        case 2:
                            text = _a.sent();
                            _a.label = 3;
                        case 3: return [4 /*yield*/, response.json()];
                        case 4:
                            json = _a.sent();
                            return [2 /*return*/, json];
                    }
                });
            });
        };
        this.translations = function () {
            return _this.makeRequest(_this.generateURL("/translated_texts/" + _this.language));
        };
        if (clientConfig.baseUrl) {
            this.baseURL = clientConfig.baseUrl;
        }
        if (clientConfig.language) {
            this.language = clientConfig.language;
        }
        this.accessToken = '';
    }
    Object.defineProperty(AppCMSClient.prototype, "analytics", {
        get: function () {
            var _this = this;
            return {
                log: function (event, platform, deviceId, data) {
                    return _this.makeRequest(_this.generateURL("/analytics/log"), "post", {
                        analytic: {
                            event: event,
                            platform: platform,
                            device_id: deviceId,
                            data: data
                        }
                    });
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCMSClient.prototype, "appConfig", {
        get: function () {
            var _this = this;
            return {
                fetch: function () {
                    return _this.makeRequest(_this.generateURL("/app_config"));
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCMSClient.prototype, "content", {
        get: function () {
            var _this = this;
            return {
                fetch: function () {
                    return _this.makeRequest(_this.generateURL("/content/" + _this.language));
                },
                file: function (fileId) {
                    return _this.makeRequest(_this.generateURL("/content/file/" + fileId));
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCMSClient.prototype, "vinduesgrossisten", {
        get: function () {
            var _this = this;
            var self = this;
            function tasks(date) {
                return this.makeRequest(this.generateURL("/vinduesgrossisten/tasks?date=" + date));
            }
            return {
                login: function (accessKey) {
                    return _this.makeRequest(_this.generateURL("/vinduesgrossisten/engineer-login"), "post", { access_key: accessKey });
                },
                tasks: function (date) {
                    return _this.makeRequest(_this.generateURL("/vinduesgrossisten/tasks?date=" + date));
                },
                taskUpdate: function (taskId, values) {
                    return _this.makeRequest(_this.generateURL("/vinduesgrossisten/tasks/" + taskId), "patch", values);
                },
                tasksUpdateStatus: function (taskId, statusId, note, delay) {
                    return _this.makeRequest(_this.generateURL("/vinduesgrossisten/tasks/" + taskId + "/status"), "put", { vin_status_id: statusId, note: note, delay: delay });
                },
                statuses: function () {
                    return _this.makeRequest(_this.generateURL("/vinduesgrossisten/statuses"));
                },
                taskCreateDocumentations: function (taskId, data) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations"), 'post', data);
                },
                taskUpdateDocumentations: function (taskId, documentationId, values) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations/" + documentationId), 'patch', values);
                },
                taskDocumentationImage: function (taskId, documentationId, config) {
                    var params = {};
                    if (config.hasOwnProperty('width')) {
                        params.w = config.width;
                    }
                    if (config.hasOwnProperty('height')) {
                        params.h = config.height;
                    }
                    if (config.hasOwnProperty('crop')) {
                        params.crop = config.crop;
                    }
                    var url = self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations/" + documentationId + "/image", true, params);
                    return self.makeRequest(url);
                },
                taskDeleteDocumentation: function (taskId, documentationId) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations/" + documentationId), "delete");
                },
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppCMSClient.prototype, "cphtrucking", {
        get: function () {
            var _this = this;
            var self = this;
            function tasks(date) {
                return this.makeRequest(this.generateURL("/cphtrucking/tasks?date=" + date));
            }
            return {
                login: function (accessKey) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/engineer-login"), "post", { access_key: accessKey });
                },
                customers: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/customers"));
                },
                tasks: function (date) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks?date=" + date));
                },
                taskUpdate: function (taskId, values) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks/" + taskId), "patch", values);
                },
                tasksUpdateStatus: function (taskId, statusId, note, delay) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks/" + taskId + "/status"), "put", { ct_status_id: statusId, note: note, delay: delay });
                },
                statuses: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/statuses"));
                },
                taskCreateDocumentations: function (taskId, data) {
                    return self.makeRequest(self.generateURL("/cphtrucking/tasks/" + taskId + "/documentations"), 'post', data);
                },
                taskUpdateDocumentations: function (taskId, documentationId, values) {
                    return self.makeRequest(self.generateURL("/cphtrucking/tasks/" + taskId + "/documentations/" + documentationId), 'patch', values);
                },
                taskDocumentationImage: function (taskId, documentationId, config) {
                    var params = {};
                    if (config.hasOwnProperty('width')) {
                        params.w = config.width;
                    }
                    if (config.hasOwnProperty('height')) {
                        params.h = config.height;
                    }
                    if (config.hasOwnProperty('crop')) {
                        params.crop = config.crop;
                    }
                    var url = self.generateURL("/cphtrucking/tasks/" + taskId + "/documentations/" + documentationId + "/image", true, params);
                    return self.makeRequest(url);
                },
                taskDeleteDocumentation: function (taskId, documentationId) {
                    return self.makeRequest(self.generateURL("/cphtrucking/tasks/" + taskId + "/documentations/" + documentationId), "delete");
                },
                taskStart: function (taskId) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks/" + taskId + "/start"), "patch");
                },
                taskEnd: function (taskId) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks/" + taskId + "/end"), "patch");
                },
                addresses: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/addresses"));
                },
                contactPersons: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/contact_persons"));
                },
                workshiftCurrent: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/workshift"));
                },
                workshiftIndex: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/workshifts"));
                },
                workshiftStart: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/start_workshift"), "patch");
                },
                workshiftEnd: function () {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/end_workshift"), "patch");
                },
                taskCreate: function (task) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks"), "post", { ct_task: {
                            task_date: task.task_date,
                            ct_customer_id: task.ct_customer.id,
                            task_name: task.task_name,
                            ct_status_id: task.status_note.ct_status.id,
                            ct_status_note: task.status_note.note,
                            ct_order_type_id: null,
                            estimate: task.estimate,
                            description: task.description,
                            note: task.note,
                            task_id: task.task_id,
                            ct_contact_person_id: task.contact_person.id,
                            pickup_address_id: task.pickup_address.id,
                            deliver_address_id: task.deliver_address.id
                        } });
                },
                taskWorklogs: function (taskId) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks/" + taskId + "/work_logs"));
                },
                taskWorklogsSet: function (taskId, status) {
                    return _this.makeRequest(_this.generateURL("/cphtrucking/tasks/" + taskId + "/work_logs/" + status), 'post');
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return AppCMSClient;
}());
exports.AppCMSClient = AppCMSClient;
//# sourceMappingURL=AppCMSClient.js.map
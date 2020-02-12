"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var AppCMSClient = /** @class */ (function () {
    function AppCMSClient(clientConfig) {
        var _this = this;
        this.clientConfig = clientConfig;
        this.baseURL = "https://www.appcms.dk";
        this.accessToken = '';
        this.setAccessToken = function (token) {
            _this.accessToken = token;
        };
        this.generateURL = function (endpoint, withAPIKey) {
            if (withAPIKey === void 0) { withAPIKey = true; }
            var url = "" + _this.baseURL;
            if (withAPIKey) {
                url += "/api/" + _this.clientConfig.apiKey;
            }
            if (endpoint.charAt(0) !== "/") {
                return url + "/" + endpoint;
            }
            return "" + url + endpoint;
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
        if (clientConfig.baseUrl) {
            this.baseURL = clientConfig.baseUrl;
        }
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
                fetch: function (locale) {
                    return _this.makeRequest(_this.generateURL("/content/" + locale));
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
                tasksUpdateStatus: function (taskId, statusId, note) {
                    return _this.makeRequest(_this.generateURL("/vinduesgrossisten/tasks/" + taskId + "/status"), "put", { vin_status_id: statusId, note: note });
                },
                statuses: function () {
                    return _this.makeRequest(_this.generateURL("/vinduesgrossisten/statuses"));
                },
                notes: function (taskId) {
                    var baseUrl = _this.generateURL("/vinduesgrossisten/tasks/" + taskId + "/notes");
                    var generateURL = function (endpoint) {
                        return "" + baseUrl + endpoint;
                    };
                    return {
                        get: function () {
                        }
                    };
                },
                taskCreateDocumentations: function (taskId, data) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations"), 'post', data);
                },
                taskUpdateDocumentations: function (taskId, values) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations"), 'patch', values);
                },
                taskDeleteDocumentation: function (taskId, documentationId) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations/" + documentationId), "delete");
                },
                /**
                 *
                 * @param taskId
                 * @param documentationId
                 * @param image There is only one field in the object images[image] = file
                 */
                taskAddDocumentationImage: function (taskId, documentationId, image) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations/" + documentationId + "/images"), "post", image);
                },
                taskDeleteDocumentationImage: function (taskId, documentationId, imageId) {
                    return self.makeRequest(self.generateURL("/vinduesgrossisten/tasks/" + taskId + "/documentations/" + documentationId + "/images/" + imageId), "delete");
                },
            };
        },
        enumerable: true,
        configurable: true
    });
    return AppCMSClient;
}());
exports.AppCMSClient = AppCMSClient;
//# sourceMappingURL=AppCMSClient.js.map
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var ChatUtil = /** @class */ (function () {
    function ChatUtil() {
        this.bagOfWords = new Map([
            ["hello", 1],
            ["hi", 2],
            ["hey", 3],
            ["greetings", 4],
            ["namaste", 5],
            ["नमस्ते", 6],
            ["good", 7],
            ["morning", 8],
            ["evening", 9],
            ["afternoon", 32],
            ["hola", 10],
            ["projects", 11],
            ["show", 12],
            ["me", 13],
            ["your", 14],
            ["what", 15],
            ["have", 16],
            ["you", 17],
            ["worked", 18],
            ["on", 19],
            ["experience", 20],
            ["where", 21],
            ["contact", 22],
            ["get", 23],
            ["in", 24],
            ["touch", 25],
            ["about", 26],
            ["info", 27],
            ["who", 28],
            ["are", 29],
            ["can", 30],
            ["do", 31],
            ["i", 33],
            ["how", 34],
            ["about", 35],
            ["yourself", 36],
            ["give", 37],
        ]);
        this.operations = ["GREET", "ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"];
        this.knownOperations = [
            ["hello", "hi", "hey", "greetings", "namaste", "नमस्ते", "good morning", "good afternoon", "good evening", "hola"],
            ["what can you do", "about", "info", "tell me about yourself", "yourself"],
            ["projects", "show me your projects", "what projects have you worked on", "give me info about your projects"],
            ["experience", "what experience do you have", "where have you worked", "give me info about your experience"],
            ["contact", "how can i contact you", "get in touch", "give contact"]
        ];
        // this.knownOperations = [
        //     [
        //         [ 1 ],    [ 2 ],
        //         [ 3 ],    [ 4 ],
        //         [ 5 ],    [ 6 ],
        //         [ 7, 8 ], [ 7, 32 ],
        //         [ 7, 9 ], [ 10 ]
        //     ],
        //     [ [ 28, 29, 17 ], [ 15, 30, 17, 31 ], [ 26 ], [ 27 ] ],
        //     [ [ 11 ], [ 12, 13, 14, 11 ], [ 15, 11, 16, 17, 18, 19 ] ],
        //     [ [ 20 ], [ 15, 20, 31, 17, 16 ], [ 21, 16, 17, 18 ] ],
        //     [ [ 22 ], [ 34, 30, 33, 22, 17 ], [ 23, 24, 25 ] ]
        // ];
    }
    ChatUtil.prototype.vectorizeMessage = function (message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var vector = [];
            for (var _i = 0, _a = message.split(" "); _i < _a.length; _i++) {
                var word = _a[_i];
                // console.log("Sentence : " + message + " Word: " + word);
                if (_this.bagOfWords.has(word)) {
                    vector.push(_this.bagOfWords.get(word));
                }
                else {
                    vector.push(-1);
                }
            }
            resolve(vector);
        });
    };
    ChatUtil.prototype.similaritySearch = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var bestScore = -1;
            var bestOpIndex = -1;
            var MIN_OVERLAP = 1; // Require at least 1 keyword match
            function overlapScore(a, b) {
                // Count how many elements in a are present in b (excluding -1)
                return a.filter(function (x) { return x !== -1 && b.includes(x); }).length;
            }
            // this.knownOperations.forEach((operationVectors, opIndex) => {
            //     operationVectors.forEach(opVector => {
            //         const overlap = overlapScore(query, opVector);
            //         // Only update if strictly greater, so first best match is kept
            //         if (overlap > bestScore) {
            //             bestScore = overlap;
            //             bestOpIndex = opIndex;
            //         }
            //     });
            // });
            if (bestScore >= MIN_OVERLAP) {
                resolve(_this.operations[bestOpIndex]);
            }
            else {
                reject("I am not capable of understanding this message yet. Please try asking in a different way!");
            }
        });
    };
    return ChatUtil;
}());
exports.default = ChatUtil;
var chatUtil = new ChatUtil();
var sampleMessages = [];
chatUtil.knownOperations.forEach(function (operation, index) {
    var tmp = [];
    operation.forEach(function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var vector;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chatUtil.vectorizeMessage(message)];
                case 1:
                    vector = _a.sent();
                    console.log("Message: " + message + " Vector: " + vector);
                    tmp.push(vector);
                    return [2 /*return*/];
            }
        });
    }); });
    sampleMessages.push(tmp);
});
setTimeout(function () {
    console.log(sampleMessages);
}, 10000);

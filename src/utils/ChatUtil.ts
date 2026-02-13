export default class ChatUtil {
    bagOfWords: Map<string, number>;
    knownOperations: number[][][];
    operations: string[];
    shortCutKeys: Map<string, string>;
    GREET = "GREET";
    ABOUT = "ABOUT";
    SKILLS = "SKILLS";
    PROJECTS = "PROJECTS";
    EXPERIENCE = "EXPERIENCE";
    CONTACT = "CONTACT";
    TRAINED = "TRAINED";
    RESUME = "RESUME";
    greetBack = ["Hello! 😀", "Hi there! 👋", "Hey! How can I assist you today?"];

    constructor() {
        this.bagOfWords = new Map<string, number>([
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
            ["trained", 38],
            ["skills", 39],
            ["project", 40],
            ["resume", 41],
        ]);
        this.operations = [this.GREET, this.ABOUT, this.SKILLS, this.PROJECTS, this.EXPERIENCE, this.CONTACT, this.TRAINED, this.RESUME];
        // this.knownOperations = [
        //     ["hello", "hi", "hey", "greetings", "namaste", "नमस्ते", "good morning", "good afternoon", "good evening", "hola", "how are you"],
        //     ["what can you do", "about", "info", "tell me about yourself", "yourself"],
        //     ["skills", "what skills do you have", "give me info about your skills"],
        //     ["projects", "show me your projects", "what projects have you worked on", "give me info about your projects"],
        //     ["experience", "what experience do you have", "where have you worked", "give me info about your experience"],
        //     ["contact", "how can i contact you", "get in touch", "give contact"]
        //     ["trained", "how are you trained"]
        // ];
        this.knownOperations = [
            [
                [ 1 ],    [ 2 ],
                [ 3 ],    [ 4 ],
                [ 5 ],    [ 6 ],
                [ 7, 8 ], [ 7, 32 ],
                [ 7, 9 ], [ 10 ], [ 34, 29, 17]
            ],
            [ [ 15, 30, 17, 31 ], [ 35 ], [ 27 ], [ -1, 13, 35, 36 ], [ 36 ] ],
            [ [ 15, 39, 31, 17, 16 ], [ 39 ], [ 37, 13, 27, 35, 14, 39 ] ],
            [
                [ 11 ],
                [ 12, 13, 14, 11 ],
                [ 12, 13, 14, 40 ],
                [ 15, 11, 16, 17, 18, 19 ],
                [ 15, 40, 16, 17, 18, 19 ],
                [ 37, 13, 27, 35, 14, 11 ],
                [ 40 ]
            ],
            [
                [ 20 ],
                [ 15, 20, 31, 17, 16 ],
                [ 21, 16, 17, 18 ],
                [ 37, 13, 27, 35, 14, 20 ],
                [ 37, -1, 14, 20 ]
            ],
            [ [ 22 ], [ 34, 30, 33, 22, 17 ], [ 23, 24, 25 ], [ 37, 22 ], [37, 13, 14, 22]],
            [ [ 38 ], [ 34, 29, 17, 38 ] ],
            [ [ 41 ], [ 37, 13, 41 ], [ 37, 14, 41 ], [ 13, 41] ]
        ];
        this.shortCutKeys = new Map<string, string>([
            [this.ABOUT, "Tell me about yourself"],
            [this.SKILLS, "Give me your skills"],
            [this.PROJECTS, "Show me your projects"],
            [this.EXPERIENCE, "Tell me about your experience"],
            [this.CONTACT, "How can I contact you"],
            [this.TRAINED, "Tell me about how you were trained"],
            [this.RESUME, "Get me your resume"]
        ]);
    }

    vectorizeMessage(message: String): Promise<number[]> {
        return new Promise((resolve, reject) => {
            let vector: number[] = [];
            for(let word of message.split(" ")) {
                // console.log("Sentence : " + message + " Word: " + word);
                if(this.bagOfWords.has(word)) {
                    vector.push(this.bagOfWords.get(word)!);
                } else {
                    vector.push(-1);
                }
            }
            resolve(vector);
        });
    }

    similaritySearch(query: number[]): Promise<string> {
        return new Promise((resolve, reject) => {
            let bestScore = -1;
            let bestOpIndex = -1;
            const MIN_OVERLAP = 1; // Require at least 1 keyword match

            function overlapScore(a: number[], b: number[]): number {
                // Count how many elements in a are present in b (excluding -1)
                let t = a.filter(x => x !== -1 && b.includes(x));
                if(t.length < a.length / 2) return -1;
                return t.length;
            }

            this.knownOperations.forEach((operationVectors, opIndex) => {
                operationVectors.forEach(opVector => {
                    const overlap = overlapScore(query, opVector);
                    // Only update if strictly greater, so first best match is kept
                    if (overlap > bestScore) {
                        bestScore = overlap;
                        bestOpIndex = opIndex;
                    }
                });
            });

            if (bestScore >= MIN_OVERLAP) {
                resolve(this.operations[bestOpIndex]);
            } else {
                reject("I am not capable of understanding this message yet. Please try asking in a different way!");
            }
        });
    }
}

// const chatUtil = new ChatUtil();
// let sampleMessages: number[][][] = [];
// chatUtil.knownOperations.forEach((operation, index) => {
//     let tmp: number[][] = [];
//     operation.forEach(async (message) => {
//         let vector = await chatUtil.vectorizeMessage(message);
//         console.log("Message: " + message + " Vector: " + vector);
//         tmp.push(vector);
//     });
//     sampleMessages.push(tmp);
// });
// setTimeout(() => {
//     console.log(sampleMessages);
// }, 10000);
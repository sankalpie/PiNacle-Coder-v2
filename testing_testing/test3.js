// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration(
//     {
//         organization: "org-FO9NR50GRY66fesJiPD6fuu6",
//         apiKey: sk - T4K3gTVwJc7Sk7QjDnmkT3BlbkFJccusTSYwiTYmwkwOVXOu,
//     }
// );
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


// curl https://api.openai.com/v1/chat/completions \
// -H "Content-Type: application/json" \
// -H "Authorization: Bearer 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" \
// -d '{
// "model": "text-babbage-001",
//     "messages": [{ "role": "user", "content": "Say this is a test!" }],
//         "temperature": 0.7
//    }'


//    curl https://api.openai.com/v1/models \
//    -H "Authorization: Bearer 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"


//    curl https://api.openai.com/v1/models \
//   -H "Authorization: Bearer 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" \
//   -H "OpenAI-Organization: org-FO9NR50GRY66fesJiPD6fuu6"

















//it WORKS

/* 

curl -X POST \
     -H 'api-key: quickstart-QUdJIGlzIGNvbWluZy4uLi4L' \
     -d 'text=convert 1kg to grams' \
     https://api.deepai.org/api/text-generator



*/









//this works too



// Example directly sending a text string:

const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML


deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

(async function() {
    var resp = await deepai.callStandardApi("text-generator", {
            text: "convert 1 mile into km",
    });
    console.log(resp);
})()
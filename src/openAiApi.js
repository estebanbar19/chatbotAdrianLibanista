import axios from "axios";

const POST_COMPLETITION_URL = "https://api.openai.com/v1/chat/completions";

export async function initChatbot(messages){

    let body = {
        messages: messages,
        model: "gpt-3.5-turbo",
    }

    let responseMessage = {
        role: null,
        content: null,
    };

    await axios.post(POST_COMPLETITION_URL, body, {
        headers: {
            Authorization: "Bearer "+process.env.REACT_APP_OPEN_AI_API_KEY
        }
    })
        .then((response) => {
            responseMessage.content = response.data.choices[0].message.content;
            responseMessage.role = response.data.choices[0].message.role;
        })
        .catch((error) => {
            console.log(error);
        });

    return responseMessage;
}

export async function sendNewMessage(messages, newMessage){

    let body = {
        messages: [...messages, {
            role: "user",
            content: newMessage,
        }],
        model: "gpt-3.5-turbo",
    }

    let responseMessage = {
        role: null,
        content: null,
    };

    await axios.post(POST_COMPLETITION_URL, body, {
        headers: {
            Authorization: "Bearer "+process.env.REACT_APP_OPEN_AI_API_KEY
        }
    })
        .then((response) => {
            responseMessage.content = response.data.choices[0].message.content;
            responseMessage.role = response.data.choices[0].message.role;
        })
        .catch((error) => {
            console.log(error);
        });

    return responseMessage;
}
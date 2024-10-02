import axios from "axios";

const API_KEY="sk-Ac7PH2fOqjTcA5raxcqTuxNTGrrfCtThY7XZ6u964QT3BlbkFJl-r-jEU2asyJ9-a9-UqCQvieq8mF-Swcypi8XisBQA";
// const API_KEY="";
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
            Authorization: "Bearer "+API_KEY
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
            Authorization: "Bearer "+API_KEY
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
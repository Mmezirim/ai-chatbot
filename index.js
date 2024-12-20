import { GoogleGenerativeAI } from "@google/generative-ai";
import express, { response } from "express";
import { config } from "dotenv";
import cors from "cors";
import axios from "axios"
import readlineSync from "readline-sync";
config();

const app = express();
app.use(express.json());
app.use(cors());


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const chatHistory = [];

app.post('/chat', async (req, res) => {
    const message = req.body.message;
    chatHistory.push({ role: 'user', content: message });
    
    try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const payload = {
            contents: [{
                parts: [{ text: message }]
            }]
        };

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const candidates = response.data?.candidates;
        if (candidates && candidates.length > 0) {
            // Extract the plain text from the bot response
            const botResponseText = candidates[0]?.content.parts[0]?.text || "No answer provided";

            // Push the bot response to chat history
            chatHistory.push({ role: 'bot', content: botResponseText });

            // Send the plain text bot response
            res.status(200).send(botResponseText.trim()); // Ensure the response is plain text

            console.log("user:", message);
            console.log("bot:", botResponseText);
        } else {
            console.log("No candidates found in the response.");
            res.status(200).send("Sorry, I don't have an answer for that.");
        }
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);

        // Send error response as plain text
        res.status(500).send("Error processing the request. Please try again later.");
    }
});


app.listen('8080', (req, res) => {
    console.log('chat bot server running on port 8080')
})

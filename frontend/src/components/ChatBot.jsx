import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const userMessage = { sender: "user", text: trimmedInput };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/api/chatbot", {
                message: trimmedInput,
            }, {
                timeout: 10000
            });

            const botReply = {
                sender: "bot",
                text: response.data || "Je n'ai pas pu comprendre votre demande.",
            };
            setMessages((prev) => [...prev, botReply]);
        } catch (error) {
            console.error("Erreur lors de l'appel au chatbot :", error);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Désolé, le service est temporairement indisponible.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !loading) {
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h3>Assistant Virtuel SoukConnect</h3>
            </div>
            <div className="chatbot-body">
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    {loading && (
                        <div className="message bot">
                            <p>Chargement...</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="chatbot-footer">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Posez une question..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
            <style jsx>{`
                .chatbot-container {
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                    background-color: #f4f4f4;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    height: 500px;
                }

                .chatbot-header {
                    background-color: #9a1f1a;
                    color: white;
                    text-align: center;
                    padding: 1rem;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }

                .chatbot-body {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    background-color: #ffffff;
                    border-bottom: 1px solid #ccc;
                }

                .messages-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    min-height: 100%;
                }

                .message {
                    padding: 0.8rem;
                    border-radius: 8px;
                    max-width: 70%;
                    word-wrap: break-word;
                }

                .message.user {
                    background-color: #e1e1e1;
                    align-self: flex-end;
                }

                .message.bot {
                    background-color: #d6e7f3;
                    align-self: flex-start;
                }

                .chatbot-footer {
                    display: flex;
                    padding: 0.8rem 1rem;
                    background-color: #fff;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    align-items: center;
                }

                .chatbot-footer input {
                    flex-grow: 1;
                    padding: 0.6rem 1rem;
                    border-radius: 25px;
                    border: 1px solid #ccc;
                    margin-right: 10px;
                    outline: none;
                }

                .chatbot-footer input:focus {
                    border-color: #9a1f1a;
                }

                .chatbot-footer button {
                    background-color: #9a1f1a;
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chatbot-footer button:hover {
                    background-color: #e03d3d;
                }

                .chatbot-footer button:disabled {
                    background-color: #aaa;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default ChatBot;

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Bonjour ! Comment puis-je vous aider ? Posez-moi des questions sur nos produits." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [backendOnline, setBackendOnline] = useState(true);
    const messagesEndRef = useRef(null);
    const BACKEND_URL = "http://localhost:8080";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Check if the backend is available
    useEffect(() => {
        const checkBackendStatus = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/chatbot/test`, { timeout: 5000 });
                if (response.status === 200) {
                    setBackendOnline(true);
                }
            } catch (error) {
                console.warn("Backend not reachable:", error);
                setBackendOnline(false);
            }
        };

        checkBackendStatus();
    }, []);

    // Simple client-side response when backend is unavailable
    const getLocalResponse = (userQuery) => {
        const query = userQuery.toLowerCase();

        if (query.includes("bonjour") || query.includes("salut") || query.includes("hello")) {
            return "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
        }

        if (query.includes("merci")) {
            return "De rien ! C'est un plaisir de vous aider.";
        }

        if (query.includes("produits") || query.includes("vendez") || query.includes("offrez")) {
            return "Nous offrons divers produits marocains traditionnels. Normalement, je pourrais vous donner plus de détails, mais notre système est temporairement en maintenance.";
        }

        return "Je suis désolé, le service est actuellement en maintenance. Veuillez réessayer plus tard.";
    };

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const userMessage = { sender: "user", text: trimmedInput };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            if (!backendOnline) {
                // Simulate API call if backend is down
                setTimeout(() => {
                    const fallbackResponse = getLocalResponse(trimmedInput);
                    const botReply = { sender: "bot", text: fallbackResponse };
                    setMessages((prev) => [...prev, botReply]);
                    setLoading(false);
                }, 1000);
                return;
            }

            // Call the actual backend API
            const response = await axios.post(`${BACKEND_URL}/api/chatbot`, {
                message: trimmedInput,
            }, {
                timeout: 15000  // Increased timeout for AI processing
            });

            const botReply = {
                sender: "bot",
                text: response.data || "Je n'ai pas pu comprendre votre demande."
            };
            setMessages((prev) => [...prev, botReply]);
            setBackendOnline(true);
        } catch (error) {
            console.error("Erreur lors de l'appel au chatbot :", error);

            // Set backend status to offline
            setBackendOnline(false);

            // Get a local fallback response
            const fallbackResponse = "Désolé, le service est temporairement indisponible. Vous pouvez essayer une question simple.";

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: fallbackResponse
                }
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
                {!backendOnline && (
                    <div className="status-indicator offline">
                        Service limité - Mode hors ligne
                    </div>
                )}
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
            <style>{`
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
                    position: relative;
                }

                .status-indicator {
                    font-size: 0.75rem;
                    padding: 2px 8px;
                    border-radius: 10px;
                    position: absolute;
                    bottom: 5px;
                    right: 10px;
                }

                .status-indicator.offline {
                    background-color: #ffcccc;
                    color: #990000;
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
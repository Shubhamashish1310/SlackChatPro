import { BotIcon, SendIcon, SparklesIcon,XIcon } from 'lucide-react';
import { useEffect,useRef, useState } from 'react';

import { useAuth } from '@/hooks/context/useAuth';

const SYSTEM_CONTEXT = `You are an AI assistant for SlackChatPro, a Slack-like team collaboration app. 
You help users with: sending messages, creating channels, managing workspaces, 
understanding features, and general productivity tips. Be concise and friendly.`;

export const AIChatDrawer = ({ isOpen, onClose }) => {
    const { auth } = useAuth();
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '👋 Hi! I\'m your AI assistant for SlackChatPro. Ask me anything about the app or how to use it!'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input.trim() };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(
                'https://slackchatpro.onrender.com/api/ai/analyze-message',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth?.token}`
                    },
                    body: JSON.stringify({
                        messages: updatedMessages,
                        systemContext: SYSTEM_CONTEXT
                    })
                }
            );

            const data = await response.json();
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: data.reply || 'Sorry, I could not respond.' }
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: error.message ? `Error: ${error.message}` : 'We are on free version Please wait for Render to start.' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/30"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-[380px] bg-white z-50 flex flex-col shadow-2xl">
                
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#3f0f3f] text-white">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-1.5 rounded-full">
                            <SparklesIcon className="size-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">AI Assistant</p>
                            <p className="text-xs text-white/60">Powered by Gemini</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:bg-white/20 p-1.5 rounded-md transition-colors"
                    >
                        <XIcon className="size-4" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            <div className={`size-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold
                                ${msg.role === 'assistant' ? 'bg-[#3f0f3f]' : 'bg-sky-500'}`}
                            >
                                {msg.role === 'assistant' ? <BotIcon className="size-4" /> : auth?.user?.username?.charAt(0).toUpperCase()}
                            </div>

                            {/* Bubble */}
                            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed
                                ${msg.role === 'assistant'
                                    ? 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
                                    : 'bg-[#3f0f3f] text-white rounded-tr-none'
                                }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                        <div className="flex gap-2 items-center">
                            <div className="size-7 rounded-full bg-[#3f0f3f] flex items-center justify-center">
                                <BotIcon className="size-4 text-white" />
                            </div>
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                <div className="flex gap-1">
                                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t bg-white flex gap-2 items-end">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        rows={1}
                        className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f0f3f]/30 max-h-32"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="bg-[#3f0f3f] hover:bg-[#5c1a5c] disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors"
                    >
                        <SendIcon className="size-4" />
                    </button>
                </div>
            </div>
        </>
    );
};
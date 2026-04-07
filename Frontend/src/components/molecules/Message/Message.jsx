import { useState } from 'react';
import { MessageImageThumbnail } from '@/components/atoms/MessageImageThumbnail/MessageImageThumbnail';
import { MessageRenderer } from '@/components/atoms/MessageRenderer/MessageRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/context/useAuth';


export const Message = ({
    authorImage,
    authorName,
    createdAt,
    body,
    image,
    messageId
}) => {
    const [showAI, setShowAI] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const { auth } = useAuth();

    const analyzeMessage = async () => {
        setAiLoading(true);

        try {
            const response = await fetch('https://slackchatpro.onrender.com/api/ai/analyze-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token}`
                },
                body: JSON.stringify({ messageContent: body })
            });

            const data = await response.json();
            setAiResponse(data.analysis || 'No analysis available');
        } catch (error) {
            console.error('AI Error:', error);
            setAiResponse('Error: ' + error.message);
        } finally {
            setAiLoading(false);
        }
    };

    const handleAIToggle = () => {
        const opening = !showAI;
        setShowAI(opening);
        // Fetch if opening and no response yet, or if previous attempt errored
        if (opening && (!aiResponse || aiResponse.startsWith('Error:'))) {
            analyzeMessage();
        }
    };

    return (
        <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
            <div className="flex items-center gap-2">
                <button>
                    <Avatar>
                        <AvatarImage className="rounded-md" src={authorImage} />
                        <AvatarFallback className="rounded-md bg-sky-500 text-white text-sm">
                            {authorName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </button>

                <div className='flex flex-col w-full overflow-hidden'>
                    <div className='text-xs'>
                        <button className='font-bold text-primary hover:underline'>
                            {authorName}
                        </button>
                        <span>&nbsp;&nbsp;</span>
                        <button className='text-xs text-muted-foreground hover:underline'>
                            {createdAt || 'Just now'}
                        </button>
                    </div>

                    <MessageRenderer value={body} />
                    {image && <MessageImageThumbnail url={image} />}
                </div>

                {/* AI BUTTON - Shows on hover */}
                <button
                    onClick={handleAIToggle}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs whitespace-nowrap"
                >
                    {aiLoading ? '⏳' : '🤖'}
                </button>
            </div>

            {/* AI RESPONSE - Shows when clicked */}
            {showAI && (
                <div className="ml-10 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                            <h4 className="text-xs font-semibold text-blue-900 mb-1">AI Analysis:</h4>
                            <p className="text-xs text-blue-800 leading-relaxed">
                                {aiLoading ? 'Analyzing...' : aiResponse}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAI(false)}
                            className="text-blue-400 hover:text-blue-600 text-xs mt-1"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
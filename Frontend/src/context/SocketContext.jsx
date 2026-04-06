import { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import { useChannelMessages } from '@/hooks/context/useChannelMessages';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

    const [currentChannel, setCurrentChannel] = useState(null);
    const { setMessageList } = useChannelMessages();

    // ✅ Fix 2: create socket only ONCE using useRef
    const socketRef = useRef(null);
    if (!socketRef.current) {
        socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL);
    }
    const socket = socketRef.current;

    useEffect(() => {
        // ✅ Fix 3: register listener once, clean up on unmount
        socket.on('NewMessageReceived', (data) => {
            console.log('New message received', data);
            // ✅ Fix 1: functional updater — always has latest messageList
            setMessageList(prev => [...prev, data]);
        });

        return () => {
            socket.off('NewMessageReceived'); // cleanup on unmount
        };
    }, [socket, setMessageList]);

    async function joinChannel(channelId) {
        socket.emit('JoinChannel', { channelId }, (data) => {
            console.log('Successfully joined the channel', data);
            setCurrentChannel(data?.data);
        });
    }

    return (
        <SocketContext.Provider value={{ socket, joinChannel, currentChannel }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
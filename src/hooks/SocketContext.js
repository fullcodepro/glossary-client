import React, { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
export const SocketContext = createContext();

// const socket = useMemo(() => io.connect(serverPath, {
//     transports: ['websocket'],
// }), [serverPath]);

export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket('http://localhost:5000/');

    return (
        <SocketContext.Provider value={{
            socket,
            online
        }}>
            {children}
        </SocketContext.Provider>
    )
}
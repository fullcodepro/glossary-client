import React, { createContext } from "react";
import { URL } from "../configs/envs";
import { useSocket } from "../hooks/useSocket";
export const SocketContext = createContext();

// const socket = useMemo(() => io.connect(serverPath, {
//     transports: ['websocket'],
// }), [serverPath]);

export const SocketProvider = ({ children }) => {

    const { socket, online } = useSocket(URL);

    return (
        <SocketContext.Provider value={{
            socket,
            online
        }}>
            {children}
        </SocketContext.Provider>
    )
}
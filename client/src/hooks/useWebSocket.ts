import React, { useEffect, useState } from 'react'

export default function useWebSocket(url: string) {
    const [websocket, setwebsocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket(url)
        setwebsocket(ws)

        return () => {
            ws.close();
        }
    }, [url]);

    return (
        websocket
    )
}

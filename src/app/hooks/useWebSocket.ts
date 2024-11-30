import { Transaction } from "@/types/transaction";
import { useEffect, useRef, useState } from "react";

const useWebSocket = () => {
  const [messages, setMessages] = useState<Transaction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Event>();

  const wsRef = useRef<WebSocket>();

  const open = (url: string) => {
    if (wsRef.current && wsRef.current.readyState !== wsRef.current.CLOSED) {
      wsRef.current.close(1000, "Closing previews instance");
    }

    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setIsLoading(true);
      setIsOpen(true);
    };

    wsRef.current.onmessage = (event) => {
      setIsLoading(false);

      const data: Transaction = JSON.parse(event.data);

      setMessages((prevMessages) => [data, ...prevMessages]);
    };

    wsRef.current.onclose = () => {
      wsRef.current?.close(1000, "Closed by the server");

      setIsOpen(false);
      setIsLoading(false);
    };

    wsRef.current.onerror = (event) => {
      setError(event);
      setIsLoading(false);
    };
  };

  useEffect(() => {
    return () => {
      wsRef.current?.close(1000, "Unmounting component");
    };
  }, []);

  return {
    open,
    ws: wsRef.current,
    messages,
    isOpen,
    isLoading,
    error,
    setMessages,
  };
};

export default useWebSocket;

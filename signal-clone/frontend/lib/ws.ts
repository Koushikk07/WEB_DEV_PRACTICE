// lib/ws.ts
// This file manages the WebSocket connection to the backend.
// It handles connecting, disconnecting, sending and receiving messages.

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";

type MessageHandler = (data: Record<string, unknown>) => void;

class WebSocketManager {
  private socket:   WebSocket | null = null;
  private userId:   string | null    = null;
  private handlers: Map<string, MessageHandler[]> = new Map();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isConnecting = false;

  // ── Connect to WebSocket server ──
  connect(userId: string) {
    // Don't connect twice
    if (this.socket?.readyState === WebSocket.OPEN) return;
    if (this.isConnecting) return;

    this.userId      = userId;
    this.isConnecting = true;

    const url    = `${WS_URL}/ws/${userId}`;
    this.socket  = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.isConnecting = false;

      // Tell server we are online
      this.send({ type: "online", payload: {} });
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Route message to the right handlers
        this.dispatch(data.type, data.payload);
      } catch (e) {
        console.error("WebSocket message parse error:", e);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected. Reconnecting in 3s...");
      this.isConnecting = false;
      this.socket       = null;

      // Auto reconnect after 3 seconds
      this.reconnectTimer = setTimeout(() => {
        if (this.userId) {
          this.connect(this.userId);
        }
      }, 3000);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.isConnecting = false;
    };
  }

  // ── Disconnect from WebSocket server ──
  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.userId = null;
    this.handlers.clear();
  }

  // ── Send a message to the server ──
  send(message: { type: string; payload: Record<string, unknown> }) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected. Message not sent:", message);
    }
  }

  // ── Join a conversation room ──
  joinConversation(conversationId: string) {
    this.send({
      type:    "join",
      payload: { conversation_id: conversationId },
    });
  }

  // ── Send a chat message ──
  sendMessage(conversationId: string, content: string, replyToId?: string) {
    this.send({
      type: "message",
      payload: {
        conversation_id: conversationId,
        content,
        reply_to_id: replyToId || null,
      },
    });
  }

  // ── Send typing indicator ──
  sendTyping(conversationId: string, isTyping: boolean) {
    this.send({
      type: "typing",
      payload: {
        conversation_id: conversationId,
        is_typing:       isTyping,
      },
    });
  }

  // ── Send read receipt ──
  sendRead(conversationId: string) {
    this.send({
      type:    "read",
      payload: { conversation_id: conversationId },
    });
  }

  // ── Register a handler for a message type ──
  on(type: string, handler: MessageHandler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type)!.push(handler);
  }

  // ── Remove a handler ──
  off(type: string, handler: MessageHandler) {
    const list = this.handlers.get(type) || [];
    this.handlers.set(
      type,
      list.filter((h) => h !== handler)
    );
  }

  // ── Dispatch a message to all registered handlers ──
  private dispatch(type: string, payload: Record<string, unknown>) {
    const list = this.handlers.get(type) || [];
    list.forEach((handler) => handler(payload));
  }

  // ── Check if connected ──
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

// Single global instance shared across the entire app
const wsManager = new WebSocketManager();
export default wsManager;
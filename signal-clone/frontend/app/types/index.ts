export interface User {
  id:           string;
  phone_number: string;
  display_name: string;
  avatar_url:   string | null;
  about:        string | null;
  is_online:    boolean;
  last_seen:    string;
  created_at:   string;
}

export interface Participant {
  id:              string;
  user_id:         string;
  conversation_id: string;
  is_admin:        boolean;
  joined_at:       string;
  user:            User;
}

export interface Conversation {
  id:              string;
  type:            "direct" | "group";
  name:            string | null;
  avatar_url:      string | null;
  created_by:      string;
  created_at:      string;
  last_message_at: string;
  participants:    Participant[];
  last_message:    string | null;
  unread_count:    number;
}

export interface Message {
  id:              string;
  conversation_id: string;
  sender_id:       string;
  content:         string;
  status:          "sending" | "sent" | "delivered" | "read";
  is_deleted:      boolean;
  reply_to_id:     string | null;
  created_at:      string;
  updated_at:      string;
  sender:          User;
}

export interface TokenResponse {
  access_token: string;
  token_type:   string;
  user_id:      string;
  display_name: string;
  phone_number: string;
  avatar_url:   string | null;
}

export interface WSMessage {
  type:    string;
  payload: Record<string, unknown>;
}
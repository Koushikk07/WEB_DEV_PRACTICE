// components/chat/EmptyChat.tsx
// Shown when no conversation is selected.

export default function EmptyChat() {
  return (
    <div style={{
      flex:            1,
      display:         "flex",
      flexDirection:   "column",
      alignItems:      "center",
      justifyContent:  "center",
      backgroundColor: "#121212",
      color:           "#8a8a8a",
    }}>
      <div style={{
        width:           "120px",
        height:          "120px",
        backgroundColor: "#1e1e1e",
        borderRadius:    "50%",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        fontSize:        "48px",
        marginBottom:    "24px",
      }}>
        ✉
      </div>
      <h2 style={{
        color:        "#e9e9e9",
        fontSize:     "22px",
        fontWeight:   "600",
        marginBottom: "8px",
      }}>
        Signal Desktop
      </h2>
      <p style={{ fontSize: "14px", textAlign: "center", maxWidth: "300px" }}>
        Send and receive messages without keeping your phone nearby.
      </p>
      <p style={{
        marginTop:  "24px",
        fontSize:   "13px",
        color:      "#4a4a4a",
      }}>
        Click a conversation to start messaging
      </p>
    </div>
  );
}
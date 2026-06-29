// components/chat/TypingIndicator.tsx
// Shows animated dots when someone is typing.

export default function TypingIndicator() {
  return (
    <div style={{
      display:    "flex",
      alignItems: "flex-end",
      gap:        "8px",
      marginTop:  "8px",
    }}>
      <div style={{
        padding:         "10px 16px",
        backgroundColor: "#2a2a2a",
        borderRadius:    "18px 18px 18px 4px",
        display:         "flex",
        alignItems:      "center",
        gap:             "4px",
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width:            "6px",
              height:           "6px",
              borderRadius:     "50%",
              backgroundColor:  "#8a8a8a",
              animation:        `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
// app/page.tsx
// This is the login page — first thing users see.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router   = useRouter();
  const setAuth  = useAuthStore((s) => s.setAuth);

  const [tab,          setTab]          = useState<"login" | "register">("login");
  const [phone,        setPhone]        = useState("");
  const [password,     setPassword]     = useState("");
  const [displayName,  setDisplayName]  = useState("");
  const [otp,          setOtp]          = useState("");
  const [step,         setStep]         = useState<"form" | "otp">("form");
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");

  // ── Handle Login ──
  async function handleLogin() {
    if (!phone || !password) {
      setError("Please enter phone number and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await authAPI.login({ phone_number: phone, password });
      // Build a minimal user object from token response
      const user = {
        id:           data.user_id,
        phone_number: data.phone_number,
        display_name: data.display_name,
        avatar_url:   data.avatar_url,
        about:        "",
        is_online:    true,
        last_seen:    new Date().toISOString(),
        created_at:   new Date().toISOString(),
      };
      setAuth(user, data.access_token);
      router.push("/chat");
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail;
      setError(msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Handle Register Step 1 — send OTP ──
  async function handleSendOTP() {
    if (!phone || !password || !displayName) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await authAPI.verifyOTP({ phone_number: phone, otp: "1234" });
      setStep("otp");
    } catch {
      setStep("otp"); // proceed anyway since OTP is mocked
    } finally {
      setLoading(false);
    }
  }

  // ── Handle Register Step 2 — verify OTP and create account ──
  async function handleRegister() {
    if (otp !== "1234") {
      setError("Invalid OTP. Use 1234");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await authAPI.register({
        phone_number: phone,
        password,
        display_name: displayName,
      });
      const user = {
        id:           data.user_id,
        phone_number: data.phone_number,
        display_name: data.display_name,
        avatar_url:   data.avatar_url,
        about:        "",
        is_online:    true,
        last_seen:    new Date().toISOString(),
        created_at:   new Date().toISOString(),
      };
      setAuth(user, data.access_token);
      router.push("/chat");
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })
        ?.response?.data?.detail;
      setError(msg || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight:       "100vh",
      backgroundColor: "#121212",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontFamily:      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        width:           "100%",
        maxWidth:        "400px",
        padding:         "0 24px",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            width:           "80px",
            height:          "80px",
            backgroundColor: "#2c6bed",
            borderRadius:    "50%",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            margin:          "0 auto 16px",
            fontSize:        "36px",
          }}>
            ✉
          </div>
          <h1 style={{
            color:      "#ffffff",
            fontSize:   "28px",
            fontWeight: "600",
            margin:     "0 0 8px",
          }}>
            Signal
          </h1>
          <p style={{ color: "#8a8a8a", fontSize: "14px", margin: 0 }}>
            Say hello to privacy
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display:         "flex",
          backgroundColor: "#1e1e1e",
          borderRadius:    "12px",
          padding:         "4px",
          marginBottom:    "24px",
        }}>
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setStep("form"); setError(""); }}
              style={{
                flex:            1,
                padding:         "10px",
                borderRadius:    "10px",
                border:          "none",
                cursor:          "pointer",
                fontSize:        "14px",
                fontWeight:      "500",
                backgroundColor: tab === t ? "#2c6bed" : "transparent",
                color:           tab === t ? "#ffffff" : "#8a8a8a",
                transition:      "all 0.2s",
              }}
            >
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: "#2d1b1b",
            border:          "1px solid #5a2020",
            borderRadius:    "8px",
            padding:         "12px",
            marginBottom:    "16px",
            color:           "#ff6b6b",
            fontSize:        "14px",
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="tel"
              placeholder="Phone number (e.g. +1234567890)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={inputStyle}
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              style={btnStyle(loading)}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <p style={{
              textAlign:  "center",
              color:      "#8a8a8a",
              fontSize:   "12px",
              marginTop:  "8px",
            }}>
              Test account: +1234567890 / password123
            </p>
          </div>
        )}

        {/* Register Form */}
        {tab === "register" && step === "form" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              style={btnStyle(loading)}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* OTP Form */}
        {tab === "register" && step === "otp" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{
              color:        "#8a8a8a",
              fontSize:     "14px",
              textAlign:    "center",
              marginBottom: "8px",
            }}>
              Enter the OTP sent to {phone}
            </p>
            <input
              type="text"
              placeholder="Enter OTP (use 1234)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ ...inputStyle, textAlign: "center", fontSize: "24px", letterSpacing: "8px" }}
            />
            <button
              onClick={handleRegister}
              disabled={loading}
              style={btnStyle(loading)}
            >
              {loading ? "Creating account..." : "Verify & Create Account"}
            </button>
            <button
              onClick={() => setStep("form")}
              style={{
                ...btnStyle(false),
                backgroundColor: "transparent",
                border:          "1px solid #3a3a3a",
                color:           "#8a8a8a",
              }}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Shared styles ──
const inputStyle: React.CSSProperties = {
  width:           "100%",
  padding:         "14px 16px",
  backgroundColor: "#1e1e1e",
  border:          "1px solid #3a3a3a",
  borderRadius:    "10px",
  color:           "#e9e9e9",
  fontSize:        "15px",
  outline:         "none",
  boxSizing:       "border-box",
};

const btnStyle = (disabled: boolean): React.CSSProperties => ({
  width:           "100%",
  padding:         "14px",
  backgroundColor: disabled ? "#1a3a6b" : "#2c6bed",
  color:           "#ffffff",
  border:          "none",
  borderRadius:    "10px",
  fontSize:        "15px",
  fontWeight:      "600",
  cursor:          disabled ? "not-allowed" : "pointer",
  opacity:         disabled ? 0.7 : 1,
  transition:      "all 0.2s",
});
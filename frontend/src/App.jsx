import React from "react";
import AppRouter from "./routers/router";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const App = () => {
  const darkMode = useSelector((state) => state.theme.mode === "dark");

  return (
    <div className="antialiased selection:bg-cyan-500/30">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? "#111827" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
            border: darkMode
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.05)",
          },
        }}
      />
      <AppRouter />
    </div>
  );
};

export default App;
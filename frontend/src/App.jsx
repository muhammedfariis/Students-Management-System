import React from "react";
import AppRouter from "./routers/router";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`antialiased selection:bg-cyan-500/30 ${
        darkMode ? "dark bg-zinc-950 text-white" : "bg-white text-black"
      }`}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: darkMode ? "#111827" : "#ffffff",

            color: darkMode ? "#ffffff" : "#000000",

            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      <AppRouter />
    </div>
  );
};

export default App;

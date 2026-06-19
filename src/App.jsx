import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import socket from "./socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return <Dashboard />;
}

export default App;

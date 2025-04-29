import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeChampions } from "./data/champions";
import { initializeItems } from "./data/items";
import { initializeMatchups } from "./data/matchups";

// Initialize static data before rendering the app
Promise.all([
  initializeChampions(),
  initializeItems(),
  initializeMatchups()
]).then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
}).catch(error => {
  console.error("Failed to initialize data:", error);
  // Render app anyway to show error messages
  createRoot(document.getElementById("root")!).render(<App />);
});

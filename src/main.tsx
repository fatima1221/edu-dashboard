import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

async function enableMocking() {
  if (import.meta.env.MODE === "development") {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

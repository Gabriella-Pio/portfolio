
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./app/i18n/i18n.ts";
  import "./styles/index.css";
  import { AccessibilityProvider } from "./app/context/AccessibilityContext.tsx";
  import { ErrorBoundary } from "./app/components/ErrorBoundary.tsx";

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </ErrorBoundary>
  );

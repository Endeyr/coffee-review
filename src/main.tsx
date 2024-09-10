import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import ErrorPage from "./error-page.tsx";
import "./index.css";
import LoginPage from "./routes/auth/LoginPage.tsx";
import RegisterPage from "./routes/auth/RegisterPage.tsx";
import MapPage from "./routes/google/MapPage.tsx";
import AboutPage from "./routes/info/about.tsx";
import ContactPage from "./routes/info/contact.tsx";
import Root from "./routes/root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <App /> },
      { path: "auth/login", element: <LoginPage /> },
      { path: "auth/register", element: <RegisterPage /> },
      { path: "google/map", element: <MapPage /> },
      { path: "info/about", element: <AboutPage /> },
      { path: "info/contact", element: <ContactPage /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}

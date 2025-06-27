import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { ApiProvider } from "./context/ApiContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ApiProvider>
        <ThemeProvider>
          <AppWrapper>
            <App />
            <ToastContainer />
          </AppWrapper>
        </ThemeProvider>
      </ApiProvider>
    </Provider>
  </StrictMode>
);

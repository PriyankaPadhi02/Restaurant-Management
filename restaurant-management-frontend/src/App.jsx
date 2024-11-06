import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import CustomRouter from "./routes/route";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
              }}
            />
            <BrowserRouter>
              <CustomRouter />
            </BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const root = document.getElementById("root");

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(root).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="song" element={<div>hola</div>} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

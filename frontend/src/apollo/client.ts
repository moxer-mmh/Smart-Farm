// src/apollo/client.ts
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// Create an HTTP link for your GraphQL endpoint.
const httpLink = createHttpLink({
  uri: "http://localhost:8000/api/graphql",
});

// Auth link to attach the token from localStorage.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.trim()}` : "",
    },
  };
});

// Error link to catch 401 errors.
const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (
    networkError &&
    "statusCode" in networkError &&
    networkError.statusCode === 401
  ) {
    console.error("Unauthorized, logging out...");
    // Clear authentication data.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Optionally, you can redirect to login:
    window.location.href = "/auth/login";
  }
  // Optionally handle graphQLErrors if needed.
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
});

// Combine the links.
const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;

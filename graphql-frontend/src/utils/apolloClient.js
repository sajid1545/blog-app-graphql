// // apolloClient.js
// import {
//   ApolloClient,
//   ApolloLink,
//   HttpLink,
//   InMemoryCache,
// } from "@apollo/client";

// const getToken = () => {
//   return localStorage.getItem("token"); // or pull from context if necessary
// };

// const authLink = new ApolloLink((operation, forward) => {
//   const token = getToken();

//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       Authorization: token || "", // 👈 No "Bearer" prefix
//     },
//   }));

//   return forward(operation);
// });

// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/",
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token"),
  },
});

export default client;

import { GraphQLClient } from "graphql-request";
import { API_ENDPOINT } from "lib/constants";

const gqlClient = new GraphQLClient(API_ENDPOINT, {
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  },
});

export function shopifyRequest(query: string) {
  return gqlClient.request(query);
}

export default gqlClient;

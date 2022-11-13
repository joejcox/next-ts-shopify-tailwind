import { gql, GraphQLClient } from "graphql-request";
import { API_ENDPOINT } from "lib/constants";
import { MainMenu } from "types/shopify";

const gqlClient = new GraphQLClient(API_ENDPOINT, {
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  },
});

export function shopifyRequest(query: string) {
  return gqlClient.request(query);
}

export async function getMenu() {
  const query = gql`
    {
      menu(handle: "main-menu") {
        items {
          id
          title
          url
          items {
            id
            title
            url
          }
        }
      }
    }
  `;
  try {
    const response = await shopifyRequest(query);

    return response.menu as MainMenu;
  } catch (error) {
    console.log(error);
  }

  return {
    data: {
      menu: {
        items: [],
      },
    },
  };
}

export default gqlClient;

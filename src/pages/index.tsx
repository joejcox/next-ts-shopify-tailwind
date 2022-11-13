import Layout from "components/common/Layout";
import { gql } from "graphql-request";
import { getMenu, shopifyRequest } from "lib/shopify-storefront";
import Image from "next/image";
import { ShopifyCategories, ShopifyProducts } from "types/shopify";

interface Props {
  products: ShopifyProducts;
  categories: ShopifyCategories;
}

export default function Home({ products }: Props) {
  return (
    <>
      <section className="py-32 border-y">
        <div className="container">
          <h1 className="text-6xl mb-16">Featured Products</h1>
          <div className="flex flex-wrap gap-5 sm:gap-0 xl:gap-5">
            {products.nodes.map((product) => (
              <div key={product.id} className="group w-full sm:w-1/2 xl:w-1/4 relative border-4 border-white shadow-xl h-full overflow-hidden rounded">
                <h2 className="absolute top-0 left-0 bg-white z-[10] p-2 text-2xl mb-2 text-black">{product.title}</h2>
                <div className="relative h-[400px]">{product.images.nodes.length && <Image className="group-hover:scale-105 transition-transform duration-300" src={product.images.nodes[0].url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} width="700" height="700" />}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Home.Layout = Layout;

export async function getStaticProps() {
  const query = gql`
    {
      products(first: 5) {
        nodes {
          title
          id
          images(first: 1) {
            nodes {
              id
              url
            }
          }
        }
      }
      collections(first: 5) {
        nodes {
          id
          title
          handle
        }
      }
    }
  `;

  try {
    const productsQuery = shopifyRequest(query);
    const menuQuery = getMenu();

    const [data, menu] = await Promise.all([productsQuery, menuQuery]);

    return {
      props: {
        products: data.products,
        categories: data.collections,
        menu,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
}

import { gql } from "graphql-request";
import { shopifyRequest } from "lib/graphql";
import Image from "next/image";
import Link from "next/link";

interface ShopifyImage {
  id: string;
  url: string;
}

interface ShopifyProduct {
  title: string;
  id: string;
  images: {
    nodes: ShopifyImage[];
  };
}

interface ShopifyProducts {
  nodes: ShopifyProduct[];
}

interface Props {
  products: ShopifyProducts;
}

export default function Home({ products }: Props) {
  return (
    <>
      <header className="h-[100px]">
        <div className="container h-full mx-auto flex items-center justify-between">
          <div className="text-4xl leading-[1]">
            Gori<span className="text-red-500">.</span>
          </div>
          <nav className="flex">
            <Link href="/" className="px-4 py-2 hover:text-red-500">
              Home
            </Link>
            <Link href="/" className="px-4 py-2 hover:text-red-500">
              Collection
            </Link>
          </nav>
        </div>
      </header>
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
    }
  `;

  try {
    const response = await shopifyRequest(query);

    return {
      props: {
        products: response.products as ShopifyProducts,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
}

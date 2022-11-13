import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

interface ShopifyCategory {
  id: string;
  title: string;
  handle: string;
}

export interface ShopifyCategories {
  nodes: ShopifyCategory[];
}

interface Props {
  pageProps: {
    categories: ShopifyCategories;
  };
  children: ReactNode;
}

export default function Layout({ children, pageProps }: Props) {
  return (
    <>
      <header className="h-[100px]">
        <div className="container h-full mx-auto flex items-center justify-between">
          <div className="text-4xl leading-[1]">
            Gori<span className="text-red-500">.</span>
          </div>
          <nav className="flex">
            {pageProps.categories.nodes.map((category) => (
              <Link key={category.id} href={`/${category.handle}`} className="px-4 py-2 hover:text-red-500">
                {category.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

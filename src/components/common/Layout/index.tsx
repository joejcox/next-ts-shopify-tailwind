import Link from "next/link";
import { ReactNode } from "react";
import { MainMenu, ShopifyCategories } from "types/shopify";
import styles from "./Layout.module.css";

interface Props {
  pageProps: {
    categories: ShopifyCategories;
    menu: MainMenu;
  };
  children: ReactNode;
}

export default function Layout({ children, pageProps }: Props) {
  const { menu } = pageProps;
  return (
    <>
      <header className="h-[100px]">
        <div className="container h-full mx-auto flex items-center justify-between">
          <div className="text-4xl leading-[1]">
            Gori<span className="text-red-500">.</span>
          </div>
          <nav className="flex">
            {menu.items?.map((item) => (
              <div key={item.id} className="group relative inline-block py-2 px-4">
                <Link href={item.url} className="">
                  {item.title}
                </Link>
                {item.items.length > 0 && (
                  <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute top-full w-40 left-0 bg-white rounded shadow-xl p-2">
                    {item.items.map((subItem) => (
                      <Link key={subItem.id} href={subItem.url} className="block">
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

export interface ShopifyCategory {
  id: string;
  title: string;
  handle: string;
}

export interface ShopifyCategories {
  nodes?: ShopifyCategory[];
}

export interface ShopifyImage {
  id: string;
  url: string;
}

export interface ShopifyProduct {
  title: string;
  id: string;
  images: {
    nodes: ShopifyImage[];
  };
}

export interface ShopifyProducts {
  nodes: ShopifyProduct[];
}

export interface MainMenuItem {
  id: string;
  title: string;
  url: string;
  items: MainMenuItem[];
}

export interface MainMenu {
  items: MainMenuItem[];
}

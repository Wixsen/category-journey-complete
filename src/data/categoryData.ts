
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  farmer: string;
  location: string;
  isOrganic: boolean;
  isFeatured: boolean;
}

export const categories: Category[] = [
  {
    id: 'crops',
    name: 'Crops',
    description: 'Fresh crops directly from our farmers',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Delicious and juicy fruits for your health',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    description: 'Fresh and nutritious vegetables',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'herbs',
    name: 'Herbs',
    description: 'Aromatic herbs for your kitchen',
    image: 'https://images2.imgbox.com/2c/d7/15Hnrks0_o.jpg',
  },
  {
    id: 'dry-fruits',
    name: 'Dry Fruits',
    description: 'Nutritious dry fruits and nuts',
    image: 'https://images2.imgbox.com/75/02/x09OgVHR_o.jpeg',
  },
  {
    id: 'homemade',
    name: 'Homemade Goods',
    description: 'Artisanal homemade goods',
    image: 'https://images2.imgbox.com/b6/d8/XL458dpi_o.jpg',
  },
];

export const products: Product[] = [
  // Crops
  {
    id: 'wheat',
    categoryId: 'crops',
    name: 'Organic Wheat',
    description: 'Freshly harvested organic wheat from our sustainable farms. Perfect for making homemade bread and pastries.',
    price: 3.99,
    image: 'https://images2.imgbox.com/2a/3c/ZhqvIYb2_o.jpg',
    stock: 50,
    farmer: 'Johnson Family Farm',
    location: 'Midwest Plains',
    isOrganic: true,
    isFeatured: true,
  },
  {
    id: 'rice',
    categoryId: 'crops',
    name: 'Basmati Rice',
    description: 'Premium quality basmati rice with a wonderful aroma. Ideal for special dishes and everyday meals.',
    price: 5.49,
    image: 'https://images2.imgbox.com/2e/89/hRc9j55b_o.jpg',
    stock: 75,
    farmer: 'Green Valley Cooperative',
    location: 'River Delta',
    isOrganic: false,
    isFeatured: false,
  },
  
  // Fruits
  {
    id: 'apple',
    categoryId: 'fruits',
    name: 'Gala Apples',
    description: 'Sweet and crisp Gala apples. Perfect for snacking, baking, or adding to salads.',
    price: 1.29,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stock: 100,
    farmer: 'Apple Orchard Farms',
    location: 'Highland Hills',
    isOrganic: true,
    isFeatured: false,
  },
  {
    id: 'strawberry',
    categoryId: 'fruits',
    name: 'Fresh Strawberries',
    description: 'Juicy, sweet strawberries picked at peak ripeness. Great for desserts or eating fresh.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stock: 40,
    farmer: 'Berry Patch Farms',
    location: 'Coastal Valley',
    isOrganic: true,
    isFeatured: true,
  },
  
  // Vegetables
  {
    id: 'carrot',
    categoryId: 'vegetables',
    name: 'Fresh Carrots',
    description: 'Sweet and crunchy carrots. Rich in vitamins and minerals.',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stock: 60,
    farmer: 'Root Vegetable Farm',
    location: 'Fertile Plains',
    isOrganic: false,
    isFeatured: false,
  },
  {
    id: 'tomato',
    categoryId: 'vegetables',
    name: 'Heirloom Tomatoes',
    description: 'Flavorful heirloom tomatoes in a variety of colors. Perfect for salads and cooking.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stock: 35,
    farmer: 'Sunshine Farms',
    location: 'Southern Gardens',
    isOrganic: true,
    isFeatured: true,
  },
  
  // Herbs
  {
    id: 'basil',
    categoryId: 'herbs',
    name: 'Fresh Basil',
    description: 'Aromatic basil leaves. Essential for Italian dishes and homemade pesto.',
    price: 2.49,
    image: 'https://images2.imgbox.com/d1/7a/UiPe6UVp_o.jpg',
    stock: 30,
    farmer: 'Herb Garden Co.',
    location: 'Mediterranean Hills',
    isOrganic: true,
    isFeatured: false,
  },
  {
    id: 'mint',
    categoryId: 'herbs',
    name: 'Fresh Mint',
    description: 'Refreshing mint leaves. Perfect for teas, cocktails, and cooking.',
    price: 1.99,
    image: 'https://images2.imgbox.com/f2/16/sRG78Ih4_o.jpg',
    stock: 25,
    farmer: 'Green Thumb Herbs',
    location: 'River Garden',
    isOrganic: false,
    isFeatured: false,
  },
  
  // Dry Fruits
  {
    id: 'almonds',
    categoryId: 'dry-fruits',
    name: 'Raw Almonds',
    description: 'Crunchy, nutritious raw almonds. A healthy snack packed with protein and good fats.',
    price: 6.99,
    image: 'https://images2.imgbox.com/5f/59/E82mP4fU_o.jpg',
    stock: 45,
    farmer: 'Nut Grove Orchards',
    location: 'Valley Farms',
    isOrganic: true,
    isFeatured: true,
  },
  {
    id: 'dried-apricots',
    categoryId: 'dry-fruits',
    name: 'Dried Apricots',
    description: 'Sweet and chewy dried apricots. A naturally sweet treat with no added sugar.',
    price: 4.99,
    image: 'https://images2.imgbox.com/44/40/h1BNJ8Ar_o.jpg',
    stock: 40,
    farmer: 'Sunny Orchard',
    location: 'Desert Oasis',
    isOrganic: false,
    isFeatured: false,
  },
  
  // Homemade Goods
  {
    id: 'honey',
    categoryId: 'homemade',
    name: 'Raw Honey',
    description: 'Pure, raw honey from local beehives. Naturally sweet and full of beneficial properties.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stock: 20,
    farmer: 'Bee Happy Apiary',
    location: 'Flowering Fields',
    isOrganic: true,
    isFeatured: true,
  },
  {
    id: 'jam',
    categoryId: 'homemade',
    name: 'Strawberry Jam',
    description: 'Homemade strawberry jam. Made with locally grown strawberries and minimal processing.',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    stock: 15,
    farmer: 'Grandma\'s Kitchen',
    location: 'Berry Valley',
    isOrganic: false,
    isFeatured: false,
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getRecommendedProducts = (categoryId: string, productId: string, limit: number = 4): Product[] => {
  return products
    .filter(product => product.categoryId === categoryId && product.id !== productId)
    .slice(0, limit);
};

export const getFarmerFeatures = () => {
  return [
    {
      id: 'farmer-week',
      title: 'Farmer of the Week',
      name: 'Johnson Family',
      description: 'Dedicated to sustainable farming for generations.',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'farmer-month',
      title: 'Farmer of the Month',
      name: 'Smith Organic Cooperative',
      description: 'Leading organic produce provider in the region.',
      image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }
  ];
};

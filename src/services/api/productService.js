import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async getFeatured() {
    await delay(250);
    return productsData.filter(product => product.featured);
  },

  async getByCategory(category) {
    await delay(300);
    return productsData.filter(product => 
      product.category.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
    );
  },

  async search(query) {
    await delay(200);
    const searchTerm = query.toLowerCase();
    return productsData.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  },

  async create(productData) {
    await delay(400);
    const maxId = Math.max(...productsData.map(p => p.Id));
    const newProduct = {
      ...productData,
      Id: maxId + 1
    };
    productsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, productData) {
    await delay(350);
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    productsData[index] = { ...productsData[index], ...productData };
    return { ...productsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
const deletedProduct = productsData.splice(index, 1)[0];
    return { ...deletedProduct };
  },

  async getDeals() {
    await delay(250);
    return productsData.filter(product => product.onSale || product.discount > 0);
  },

  async getBundles() {
    await delay(300);
    // Group products into recipe bundles
    const bundles = [
      {
        Id: 1,
        name: "Italian Pasta Night",
        description: "Everything you need for a perfect Italian dinner",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
        originalPrice: 45.99,
        bundlePrice: 35.99,
        savings: 10.00,
        products: productsData.slice(0, 3)
      },
      {
        Id: 2,
        name: "Fresh Salad Bowl",
        description: "Healthy and delicious salad ingredients",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
        originalPrice: 28.99,
        bundlePrice: 22.99,
        savings: 6.00,
        products: productsData.slice(3, 6)
      },
      {
        Id: 3,
        name: "Breakfast Essentials",
        description: "Start your day right with these breakfast favorites",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400",
        originalPrice: 32.99,
        bundlePrice: 26.99,
        savings: 6.00,
        products: productsData.slice(6, 9)
      }
    ];
    return bundles;
  }
};
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
  }
};
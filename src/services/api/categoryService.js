import categoriesData from "@/services/mockData/categories.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(250);
    return [...categoriesData];
  },

  async getById(id) {
    await delay(200);
    const category = categoriesData.find(c => c.Id === id);
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const maxId = Math.max(...categoriesData.map(c => c.Id));
    const newCategory = {
      ...categoryData,
      Id: maxId + 1
    };
    categoriesData.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(350);
    const index = categoriesData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    categoriesData[index] = { ...categoriesData[index], ...categoryData };
    return { ...categoriesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = categoriesData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    const deletedCategory = categoriesData.splice(index, 1)[0];
    return { ...deletedCategory };
  }
};
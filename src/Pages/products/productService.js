import api from "../../api/axios.js";

const productService = {
  async getProducts({ page = 1, limit = 12, search = "", category = "", fabric = "", sort = "", featured = "" } = {}) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (fabric) params.append("fabric", fabric);
    if (sort) params.append("sort", sort);
    if (featured) params.append("featured", featured);

    const { data } = await api.get(`/products?${params.toString()}`);
    return data;
  },

  async getProductBySlug(slug) {
    const { data } = await api.get(`/products/slug/${slug}`);
    return data.data;
  },

  async getProductById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },

  async getFeaturedProducts(limit = 6) {
    const { data } = await api.get(`/products/featured?limit=${limit}`);
    return data.data;
  },

  async getCategories() {
    const { data } = await api.get("/categories/public");
    return data.data;
  },
};

export default productService;

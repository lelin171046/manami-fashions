import api from "../../api/axios.js";

const productService = {
  async getProducts({ page = 1, limit = 12, search = "", category = "", fabric = "", sort = "", featured = "", audience = "" } = {}) {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (fabric) params.append("fabric", fabric);
    if (sort) params.append("sort", sort);
    if (featured) params.append("featured", featured);
    if (audience) params.append("audience", audience);

    const { data } = await api.get(`/products?${params.toString()}`);
    return data;
  },

  async getPublicProducts(audience, { page = 1, limit = 12, search = "", category = "", sort = "sortOrder" } = {}) {
    const params = new URLSearchParams();
    params.append("audience", audience);
    params.append("page", page);
    params.append("limit", limit);
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (sort) params.append("sort", sort);

    const { data } = await api.get(`/products/public?${params.toString()}`);
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

  async getFeaturedProducts(limit = 6, audience = "") {
    const params = new URLSearchParams();
    params.append("limit", limit);
    if (audience) params.append("audience", audience);
    const { data } = await api.get(`/products/featured?${params.toString()}`);
    return data.data;
  },

  async getCategories(audience = "") {
    const params = new URLSearchParams();
    if (audience) params.append("audience", audience);
    const { data } = await api.get(`/categories/public?${params.toString()}`);
    return data.data;
  },
};

export default productService;

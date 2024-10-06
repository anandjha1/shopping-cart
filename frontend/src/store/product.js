import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "provide all required fields." }
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();

        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Producted Created Successfully." };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ products: state.products.filter(product => product._id !== id) }));
        return { success: true, message: data.message };
    },
    updateProduct: async (product) => {
        if (!product.name || !product.price || !product.image) {
            return { success: false, message: "Provide all required fields." };
        }

        const res = await fetch(`/api/products/${product._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
        set((state) => ({ products: state.products.map(prod => prod._id === product._id ? data.data : prod) }));
        return { success: true, message: data.message };
    },
}));
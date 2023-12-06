const API_URL = "https://fakestoreapi.com/products";


export async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}?limit=10`, {
            mode: "cors",
        });

        if(!response.ok) {
            throw new Error('Failed to fetch products');
        }

        // console.log("data: ", response);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products', error);
        return [];
    }
}

export async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            mode: "cors",
        });

        if(!response.ok) {
            throw new Error('Failed to fetch product details');
        } 

        // console.log("data: ", response);
        return await response.json();
    } catch (error) {
        console.error('Error fetching product details', error);
        return null;
    }
}
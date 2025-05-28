import dotenv from 'dotenv';

dotenv.config();

export const fetchProductsFromPIM = async () => {
    const token = process.env.PIM_ADMIN_ACCESS_TOKEN;
    const url = process.env.PIM_URL + process.env.SUBDOMAIN + process.env.API_VERSION + '/products.json';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token,
        },
    });

    if(!response.ok) {
        const errorData = await response.json();
        const error = new Error('Fetch failed');
        error.status = response.status;
        error.body = errorData;
        throw error;
    }

    const data = await response.json();
    //map products if non standard
    return data.products || [];
};

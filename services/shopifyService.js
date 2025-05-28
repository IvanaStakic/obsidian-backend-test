import dotenv from 'dotenv';
dotenv.config();

const url = process.env.SHOPIFY_URL + process.env.SUBDOMAIN + process.env.API_VERSION + '/products.json';
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export const fetchProductByHandle = async (handle) => {
    const response = await fetch(url + '?handle=' + handle, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token
        }
    });
    const data = await response.json();
    return data.products || [];
};

export const createProduct = async (product) => {
  const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ product }),
    }
  );

  return response.json();
};

export const updateProduct = async (productId, product) => {
  const response = await fetch(
    process.env.SHOPIFY_URL + process.env.SUBDOMAIN + process.env.API_VERSION + `/products/${productId}.json`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ product }),
    }
  );

  return response.json();
};

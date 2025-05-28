import { fetchProductByHandle } from "../services/shopifyService";
import { jest } from '@jest/globals';

global.fetch = jest.fn();

describe('fetchProductByHandle', () => {
    it('returns product from Shopify store by handle', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                products: [
                    { id: 1, title: 'Product 1', handle: 'product-1'}
                ]
            })
        });

        const products = await fetchProductByHandle();
        expect(products[0].handle).toBe('product-1');
    });

     it('returns empty array if product is not found', async () => {
        fetch.mockResolvedValueOnce({
        json: async () => ({}),
        });

        const products = await fetchProductByHandle();
        expect(products).toEqual([]);
  });
})
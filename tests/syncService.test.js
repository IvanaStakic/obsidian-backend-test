import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/pim/pimService.js', () => ({
    fetchProductsFromPIM: jest.fn()
}));

jest.unstable_mockModule('../services/shopifyService.js', () => ({
    fetchProductByHandle: jest.fn(),
    updateProduct: jest.fn(),
    createProduct: jest.fn()
}));

jest.unstable_mockModule('fs/promises', () => ({
    writeFile: jest.fn(),
}));

const pimService = await import('../services/pim/pimService.js');
const shopifyService = await import('../services/shopifyService.js');
const { fetchAndSyncProducts } = await import('../services/syncService.js');
const { writeFile } = await import('fs/promises');


describe.only('fetchAndSyncProducts', () => {
    it('fetches and syncs products from PIM to Shopify store', async () => {

        shopifyService.fetchProductByHandle.mockImplementation((handle) => {
            if (handle === 'product-1') {
                return Promise.resolve([{ id: 1, handle, title: 'Existing product' }]);
            }
            return Promise.resolve([]);
        });

        shopifyService.updateProduct.mockResolvedValue({ updated: true });
        shopifyService.createProduct.mockResolvedValue({ product: { id: 2 } });

        const results = await fetchAndSyncProducts('mockPIM');

        expect(results).toEqual([
            { action: 'updated', id: 1, title: 'Update me' },
            { action: 'created', id: 2, title: 'Create me' }
        ]);

        expect(writeFile).toHaveBeenCalled();
    });

    it('handles update error', async () => {

        shopifyService.fetchProductByHandle.mockImplementation((handle) => {
            if (handle === 'product-1') {
                return Promise.resolve([{ id: 1, handle, title: 'Existing product' }]);
            }
            return Promise.resolve([]);
        });
        shopifyService.updateProduct.mockImplementation(() => {
            throw new Error('Mock update error');
        });

        const result = await fetchAndSyncProducts('mockPIM');

        expect(result).toEqual([
            {
                action: 'update_failed',
                id: 1,
                title: 'Update me',
                error: 'Mock update error'
            },
            {
                action: 'created',
                id: 2,
                title: 'Create me'
            }
        ]);
    });
});
import {
    createProduct,
    updateProduct,
    fetchProductByHandle
} from './shopifyService.js';
import { writeFile } from 'fs/promises';

export const fetchAndSyncProducts = async (pimServiceName) => {

    const pimModule = await import(`./pim/${pimServiceName}.js`);
    const { fetchProductsFromPIM } = pimModule;

    const pimProducts = await fetchProductsFromPIM();

    const results = [];

    for (const pimProduct of pimProducts) {
        const [existingProduct] = await fetchProductByHandle(pimProduct.handle);

        if (existingProduct) {
            const shopifyId = existingProduct.id;
            try {
                await updateProduct(shopifyId, pimProduct);
                results.push({ action: 'updated', id: shopifyId, title: pimProduct.title });
            }
            catch (error) {
                results.push({ action: 'update_failed', id: shopifyId, title: pimProduct.title, error: error.message });
            }
        }
        else {
            try {
                const created = await createProduct(pimProduct);
                results.push({ action: 'created', id: created.product?.id, title: pimProduct.title });
            }
            catch (error) {
                results.push({ action: 'create_failed', id: null, title: pimProduct.title, error: error.message });
            }
        }
    }

    await writeFile('sync-results.json', JSON.stringify(results, null, 2));

    return results;
};

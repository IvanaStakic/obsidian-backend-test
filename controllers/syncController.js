import { fetchAndSyncProducts } from '../services/syncService.js';

export const syncProducts = async (_req, res) => {
    try {
        const result = await fetchAndSyncProducts('pimService');
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        const statusCode = error.status || 500;

        res.status(statusCode).json({
            error: error.message,
            details: error.body || null
        });
    }
};

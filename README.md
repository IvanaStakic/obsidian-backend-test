# Shopify sync service

A Node.js API service that synchronizes products from a PIM system to a Shopify store.
It supports both creation and updates based on the latest data from the PIM.

## Technologies used

Node.js
- 'fetch' API
- Jest (testing)
- Shopify Admin API
- 'dotenv' for environment configuration

## Getting started

**1. Clone the repository**

- `git clone https://github.com/IvanaStakic/obsidian-backend-test.git`
- `cd obsidian-backend-test`

**2. Install dependencies**
  - `npm install`

**3. Create a .env file**
  
  PIM_ADMIN_ACCESS_TOKEN = your_pim_token  
  SHOPIFY_ADMIN_ACCESS_TOKEN = your_shopify_token  
  PIM_URL = "https://your-pim.myshopify.com"  
  SHOPIFY_URL = "https://your-shop.myshopify.com"  
  SUBDOMAIN = "/admin/api/"  
  API_VERSION = "2024-04"  

**4. Run the server**

  `node server.js`

**Running test**

`npm test`

## API Endpoint

POST `/sync-products`  
Triggers synchronization of products from PIM to Shopify store.

## Project Structure
/services  
  ├── pim/                # PIM-specific logic  
  ├── shopifyService.js   # Shopify API interactions  
  └── syncService.js      # Core sync logic  

/tests  
  ├── syncService.test.js  
  └── shopifyService.test.js  

/controllers  
  └── syncController.js  

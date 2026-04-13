# Product Manager App

A full-featured Product Management App built with React, Context API, React Router v6, and DummyJSON API.

## Features

- **Product Listing** – Responsive card grid with image, title, price, rating
- **Live Search** – Filter products by title dynamically as you type
- **Product Detail** – Full details with image gallery, stock status, metadata
- **Add Product** – Form to create a new product via API
- **Edit Product** – Pre-filled form to update existing product data
- **Delete Product** – Confirmation modal before permanent deletion
- **Context API** – Global state for products, loading, error, searchTerm
- **Toast Notifications** – Success/error feedback after every mutation
- **Responsive Design** – Works on mobile, tablet, and desktop

## Tech Stack

| Tool              | Purpose                     |
|-------------------|-----------------------------|
| React 18          | UI library                  |
| React Router v6   | Client-side routing         |
| Context API       | Global state management     |
| DummyJSON API     | Mock REST API backend       |
| CSS Modules       | Component-scoped styling    |

## Project Structure

```
src/
├── context/
│   └── ProductContext.js   # Global state, API calls, CRUD handlers
├── components/
│   ├── Navbar.js           # Sticky navigation bar
│   ├── Navbar.css
│   ├── ProductCard.js      # Product card used in grid
│   ├── ProductCard.css
│   ├── ConfirmModal.js     # Delete confirmation dialog
│   └── FormField.js        # Reusable controlled input
├── pages/
│   ├── ProductList.js      # / — product grid + search bar
│   ├── ProductList.css
│   ├── ProductDetail.js    # /product/:id — full product view
│   ├── ProductDetail.css
│   ├── AddProduct.js       # /add — add product form
│   ├── EditProduct.js      # /edit/:id — pre-filled edit form
│   └── Form.css            # Shared form styles
├── App.js                  # BrowserRouter + Routes
├── index.js                # React root
└── index.css               # Global styles, tokens, utilities
```

## API Endpoints Used

| Operation      | Method | Endpoint                              |
|----------------|--------|---------------------------------------|
| Get all        | GET    | /products?limit=100                   |
| Get one        | GET    | /products/:id                         |
| Add product    | POST   | /products/add                         |
| Update product | PUT    | /products/:id                         |
| Delete product | DELETE | /products/:id                         |

## Routing

| Path            | Component      | Description              |
|-----------------|----------------|--------------------------|
| `/`             | ProductList    | All products + search    |
| `/product/:id`  | ProductDetail  | Single product details   |
| `/add`          | AddProduct     | Add new product form     |
| `/edit/:id`     | EditProduct    | Edit existing product    |

## Context API

`ProductContext` manages:

- `products` — filtered product array (by search term)
- `allProducts` — unfiltered full list
- `loading` — boolean fetch state
- `error` — error message string or null
- `searchTerm` — current search string
- `setSearchTerm` — update search filter
- `fetchProducts()` — load all products from API
- `getProduct(id)` — fetch single product
- `addProduct(data)` — POST new product
- `updateProduct(id, data)` — PUT updated product
- `deleteProduct(id)` — DELETE product

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 8

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

## Notes

- DummyJSON is a mock API — `POST /add`, `PUT /:id`, and `DELETE /:id` are simulated.
  Real mutations are reflected in local React state so the UI stays consistent.
- Search filtering happens client-side against the cached product list.

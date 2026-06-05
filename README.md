# E-Commerce Cart System

A modern React + Vite e-commerce frontend built for an internship-level React project. The app demonstrates component-driven UI, routing, API integration, authentication flow, protected routes, Context API state management, cart and wishlist persistence, checkout, local storage, and responsive design.

## Features

- Product catalog from FakeStore API using Axios
- Product cards, detail pages, gallery thumbnails, ratings, quick view modal
- Search, category filtering, price filtering, and sorting
- Cart with add, remove, quantity controls, totals, and local storage
- Wishlist with local storage
- Login, register, JWT-style token storage, logout, and remembered user
- Protected Cart, Checkout, Orders, and Profile pages
- Profile dashboard with cart, wishlist, and recent order summaries
- Checkout shipping form and order confirmation
- Toast notifications
- Light and dark theme stored in local storage
- Skeleton loaders, featured products, trending products, recently viewed products
- Responsive CardNav navigation for Home, Products, Categories, Cart, Wishlist, Orders, Profile, and Settings

## Tech Stack

- React.js with functional components
- JavaScript
- React Router
- Axios
- Context API
- Local Storage
- CSS
- Vite

## Installation

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Demo Login

The login page is prefilled with FakeStore demo credentials:

```text
username: mor_2314
password: 83r5^_
```

If FakeStore is unavailable, the app falls back to a local demo token and sample products so the UI remains usable.

## Build

```bash
npm run build
```

## Project Structure

```text
src/
  components/   Reusable UI such as CardNav, ProductCard, modal, summaries
  context/      Auth, cart, wishlist, product, theme, and toast providers
  pages/        Routed page components
  services/     Axios API client
  utils/        Local storage helpers
```

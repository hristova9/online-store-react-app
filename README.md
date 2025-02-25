# 🛒 Online Store React App

![React](https://img.shields.io/badge/React-18-blue) 
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue) 
![Redux](https://img.shields.io/badge/Redux-✓-purple)

## 📌 Overview

**Online Store React App** is a functional **e-commerce web application** built with **React, TypeScript, and Redux Toolkit**. The app allows us to **browse products, add them to a shopping basket, adjust quantities, remove items, and checkout**. It also includes **Theme mode toggle** using **Context API**.

---

## 🎯 Features

✅ **Product Listing** - Fetches products from an API and displays them.  
✅ **Product Details** - View detailed information about each product.  
✅ **Shopping Basket** - Add, remove, and update product quantities in the basket.  
✅ **Checkout System** - Proceed with checkout after selecting items.  
✅ **Theme Mode** - Toggle between two different themes for background.  
✅ **Responsive Design** - Works on desktop, tablet, and mobile screens.  
✅ **Fast Performance** - Optimized with React hooks and Redux for smooth UI.  
✅ **Modern UI** - Styled with **CSS Modules** and **media queries** for responsiveness.  

---

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Strongly typed JavaScript
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Context API** - Theme switching (Dark/Light mode)
- **CSS Modules** - Scoped component styling
- **Vite** - Fast development environment

---

## Product Listing

The **Product Listing** feature fetches products dynamically from an API and displays them in a user-friendly format. Users can browse available products, view their details, and add them to their basket.

- **API Call**: Fetches product data from an external API.
- **Dynamic Rendering**: Displays each product with relevant details such as name, price, and image.
- **State Management**: Uses Redux to manage the product list.
- **Responsive Design**: Ensures the layout adapts to different screen sizes.
- **Buy Product Feature**: Users can purchase a product, triggering a Redux action that sends a request to a JSON Server.
- **Backend Interaction**: Uses JSON Server to handle product purchase requests, simulating a real backend.

### 🛒 Buying a Product

Users can buy a product by clicking the "Buy" button, which dispatches a Redux action and makes a request to the JSON Server.

---
## Product Details

The **Product Details** feature allows users to view in-depth information about each product. When a user selects a product, they are taken to a dedicated page displaying detailed specifications, images, and purchase options.

### 🛠️ Implementation Details

- **Dynamic Routing**: Uses React Router to navigate to individual product pages.
- **API Call**: Fetches product details from an external API using the product ID.
- **State Management**: Uses Redux to store and manage the selected product.
- **User Interaction**: Provides options to add the product to the basket.
- **Responsive Design**: Ensures a seamless experience across different screen sizes.

### 🔗 API Endpoint

The app fetches product details using the product's unique ID

---

## Shopping Basket

The **Shopping Basket** feature allows users to add, remove, and update product quantities in their basket before proceeding to checkout. This feature ensures a smooth shopping experience with dynamic updates and user-friendly interactions.

### 🛠️ Implementation Details

- **State Management**: Uses Redux to store and manage the basket items.
- **Add/Remove Products**: Users can add products to their basket and remove unwanted items.
- **Quantity Updates**: Users can increase or decrease the quantity of each item dynamically.
- **Persistent Storage**: Uses local storage or Redux persist to retain basket items across sessions.
- **Responsive Design**: Ensures the basket layout is user-friendly on all devices.

### 🛍️ Basket Functionality

✅ **Add to Basket**: Clicking the "Add to Basket" button adds the product to the shopping basket.  
✅ **Remove from Basket**: Users can remove individual items from the basket.  
✅ **Update Quantity**: Users can increase or decrease the quantity of items.  
✅ **Proceed to Checkout**: Users can checkout and navigate to the main products page.  

---

## 🛠 Installation & Setup

Follow these steps to install and run the application along with JSON Server.

### 1️⃣ Clone the Repository
### 2️⃣ Install Dependencies
### 3️⃣ Setup JSON Server (Mock Backend)
- Create a db.json file in the project root and add:
```md
```json
{
  "basket": []
}
- Install JSON Server globally (if not installed):
`npm install -g json-server`
- Start JSON Server on port 3000:
`json-server --watch db.json --port 3000`s
### 4️⃣ Start the React App
### 5️⃣ Open the App



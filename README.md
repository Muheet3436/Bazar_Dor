# 🛒 বাজার দর — BazarDor

BazarDor is a responsive web application for viewing the latest market prices of essential daily products in Bangladesh.

Users can browse products, view category-based products, compare price changes, check market-wise prices, and securely access protected product details using authentication.

## 🚀 Live Website

Live Link: Add your deployed link here

## 💻 GitHub Repository

GitHub Repository: Add your repository link here

## 🛠️ Technologies Used

- Next.js
- Next.js App Router
- JavaScript
- Tailwind CSS
- Better Auth
- MongoDB Atlas
- Google OAuth
- GitHub OAuth
- React Hot Toast
- Vercel

## ✨ Key Features

1. **Live Product Prices**
   - Displays essential products with current market prices.
   - Shows price increase, decrease, and unchanged indicators.

2. **Top Price Risers and Fallers**
   - Shows the top products whose prices increased today.
   - Shows the top products whose prices decreased today.

3. **Category-Based Product Browsing**
   - Browse products by category.
   - Active category highlighting in the navigation bar.

4. **Product Sorting**
   - Default sorting.
   - Price: Low to High.
   - Price: High to Low.

5. **Detailed Product Information**
   - Shows product category and unit.
   - Minimum price.
   - Maximum price.
   - Average price.
   - Market-wise price information.

6. **Authentication**
   - Email and password registration.
   - Email and password login.
   - Google authentication.
   - GitHub authentication.
   - Logout functionality.

7. **Protected Product Details**
   - Product details pages require authentication.
   - Unauthenticated users are redirected to the Sign In page.

8. **User Profile**
   - Logged-in users can view their profile.
   - Users can update their name.

9. **Price Ticker**
   - Infinite scrolling market-price ticker in the Navbar.

10. **Responsive Design**
    - Optimized for mobile, tablet, and desktop devices.

11. **Loading & Error States**
    - Skeleton loading interface.
    - Friendly 404 page for invalid routes.
    - Toast notifications for authentication and validation.

## 🔐 Authentication

BazarDor uses Better Auth with MongoDB Atlas.

Supported authentication methods:

- Email / Password
- Google
- GitHub

## 📦 API

The application uses the BazarDor API.

Main API:

`https://openapi.programming-hero.com/api/bazardor`

Alternative API:

`https://api.api-store.workers.dev/api/bazardor`

Available endpoints include:

- `/products`
- `/products?category=chal`
- `/products/1`
- `/categories`
- `/categories/chal`

## 📱 Responsive Support

The application is designed to work on:

- Mobile
- Tablet
- Laptop
- Desktop

## 👨‍💻 Run Locally

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Go to the project folder:

```bash
cd bazar_dor
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 🔑 Environment Variables

Create a `.env` file and configure:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

BETTER_AUTH_MONGODB_URI=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

NEXT_PUBLIC_API_URL
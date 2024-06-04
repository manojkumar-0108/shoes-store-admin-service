# 📖 Shoes Store - Admin Website | React + Vite

**`Live Preview`** : https://shoes-store-admin-service.onrender.com/

- Change backend URL from ./src/assests/index.js => to // export const BACKEND_BASE_URL = 'http://localhost:3000/'

- DUMMY ACCOUNTS:

        Email : admin@gmail.com
        Password: 123456

        Email : seller@gmail.com
        Password: 123456

---

⚠️ **<font color=red>Warning:</font>**

> <font color=red>Because the project is hosted on Render's free tier, it may take some time to load the website for the first time. Please be patient.</font>

> > "Your free instance will spin down due to inactivity, which can lead to delays in requests by 50 seconds or more." - Render

## Key Highlights

🔑 **Login**

- Secure authentication system.
- User-friendly login interface.
- Only admins and sellers can use it's functionalities

🛍️ **View Products**

- Browsing all the listed products.

🛒 **Add/Manage Products**

- Efficient process to add new products.
- Efficient way to delete any products.

📦 **Manage Orders**

- See all orders placed by users
- Update status of the product from processing to dispatch or deleivered etc.

🎨 **User Interface**

- Intuitive and responsive design for all devices.

---

## 🥇 Project Setup

1. ⬇️ **Download**: Download the project from GitHub and open it in your favorite text editor.

2. 📥 **Install Dependencies**: Navigate to the project folder and execute the following command to install all necessary dependencies:

   ```
   cd shoes-store-admin-service
   npm install
   ```

3. 🔌**Backend Integration**: Go inside `src/assets` folder, there inside `index.js` file update `BACKEND_BASE_URL` = '' with your backend URL

   ```
    cd src/assets/

   ```

4. ⚡**Start the project**: Begin running the project using this command:

   `⚠️Note:` Make sure backend service is up and running

   ```
   npm run dev
   ```

### 📦 Packages and Their Usage

- **`@heroicons/react`** 🖼️: A set of free MIT-licensed high-quality SVG icons for React. These icons are designed to work seamlessly with Tailwind CSS and can be easily integrated into your project.

- **`@stripe/stripe-js`** 💳: Official Stripe.js library for React, enabling secure and efficient integration with the Stripe payment gateway. It supports handling payments, subscriptions, and other financial transactions.

- **`axios`** 🌐: A promise-based HTTP client for the browser and Node.js. It simplifies making HTTP requests and handling responses, making it ideal for interacting with APIs in your React application.

- **`firebase`** 🔥: A comprehensive suite of cloud-based tools and services provided by Google. It includes authentication, real-time databases, cloud storage, and more, allowing you to build and scale your application quickly.

- **`react`** ⚛️: A JavaScript library for building user interfaces. React allows you to create reusable UI components and manage the state of your application efficiently.

- **`react-dom`** 🏡: The entry point to the DOM and server renderers for React. It enables you to render React components to the DOM and manage the component tree.

- **`react-icons`** 🎨: A collection of popular icons for React, including Font Awesome, Material Design, and more. It makes it easy to include icons in your React projects.

- **`react-responsive-carousel`** 🎠: A flexible and responsive carousel component for React. It allows you to create image sliders and carousels with various customization options.

- **`react-router-dom`** 🚏: A routing library for React that enables navigation and dynamic routing in your application. It allows you to define routes, link to different parts of your app, and manage navigation history.

- **`react-toastify`** 🍞: A React library for displaying toast notifications. It provides an easy-to-use API for showing notifications with customizable styles and behaviors.

- **`tailwindcss`** 💅: A utility-first CSS framework for rapidly building custom user interfaces. It provides a set of low-level utility classes that make it easy to style your components directly in your markup.

- **`vite`** ⚡: A fast build tool and development server for modern web projects. It provides an optimized development experience with features like hot module replacement (HMR) and fast builds.

---

// Routing metadata 
// The metadata API im Next.js is a powerful feature that allows developers to define and manage metadata for their web pages in a structured way.

//Metadata ensure our content looks great when it's shared or indexed by search engines.

// to ways to handle metadata in page.tsx or layout.tsx

// 1. Export a static medadata object
// 2. export dynamic generateMetadata function

// Metadata rules

// Both layout.tsx and page.tsx can export metadata. Layout metadata applies to all its pages, while page metadata is specific to that page.

// Metadata follows a top-down order, starting from the root level.

// When metadata exists in multiple places along a route, they merge together, with page metadata overriding layout metadata for matching properties.

// 1. Export a Static Metadata Object

// This method allows you to define metadata directly in the layout or page as a static object. This is useful for most general static pages, where you don't need dynamic changes in metadata.

// Example in layout.tsx (General Metadata for Every Page in the Layout)

// This would define the general metadata for all pages within the scope of this layout. You can put this in the layout.tsx:

// // layouts/Layout.tsx
// import { ReactNode } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// type Props = {
//   children: ReactNode;
// };

// // Export static metadata for the layout
// export const metadata = {
//   title: 'My Website',
//   description: 'Welcome to my awesome website!',
//   author: 'Your Name',
// };

// const Layout = ({ children }: Props) => {
//   return (
//     <div>
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;


// Here, the metadata object will be applied globally to all pages that use this layout. It includes a title, description, and author which are static across all pages within this layout.

// 2. Export Dynamic generateMetadata Function

// In cases where metadata needs to change dynamically based on the content of the page (for example, on a product page), you can use the generateMetadata function. This is useful when you need dynamic metadata for each page (like different titles or descriptions for each product page).

// Example in page.tsx (Specific Page Metadata Override)

// Here is how you would handle specific metadata for a page (for example, the Contact page, which should have a different description from the general layout):

// // pages/contact.tsx
// import { generateMetadata } from 'next';

// export const metadata = {
//   title: 'Contact Us - My Website',
//   description: 'Get in touch with us through the contact form or reach out via email.',
// };

// const ContactPage = () => {
//   return (
//     <div>
//       <h1>Contact Us</h1>
//       <p>We would love to hear from you. Please reach out with any questions.</p>
//     </div>
//   );
// };

// export default ContactPage;


// In this example, the metadata is defined specifically for the Contact page. The page metadata overrides the general metadata set in the Layout.tsx.

// 3. Dynamic Metadata with generateMetadata

// When you need dynamic metadata (such as a product page with a dynamic productId), you can use the generateMetadata function to generate metadata based on the content (e.g., a product title and description).

// Example of Dynamic Metadata for Product Page (generateMetadata with Dynamic productId)
// // pages/product/[productId].tsx
// import { useRouter } from 'next/router';

// // Static metadata for fallback in case product data is not loaded
// export const metadata = {
//   title: 'Product Page',
//   description: 'Explore our amazing product collection.',
// };

// export async function generateMetadata({ params }: { params: { productId: string } }) {
//   // Fetch product data using the productId
//   const productId = params.productId;
//   const product = await fetchProductDetails(productId);

//   return {
//     title: product.name,
//     description: product.description,
//     image: product.imageUrl,
//   };
// }

// // Simulate a fetch call (replace with actual API call)
// async function fetchProductDetails(productId: string) {
//   // This is just a mock, in real code, you would fetch data from an API or a database
//   return {
//     name: `Product ${productId}`,
//     description: `This is the description for Product ${productId}`,
//     imageUrl: `/images/product-${productId}.jpg`,
//   };
// }

// const ProductPage = () => {
//   const router = useRouter();
//   const { productId } = router.query;

//   if (!productId) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Product {productId}</h1>
//       <p>This is a detailed page for product {productId}.</p>
//     </div>
//   );
// };

// export default ProductPage;

// Explanation of Dynamic Metadata:

// generateMetadata: This function is called when rendering the page. It uses the productId parameter (from the URL) to fetch the specific product's details (like its name, description, and image).

// Dynamic Content: Instead of static metadata, the metadata changes based on the productId, so each product page will have unique metadata.

// Summary of How Metadata Works:

// Layout Metadata: Is global and applies to all pages within the layout unless overridden by page-specific metadata.

// Page-Specific Metadata: Can override layout metadata. If you set metadata in a specific page, it will replace the layout metadata for matching properties.

// Dynamic Metadata: Allows for metadata to be generated on the fly, based on the page’s content or dynamic parameters like productId.

// if the component is client component for example: 

// page.tsx: This file will handle the metadata and serve as the server-side part of the page. It defines static metadata and manages the structure of the page.

// counter.tsx: This file will be the client-side component that handles dynamic behavior (e.g., updating the counter). You will import and use this component in page.tsx.

// Folder Structure:
// /pages
//   /count
//     - page.tsx         // Server-side metadata
//     - counter.tsx      // Client-side component

// 1. page.tsx (Server-Side Metadata)

// Here, we'll define the metadata for the Count page (the page that contains the counter).

// // pages/count/page.tsx
// import { metadata } from './metadata'; // Static metadata if needed
// import dynamic from 'next/dynamic';

// // Dynamically import the Counter component (since it's client-side)
// const Counter = dynamic(() => import('./counter'), { ssr: false });

// export const metadata = {
//   title: 'Count Page',
//   description: 'This is a page with a counter component.',
// };

// const CountPage = () => {
//   return (
//     <div>
//       <h1>Welcome to the Count Page!</h1>
//       <p>Here you can see a counter that updates dynamically.</p>

//       {/* Render the dynamic client-side Counter component */}
//       <Counter />
//     </div>
//   );
// };

// export default CountPage;


// In this example:

// Server-Side: The metadata for the page is defined and exported from page.tsx. This metadata includes the title and description for the page.

// Client-Side: The Counter component is dynamically imported using next/dynamic. This means it will only be loaded on the client-side, and it won't be rendered server-side (ssr: false).

// 2. counter.tsx (Client-Side Component)

// This is where the actual client-side code for the counter will live. The counter will use React state to handle the dynamic updates.

// // pages/count/counter.tsx
// 'use client'; // This directive ensures that the component runs on the client side only

// import { useState } from 'react';

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => setCount(count + 1);
//   const decrement = () => setCount(count - 1);

//   return (
//     <div>
//       <h2>Counter: {count}</h2>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// };

// export default Counter;


// In this example:

// 'use client': The "use client" directive is used to indicate that this component is client-side only. This makes sure the component only runs on the client and doesn’t get rendered on the server.

// Stateful Component: The counter uses React's useState hook to manage the count state. It has two buttons that increment and decrement the count.

// Key Points:

// Dynamic Import: The Counter component is imported dynamically using next/dynamic with { ssr: false } to ensure it only runs on the client side. This helps keep the server-rendered page minimal and allows client-side interactivity.

// Metadata on the Server: The metadata (like title and description) is handled in the page.tsx file, which is executed on the server. This is useful for SEO, social sharing, and other metadata-related tasks.

// Separation of Concerns: You separate client-side logic (the counter) from the server-side logic (the metadata and page layout). This keeps things clean and modular.

// Final Folder Structure:
// /pages
//   /count
//     - page.tsx       // Server-side metadata & layout
//     - counter.tsx    // Client-side dynamic counter

// When You Visit /count:

// The server will serve the page.tsx, which includes the metadata for the page and the layout.

// The Counter component will be dynamically loaded on the client side (after the page is rendered on the client), and it will handle dynamic interactions like incrementing or decrementing the counter.

// This setup should work as expected! The client-side behavior is isolated in the counter.tsx, while the metadata and static content (e.g., page structure, title, etc.) live in page.tsx.

// for other learning visit this 
// https://nextjs.org/docs/app/getting-started/metadata-and-og-images
//https://nextjs.org/learn/dashboard-app/adding-metadata
 
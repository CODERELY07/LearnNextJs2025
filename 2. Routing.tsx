// Next js has file system based routing
// Url you can access based on how you organized you folder and file name
// 1. Routing
// 1.1 Simple Routing
// Routing Convention
// 1. Folder name becomes a route
// 2. File name must named either page.tsx or page.jsx
// 3. Each folder represent a segment of the url Path

// Example:
// app
//  ├── about
//  │    └── page.tsx          => /about
//  ├── blog
//  │    ├── [slug]
//  │    │    └── page.tsx     => /blog/:slug
//  │    └── page.tsx          => /blog
//  └── page.tsx               => / (home page default page ) 


// Example page in page.tsx
// export default function HomePage() {
//   return (
//     <>
//       <h1>Welcome to the Home Page</h1>
//     </>
//   );
// }

// Your challenge is create about page and blog page with dynamic route for blog post

// layout.tsx is used to create common layout for all page in the folder, this automatically created when run the app

// 1.2 Nested Routing
// Nested routing allows you to create more complex URL structures by organizing your app directory structure in a hierarchical way.

// Example:
// app
//  ├── dashboard   
//  │    ├── analytics
//  │    │    └── page.tsx        => /dashboard/analytics
//  │    ├── settings
//  │    │    └── page.tsx        => /dashboard/settings
//  │    └── page.tsx             => /dashboard
//  └── page.tsx                  => / (home page)

// 1.3 Dynamic Routing
// Dynamic routing allows you to create routes that can handle variable segments in the URL.
// You can define dynamic segments by using square brackets [] in your folder or file names.

// Example:
// app
//  ├── products
//  │    ├── [productId]    
//  │    │    └── page.tsx        => /products/:productId
//  │    └── page.tsx             => /products
//  └── page.tsx                  => / (home page)
// In the above example, [productId] is a dynamic segment that can match any value in that part of the URL.

// In the dynamic page component, you can access the dynamic segment using the useParams hook from 'next/navigation'.


// example below will example use params to get the dynamic route value in server component 
// export default async function Page({
//   params,
// }: {
//   params: Promise<{ productId: string }>
// }) {
//   const { productId } = await params
//   return <div>My Post: {productId}</div>
// }

// in client side use this
// 'use client'
// import { use } from 'react'
 
// export default function BlogPostPage({
//   params,
// }: {
//   params: Promise<{ productId: string }>
// }) {
//   const { productId } = use(params)
 
//   return (
//     <div>
//       <p>{productId}</p>
//     </div>
//   )
// }

// 1.4 Nested Dynamic Routing
// You can also combine nested routing with dynamic segments to create more complex URL structures.

// Example:
// app
//  ├── products   
//  │    ├── [productId]
//  │    │    ├── reviews
//  │    │    │    └── [reviewId]
//  │    │    │         └── page.tsx    => /products/:productId/reviews/:reviewId
//  │    │    └── page.tsx              => /products/:productId
//  │    └── page.tsx                   => /products
//  └── page.tsx                        => / (home page)
// In this example, [productId] and [reviewId] are dynamic segments nested within the products and reviews folders, respectively.

// In the nested dynamic page component, you can access both dynamic segments using the useParams hook from 'next/navigation'.

// Server component 

// const page = async({params} : {params: Promise<{productId: string, reviewId:string}>}) => {
//     const {productId, reviewId} = await params;
//     return (
//         <div>
//             <p>Review {reviewId} for Product {productId}</p>
//         </div>
//     );
// }

// Client component use useParams hook
// 'use client'
// import { useParams } from "next/navigation";

// const page = () => {
//     const {productId, reviewId} = useParams<{productId: string, reviewId: string}>();

//     return (
//         <div>
//             <p>Review {reviewId} for Product {productId}</p>
//         </div>
//     );

// }
// export default page;

//  1.5 Catch-All Routes
// Catch-all routes allow you to match multiple segments in a URL using the [...param] syntax in your folder or file names. This is useful for creating routes that can handle varying levels of depth in the URL structure.

// Example:
// app
//  ├── docs   
//  │    ├── [...slug]
//  │    │    └── page.tsx        => /docs/* (matches any path under /docs/)
//  │    └── page.tsx             => /docs
//  └── page.tsx                  => / (home page)

// In the above example, [...slug] is a catch-all segment that can match any number of segments in that part of the URL.

// In the catch-all page component, you can access the matched segments using the useParams hook from 'next/navigation'.

// Try to learn about cath-all route and implement it in your project - The best way is to create a docs page that can handle multiple levels of documentation pages.

// bonus: NotFound Route
// You can create a special not-found.tsx file in any folder to handle 404 errors for that specific route segment.
// Example:
// app
//  ├── docs   
//  │    ├── [...slug]
//  │    │    └── page.tsx        => /docs/* (matches any path under /docs/)
//  │    └── page.tsx             => /docs
//  └── page.tsx                  => / (home page)  
//  └── not-found.tsx             => custom 404 page for /docs route

// In this example, if a user navigates to a non-existent documentation page under /docs/, the custom 404 page defined in not-found.tsx will be displayed.

// Example not-found.tsx
// export default function NotFound() {
//     return (
//         <div>
//             <h1>404 - Page Not Found</h1>
//             <p>The page you are looking for does not exist.</p>
//         </div>
//     );
// }

// to use this NotFound component 
// import { notFound } from 'next/navigation';

// export default function Page({ params }: { params: { slug: string } }) {
//   const data = fetchData(params.slug);   
//   if (!data) {
//     notFound(); // This will trigger the not-found.tsx component
//   }
//   return <div>{data.content}</div>;
// }
// In the above example, if fetchData returns null or undefined, the notFound function is called, which triggers the custom 404 page.

// Another example
// products/[productId]/reviews/[reviewId]/page.tsx
// Server component 


// const page = async({params} : {params: Promise<{productId: string, reviewId:string}>}) => {
//     const {productId, reviewId} = await params;
//     return (
//         <div>
//             <p>Review {reviewId} for Product {productId}</p>
//         </div>
//     );
// }


// Another example
// Below check if rebiewId is greater than 1000 then show not found page
// products/[productId]/reviews/[reviewId]/page.tsx
// 'use client'
// import { notFound, useParams } from "next/navigation";

// const page = () => {
//     const {productId, reviewId} = useParams<{productId: string, reviewId: string}>();

//     if(parseInt(reviewId) > 1000){
//          notFound();
//     }
//     return (
//         <div>
//             <p>Review {reviewId} for Product {productId}</p>
//         </div>
//     );

// }
// export default page;

// // products/[productId]/reviews/[reviewId]/not-found.tsx
// 'use client'
// import { usePathname } from "next/navigation"

// const page = () => {
//   const pathname = usePathname();
// //   console.log(pathname);
//   const productId = pathname.split('/')[2];
//   const reviewId = pathname.split('/')[4];

//   return (
//     <div>
//      Review {reviewId} for Product {productId} Not Found
//     </div>
//   )
// }

// export default page

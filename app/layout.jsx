
// import Navbar from "./components/Navbar";
// import SessionProviderWrapper from "./components/SessionProviderWrapper";
// import "./globals.css"

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <main className="flex flex-col items-center justify-center">
//           <SessionProviderWrapper>
//             <Navbar />
//             {children}
//           </SessionProviderWrapper>
//         </main>
//       </body>
//     </html>
//   );
// }


import Navbar from "./components/Navbar";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
        <SessionProviderWrapper>
          <Navbar />
          <main className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-12 py-8">
            {children}
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
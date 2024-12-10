"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg rounded-lg">
      {/* Left: App Logo */}
      <div className="flex items-center">
       <Link href="/">
       <Image
          src="/image.png"  // Path to the image inside the public folder
          alt="App Logo"    // Alternative text for the image
          width={100}         // Width of the logo
          height={50}        // Height of the logo
          className="ml-8 rounded-full"  // Optional: add styles to the logo
        />
       </Link>
      </div>

      {/* Right: User Menu */}
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            {/* CREATE Link */}
            <Link
              href="/create"
              className="text-sm font-semibold bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            >
              CREATE
            </Link>
            {/* Sign Out Button */}
            <button
              onClick={() => signOut()}
              className="text-sm font-semibold bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all duration-300"
            >
              SIGN OUT
            </button>
            {/* User Profile Icon */}
            <img
              src={session.user.image || "/default-avatar.png"}
              alt={session.user.name || "User Avatar"}
              className="w-10 h-10 rounded-full border-2 border-white shadow-md hover:scale-110 focus:ring-2 focus:ring-indigo-300 transition-transform duration-300"
            />
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="text-sm font-semibold bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
          >
            SIGN IN
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// "use client";

// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";

// const Navbar = () => {
//   const { data: session } = useSession();

//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl rounded-lg">
//       {/* Left: App Logo */}
//       <div className="flex items-center space-x-4">
//         <h1 className="text-3xl font-bold tracking-tight cursor-pointer hover:text-yellow-300 transition-all">
//           <Link href="/">LOGO</Link>
//         </h1>
//       </div>

//       {/* Right: User Menu */}
//       <div className="flex items-center space-x-6">
//         {session ? (
//           <>
//             {/* CREATE Link */}
//             <Link
//               href="/create"
//               className="text-sm font-medium bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-200 transition-all duration-300"
//             >
//               CREATE
//             </Link>
//             {/* Sign Out Button */}
//             <button
//               onClick={() => signOut()}
//               className="text-sm font-medium bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
//             >
//               SIGN OUT
//             </button>
//             {/* User Profile Icon */}
//             <img
//               src={session.user.image || "/default-avatar.png"}
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-300"
//             />
//           </>
//         ) : (
//           <button
//             onClick={() => signIn("github")}
//             className="text-sm font-medium bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-200 transition-all duration-300"
//           >
//             SIGN IN
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

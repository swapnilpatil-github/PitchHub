"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const CreatePitch = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pitchArticle, setPitchArticle] = useState("");
  const [category, setCategory] = useState("");
  const [imgURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const validateForm = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return false;
    }
    // if (!imgURL.trim() || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(imgURL)) {
    //   setError("Please provide a valid image URL.");
    //   return false;
    // }
    if (!imgURL.trim() || !/^https?:\/\/.+(\?[\w&=]*)?$/i.test(imgURL)) {
      setError("Please provide a valid image URL.");
      return false;
    }
    
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const pitch = { title, description, pitchArticle, category, imgURL };
      const response = await axios.post("/api/pitches", pitch, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (response.status === 201) {
        alert("Pitch created successfully!");
        setTitle("");
        setDescription("");
        setPitchArticle("");
        setCategory("");
        setImageURL("");
        router.push("/");
      }
    } catch (err) {
      // console.error("Error creating pitch:", err);
      setError(err.response?.data?.message || "Error creating pitch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-blue-800 text-center">Create Your Startup Pitch</h1>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your startup title"
            required
            aria-label="Startup Title"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your startup idea"
            rows="5"
            required
            aria-label="Startup Description"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Tech, Health, Education..."
            required
            aria-label="Startup Category"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="imgURL" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <Input
            id="imgURL"
            value={imgURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="e.g., https://example.com/image.jpg"
            required
            aria-label="Image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="pitchArticle" className="block text-sm font-medium text-gray-700">
            Pitch Article
          </label>
          <MDEditor
            value={pitchArticle}
            onChange={setPitchArticle}
            className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Pitch Article Editor"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-green-400 rounded-lg hover:from-blue-600 hover:to-green-500 disabled:opacity-50 font-semibold"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full mr-2"></span>
              Submitting...
            </span>
          ) : (
            "Submit Pitch"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePitch;


// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import dynamic from "next/dynamic";

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// const CreatePitch = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [pitchArticle, setPitchArticle] = useState("");
//   const [category, setCategory] = useState("");
//   const [imgURL, setImageURL] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   // Redirect unauthenticated users after rendering
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/"); // Redirect to home if unauthenticated
//     }
//   }, [status, router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const pitch = { title, description, pitchArticle, category, imgURL };
      

//       const response = await axios.post("/api/pitches", pitch, {
//         headers: {
//           Authorization: `Bearer ${session?.accessToken}`,
//         },
//       });

//       if (response.status === 201) {
//         alert("Pitch created successfully!");
//         setTitle("");
//         setDescription("");
//         setPitchArticle("");
//         setCategory("");
//         setImageURL("");
//         router.push("/");
//       }
//     } catch (err) {
//       console.error("Error creating pitch:", err);
//       setError(err.response?.data?.message || "Error creating pitch. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "unauthenticated") {
//     return null;
//   }

//   return (
//     <section className="max-w-4xl mx-auto p-8">
//       <h1 className="text-2xl font-bold mb-6">Create Your Startup Pitch</h1>
//       {error && <div className="mb-4 text-red-500">{error}</div>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium">
//             Title
//           </label>
//           <Input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter your startup title"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium">
//             Description 
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border rounded text-black"
//             placeholder="Describe your startup idea"
//             rows="5"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="category" className="block text-sm font-medium">
//             Category
//           </label>
//           <Input
//             id="category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             placeholder="Startup Category (Tech, Health, Education...)"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="imgURL" className="block text-sm font-medium">
//             Image URL
//           </label>
//           <Input
//             id="imgURL"
//             value={imgURL}
//             onChange={(e) => setImageURL(e.target.value)}
//             placeholder="Image URL (e.g., https://example.com/image.jpg)"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="pitchArticle" className="block text-sm font-medium">
//             Pitch
//           </label>
//           <MDEditor
//             value={pitchArticle}
//             onChange={setPitchArticle}
//             className="bg-white border rounded"
//             preview="edit"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Pitch"}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default CreatePitch;

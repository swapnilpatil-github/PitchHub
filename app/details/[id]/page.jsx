"use client";

import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewUpdated, setViewUpdated] = useState(false);
  const [views, setViews] = useState(0);

  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       const response = await axios.get(`/api/pitches/${id}`);
        
  //       setDetails(response.data.data);

       
  //       setViews(response.data.data.views || 0)
  //     } catch (error) {
  //       setError("Failed to fetch pitch details. Please try again later.");
  //       // console.error("Error fetching pitch details:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDetails();

  //   const timeInterval = setInterval(() => {
  //     setTimeSpent((prevTime) => prevTime + 1);
  //   }, 1000);

  //   const scrollHandler = () => {
  //     setScrollPosition(window.scrollY);
  //   };

  //   window.addEventListener("scroll", scrollHandler);

  //   return () => {
  //     clearInterval(timeInterval);
  //     window.removeEventListener("scroll", scrollHandler);
  //   };
  // }, [id]);

  // useEffect(() => {
  //   const updateViewCount = async () => {
  //     if (!viewUpdated) {
  //       try {
  //         const response = await axios.post(`/api/updateviews/${id}`);
  //         if (response.data.updatedCount) {
  //           setViews(response.data.updatedCount); // Update with the new view count
  //           setViewUpdated(true); // Ensure we don't call the API again
  //         }
  //       } catch (error) {
  //         // console.error("Error updating views:", error);
  //         return error
  //       }
  //     }
  //   };

  //   if ((timeSpent >= 10 || scrollPosition >= 100 )&& !viewUpdated) {
  //     updateViewCount();
  //   }
  // }, [timeSpent, scrollPosition, id, viewUpdated]);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/pitches/${id}`);
        setDetails(response.data.data);
        setViews(response.data.data.views || 0);
      } catch (error) {
        setError("Failed to fetch pitch details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDetails();
  
    const timeInterval = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);
  
    const scrollHandler = () => {
      setScrollPosition(window.scrollY);
    };
  
    window.addEventListener("scroll", scrollHandler);
  
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [id]);
  
  useEffect(() => {
    const updateViewCount = async () => {
      if (!viewUpdated) {
        try {
          // Call the API once when the view time or scroll exceeds threshold
          const response = await axios.post(`/api/updateviews/${id}`);
          if (response.data.updatedCount) {
            setViews(response.data.updatedCount); // Update with the new view count
            setViewUpdated(true); // Ensure we don't call the API again
          }
        } catch (error) {
          // console.error("Error updating views:", error);
          return error
        }
      }
    };
  
    // Ensure view update happens after 10 seconds of time spent or 100px scroll
    if ((timeSpent >= 10 ) && !viewUpdated) {
      updateViewCount();
    }
  }, [timeSpent, id, viewUpdated]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <h1 className="ml-2 text-xl font-medium text-gray-700">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-red-500 text-xl">{error}</h1>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {details.imgURL && (
        //   <img
          
        //     src={details.imgURL}
        //     alt={details.title}
        //  className="w-full h-64 object-cover"
            
        //   />
        <Image
        src={details.imgURL}
        alt={details.title}
        width={500}  // Specify the width
        height={200}  // Specify the height
        className="object-cover"
        layout="responsive"
        objectFit="cover"
      />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{details.title}</h1>
          <p className="text-gray-700 mb-6">{details.description}</p>
          <div className="mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
              {details.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            <strong>Created At:</strong> {new Date(details.createdAt).toLocaleString()}
          </p>
          {/* <p className="text-gray-600 text-lg mb-4">
            <strong>Views:</strong> {views}
          </p> */}
          {/* <p className="text-gray-600 text-sm">
            <strong>Time Spent:</strong> {timeSpent} seconds
          </p> */}
          {/* <div className="relative h-2 bg-gray-200 rounded mt-4">
            <div
              style={{ width: `${Math.min(timeSpent, 100)}%` }}
              className="h-full bg-blue-500 rounded"
            ></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;


// "use client";

// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useState, useEffect } from "react";

// const Page = () => {
//   const { id } = useParams();
//   const [details, setDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [timeSpent, setTimeSpent] = useState(0);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const [viewUpdated, setViewUpdated] = useState(false);
//   const [views,setViews] = useState(0)
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const response = await axios.get(`/api/pitches/${id}`);
//         setDetails(response.data.data);
//         console.log(response.data.data)
//       } catch (error) {
//         setError("Failed to fetch pitch details. Please try again later.");
//         console.error("Error fetching pitch details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();

//     const timeInterval = setInterval(() => {
//       setTimeSpent((prevTime) => prevTime + 1);
//     }, 1000);

//     // Track scroll position
//     const scrollHandler = () => {
//       setScrollPosition(window.scrollY);
//     };

//     window.addEventListener("scroll", scrollHandler);

//     // Clean up interval and event listener
//     return () => {
//       clearInterval(timeInterval);
//       window.removeEventListener("scroll", scrollHandler);
//     };

    
//   }, [id]);

//   useEffect(() => {
//     const updateViewCount = async () => {
//       if (!viewUpdated) {
//         try {
//           // POST request to update view count
//           const response = await axios.post(`/api/updateviews/${id}`);
          
//           // Assuming the API response contains the updated count
//           const data = response.data;

//           if (data.updatedCount) {
//             setViews((prevViews) => prevViews + 1);
//             setViewUpdated(true); // Set viewUpdated to true to avoid redundant updates
//           }
//         } catch (error) {
//           console.error('Error updating views:', error);
//         }
//       }
//     };

//     // Check if user has spent enough time or scrolled enough
//     if (timeSpent >= 10 || scrollPosition >= 100) { // Example thresholds
//       updateViewCount();
//     }
//   }, [timeSpent, scrollPosition, id, viewUpdated]);


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="spinner-border animate-spin"></div> {/* Add spinner */}
//         <h1 className="ml-2">Loading...</h1>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500">
//         <h1>{error}</h1>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-2xl font-bold">{details.title}</h1>
//       <p className="mt-4">{details.description}</p>
//       <h1>Time spent : {timeSpent}</h1>
//       <p className="mt-4">{details.category}</p>
//       <h1>{views}</h1>
//       <p className="text-sm text-gray-500 mt-2">
//         Created At: {new Date(details.createdAt).toLocaleString()}
//       </p>
//     </div>
//   );
// };

// export default Page;

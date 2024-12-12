"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { useSession } from "next-auth/react";

const Display = () => {
  const {data:session} = useSession()
  const [pitches, setPitches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/pitches");
      
      const data = response?.data?.data;
      if (data) {
        setPitches(data);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError("Error fetching data");
      // console.error("Error fetching pitches:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      // console.log("Deleting pitch with ID:", id);
      const response = await axios.delete(`/api/pitches/${id}`);
      if (response.status === 200) {
        alert("Successfully Deleted");
        fetchData();
      }
    } catch (error) {
      alert("Error deleting pitch. Please try again.");
      // console.error("Error deleting pitch:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 tracking-wide">
        All Startups
      </h1>
      {isLoading ? (
        <div className="text-xl text-gray-700 animate-pulse text-center">
          Loading...
        </div>
      ) : error ? (
        <div className="text-xl text-red-500 font-medium text-center">{error}</div>
      ) : pitches && pitches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pitches.map((pitch) => (
            <CardComponent
              key={pitch._id}
              id={pitch._id}
              title={pitch?.title}
              description={pitch?.description}
              category={pitch?.category}
              pitchArticle={pitch?.pitchArticle}
              views={pitch?.views}
              imgURL={pitch?.imgURL}
              onDelete={() => handleDelete({ id: pitch._id })}
              showDeleteButton={session?.user?.email === pitch?.userEmail}
            />
          ))}
        </div>
      ) : (
        <div className="text-xl text-gray-700 text-center">No pitches found</div>
      )}
    </div>
  );
};

export default Display;

// "use client";

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import CardComponent from "./CardComponent";

// const Display = () => {
//   const [pitches, setPitches] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/api/pitches");
//       const data = response?.data?.data;
//       if (data) {
//         setPitches(data);
//       } else {
//         setError("No data found");
//       }
//     } catch (err) {
//       setError("Error fetching data");
//       console.error("Error fetching pitches:", err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async ({id}) => {
    
//     console.log("Deleting pitch with ID:", id)
//     const resposne = await axios.delete(`/api/pitches/${id}`)
//     if(resposne.status == 200){
//       alert("Successfully Deleted")
//     }
//     fetchData()
//   }

//   useEffect(() => {
//     fetchData();
   
//   }, []);

//   return (
//     <div className="bg-[#C8ACD6] min-h-screen p-8 flex flex-col items-center">
//       <h1 className="text-4xl font-bold text-[#17153B] mb-8">ALL STARTUPS</h1>
//       {isLoading ? (
//         <div className="text-xl text-[#17153B]">Loading...</div>
//       ) : error ? (
//         <div className="text-xl text-red-600">{error}</div>
//       ) : pitches && pitches.length > 0 ? (
//         <div className="flex flex-wrap gap-6 justify-center">
//           {pitches.map((pitch) => (
//             <CardComponent
//               key={pitch._id}
//               id={pitch._id}
//               title={pitch.title}
//               description={pitch.description}
//               category={pitch?.category}
//               onDelete={()=>handleDelete({id:pitch._id})}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-xl text-[#17153B]">No pitches found</div>
//       )}
//     </div>
//   );
// };

// export default Display;

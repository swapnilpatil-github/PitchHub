// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";

// const CardComponent = ({ title, description, id, onDelete, pitchArticle,imgURL ,views ,showDeleteButton}) => {
//   return (
//     <Card className="w-full rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//       {/* Header */}
//       <CardHeader className="p-4 bg-white border-b">
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
//           <span className="text-gray-500 text-sm">{views} views</span>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">{description}</p>
//       </CardHeader>

//       {/* Content */}
//       <CardContent className="p-4">
//         <p className="text-sm text-gray-700 mb-2">
//           <b>Category:</b> {pitchArticle || "N/A"}
//         </p>
//         <p className="text-sm text-gray-700">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
//           fuga!
//         </p>
//       </CardContent>

//       {/* Footer */}
//       <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
//         {
//           showDeleteButton && (
//             <Button
//           className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 transition-colors duration-300"
//           onClick={onDelete}
//         >
//           Delete
//         </Button>
//           )
//         }
//         <Link
//           href={`/details/${id}`}
//           className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
//         >
//           View Details
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// };

// export default CardComponent;


// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";
// import Image from "next/image"; // Import the Next.js Image component

// const CardComponent = ({ title, description, id, onDelete, category ,pitchArticle, imgURL, views, showDeleteButton }) => {
//   return (
//     <Card className="w-full rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//       {/* Header */}
//       <CardHeader className="p-4 bg-white border-b">
//         <div className="flex justify-between items-center">
//           <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
//           <span className="text-gray-500 text-sm">{views} views</span>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">{description}</p>
//       </CardHeader>

//       {/* Image */}
//       {imgURL && (
//         <div className="w-full h-64 relative">
//           <Image
//             src={imgURL}
//             alt={title || "Image"}
//             layout="fill"
//             objectFit="cover"
//             className="rounded-t-lg"
//             priority={true} // Optional: To load images eagerly
//           />
//         </div>
//       )}

//       {/* Content */}
//       <CardContent className="p-4">
//         <p className="text-sm text-gray-700 mb-2">
//           <b>Category:</b> {category || "N/A"}
//         </p>
        
//       </CardContent>

//       {/* Footer */}
//       <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
//         {showDeleteButton && (
//           <Button
//             className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 transition-colors duration-300"
//             onClick={onDelete}
//           >
//             Delete
//           </Button>
//         )}
//         <Link
//           href={`/details/${id}`}
//           className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
//         >
//           View Details
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// };

// export default CardComponent;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const CardComponent = ({ title, description, id, onDelete, category, pitchArticle, imgURL, views, showDeleteButton }) => {
  const truncateText = (text, length) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <Card className="w-full rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <CardHeader className="p-4 bg-white border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800">{truncateText(title, 30)}</CardTitle>
          <span className="text-gray-500 text-sm">{views} views</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{truncateText(description, 60)}</p>
      </CardHeader>

      {/* Image */}
      <div className="w-full h-64 relative">
        {imgURL ? (
          <Image
            src={imgURL}
            alt={title || "Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            priority={true}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <p className="text-sm text-gray-700 mb-2">
          <b>Category:</b> {category || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          {truncateText(pitchArticle, 100)}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
        {showDeleteButton && (
          <Button
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 transition-colors duration-300"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
        <Link
          href={`/details/${id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;

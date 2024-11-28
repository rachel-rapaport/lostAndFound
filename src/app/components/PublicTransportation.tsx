// import React, { useState } from "react";

// export const PublicTransportation = () => {
//   const [isCityBus, setIsCityBus] = useState(false);
//   const [isOutBus, setIsOutBus] = useState(false);

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked } = e.target as HTMLInputElement;

//     setIsCityBus(e.target.checked);
//   };

//   return (
//     <div>
//       <div className="flex items-center pt-8">
//         <input
//           type="checkbox"
//           id="bus"
//           name="bus"
//           value=" האם הפריט נאבד בתחבורה ציבורית?"
//           checked={isCityBus}
//           onChange={handleCheckboxChange}
//           className="h-4 w-4 text-indigo-600 border-gray-300 rounded "
//         />
//         <label htmlFor="bus" className="block text-sm text-gray-700 font-bold">
//           אוטובוס עירוני{" "}
//          </label>
//       </div>

//       <div className="flex items-center pt-8">
//         <input
//           type="checkbox"
//           id="bus"
//           name="bus"
//           value=" האם הפריט נאבד בתחבורה ציבורית?"
//           checked={isOutBus}
//           onChange={handleCheckboxChange}
//           className="h-4 w-4 text-indigo-600 border-gray-300 rounded "
//         />
//         <label htmlFor="bus" className="block text-sm text-gray-700 font-bold">
//           אוטובוס עירוני{" "}
//          </label>
//       </div>
//     </div>
//   );
// };

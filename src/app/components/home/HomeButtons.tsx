import { useRouter } from "next/navigation";
import React from "react";

const HomeButtons: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-x-14 my-10">
      {/* כפתור דיווח על אבידה */}
      <button className="bg-primary font-extrabold text-xl py-6 px-16 rounded-full border-4 border-secondary shadow-2xl transform transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      onClick={()=> router.replace("/lost-item")}>
        דיווח על אבידה
      </button>

      {/* כפתור דיווח על מציאה */}
      <button className="bg-primary font-extrabold text-xl py-6 px-16 rounded-full border-4 border-secondary shadow-2xl transform transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      onClick={()=> router.replace("/found-item")}>
        דיווח על מציאה
      </button>
    </div>
  );
};

export default HomeButtons;

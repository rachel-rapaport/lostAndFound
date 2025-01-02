"use client";

import React, { useEffect } from "react";
import HomeButtons from "./home/HomeButtons";
import Video from "./home/Video";

const Homepage = () => {
  useEffect(() => {
    // גלילה אוטומטית למטה אחרי טעינת העמוד
    window.scrollTo({
      top: 100, // גולל ב-500 פיקסלים
      behavior: "smooth", // גלילה חלקה
    });
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="relative flex justify-center top-1">
        <Video />
        {/* כפתור חץ מרחף מעל הסרטון */}
        {/* <button
          onClick={() => {
            const nextSection = document.getElementById("next-section");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white bg-primary rounded-full p-4 shadow-lg hover:scale-110 transition-all"
        >
          <span className="text-3xl">&#8595;</span> 
        </button> */}
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2  text-secondary bg-transparent    hover:scale-110 transition-all animate-updown "
        >
          <svg
            className="w-16 h-16 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3" // הגדרתי את העובי של החץ
          >
            <path d="M12 4v16M5 13l7 7 7-7" />
          </svg>
        </button>
      </div>

      {/* מקטע "המשך העמוד" מתחת לסרטון */}
      <div id="next-section" >
        {/* תוכן נוסף או קו */}
        <HomeButtons/>
      </div>
    </>
  );
};

export default Homepage;

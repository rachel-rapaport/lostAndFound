"use client";
import React from "react";
import userStore from "../store/userStore";

const UserDashboard: React.FC = () => {
  const currentUser = userStore((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Section */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md order-last lg:order-first">
          <h2 className="text-2xl font-semibold">פרטים אישיים:</h2>
          <div className="space-y-4 mt-4">
            <p>
              <strong>שם מלא:</strong> {currentUser?.fullName}
            </p>
            <p>
              <strong>כתובת דואר אלקטרוני:</strong> {currentUser?.email}
            </p>
            <p>
              <strong>טלפון:</strong> {currentUser?.phone}
            </p>
            <p>
              <strong>סיסמה:</strong> {currentUser?.password}
            </p>
            <button className="primary-btn px-8 py-2 font-semibold text-black rounded-md hover:primary">
              עריכת הפרטים האישיים
            </button>
          </div>
        </div>

        {/* Items Section */}
        <div className="col-span-2 space-y-6">
          {/* Lost Items Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">פריטים שאבדו</h2>
            {currentUser?.lostItems && currentUser?.lostItems.length > 0 ? (
              <div className="space-y-4 mt-4">
                {currentUser.lostItems.map((item) => (
                  <div
                    key={item._id.toString()}
                    className="border border-gray-200 p-4 rounded-md"
                  >
                    <h3 className="font-semibold">
                      {item.subCategoryId.title}
                    </h3>
                    <p className="text-gray-500">{item.colorId.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">לא נמצאו פריטים.</p>
            )}
          </div>

          {/* Found Items Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">פריטים שנמצאו</h2>
            {currentUser?.foundItems && currentUser?.foundItems.length > 0 ? (
              <div className="space-y-4 mt-4">
                {currentUser.foundItems.map((item) => (
                  <div
                    key={item._id.toString()}
                    className="border border-gray-200 p-4 rounded-md"
                  >
                    <h3 className="font-semibold">
                      {item.subCategoryId.title}
                    </h3>
                    <p className="text-gray-500">{item.descripition}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">לא נמצאו פריטים.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

import { User, MapPin, IndianRupee, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import profileImg from "./assets/unnamed.jpg";

export default function Profile() {
    const [imgLoaded, setImgLoaded] = useState(false);

useEffect(() => {
  const img = new Image();
  img.src = profileImg;
  img.onload = () => setImgLoaded(true);
}, []);
  const navigate = useNavigate();

  const savedPlan = JSON.parse(localStorage.getItem("selectedPlan"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Profile Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          {imgLoaded ? (
  <div className="p-[2px] rounded-full bg-gradient-to-r from-green-400 to-blue-500">
    <img
      src={profileImg}
      alt="profile"
      className="w-14 h-14 rounded-full"
    />
  </div>
) : (
  <div className="w-14 h-14 rounded-full bg-gray-700 animate-pulse" />
)}
          <div>
           <h2 className="text-xl font-semibold transition-opacity duration-500">
  Lucky The Racer
</h2>
            <p className="text-gray-400 flex items-center gap-1">
              <MapPin size={14} /> Bhubaneswar
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm">
          Delivery Partner • Active since 2024
        </p>
      </div>

      {/* Plan Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Shield size={18} /> Active Plan
        </h2>

        {savedPlan ? (
          <>
            <p className="text-gray-300">Plan: {savedPlan.name}</p>
            <p className="text-gray-300 flex items-center gap-1">
              Premium: <IndianRupee size={14} /> {savedPlan.price}/week
            </p>
          </>
        ) : (
          <p className="text-gray-400">No plan selected</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-xl text-center border border-white/10">
          <p className="text-gray-400 text-sm">Total Earned</p>
          <h3 className="text-lg font-semibold text-green-400">₹ 5400</h3>
        </div>

        <div className="bg-white/5 p-4 rounded-xl text-center border border-white/10">
          <p className="text-gray-400 text-sm">Payouts Received</p>
          <h3 className="text-lg font-semibold text-green-400">₹ 900</h3>
        </div>
      </div>
    </div>
  );
}
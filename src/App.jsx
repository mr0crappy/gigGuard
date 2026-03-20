import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "./assets/unnamed.jpg";
import {
  User,
  MapPin,
  Wallet,
  Shield,
  AlertTriangle,
  CloudRain,
  Wind,
  Thermometer,
  Activity,
  IndianRupee,
  Sparkles
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function App() {
  const navigate = useNavigate();

  // Profile image preload
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = profileImg;
    img.onload = () => setImgLoaded(true);
  }, []);

  const savedPlan = JSON.parse(localStorage.getItem("selectedPlan") || "null");
  const basePremium = savedPlan?.price || 120;

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPayout, setSelectedPayout] = useState(null);

  const conditions = { rain: 68, aqi: 410, temp: 39 };

  const riskScore = Math.min(
    (conditions.rain > 20 ? 0.3 : 0) +
    (conditions.aqi > 300 ? 0.4 : 0) +
    (conditions.temp > 40 ? 0.3 : 0),
    1
  );

  const getRiskLabel = () => {
    if (riskScore > 0.7) return "High Risk";
    if (riskScore > 0.4) return "Moderate Risk";
    return "Low Risk";
  };

  const payouts = [];
  if (conditions.rain > 50)
    payouts.push({ reason: "Heavy Rain", amount: basePremium * 2 });
  if (conditions.aqi > 300)
    payouts.push({ reason: "High AQI", amount: basePremium * 1.5 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[150px] top-0 left-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] bottom-0 right-0"></div>

      {/* ALERT */}
      {riskScore > 0.5 && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 animate-pulse">
          <AlertTriangle className="text-red-400" />
          High disruption risk detected — payouts may trigger automatically
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6 z-10 relative">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="text-green-400" />
          AI Insurance
        </h1>

        <button
          onClick={() => navigate("/profile")}
          className="text-sm text-gray-300 hover:text-white"
        >
          Profile
        </button>
      </div>

      {/* Profile Card */}
      <Glass
        onClick={() => navigate("/profile")}
        className="cursor-pointer hover:bg-white/10 transition hover:scale-[1.02]"
      >
        <div className="flex items-center gap-4">
          {imgLoaded ? (
            <div className="p-[2px] rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]">
              <img
                src={profileImg}
                className="w-12 h-12 rounded-full opacity-0 animate-[fadeIn_0.5s_forwards]"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse" />
          )}

          <div>
            <h2 className="font-semibold">Lucky The Racer</h2>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              <MapPin size={14} /> Bhubaneswar
            </p>
            <p className="text-xs text-gray-500 mt-1">View Profile →</p>
          </div>
        </div>
      </Glass>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-4 mt-6 auto-rows-fr">
        <Card title="Premium" value={basePremium} icon={<Wallet />} isCurrency />
        <Card title="Coverage" value={1000} icon={<Shield />} isCurrency />
        <Card title="Risk" value={riskScore.toFixed(2)} icon={<AlertTriangle />} highlight />
        <Card title="Protected Income" value={basePremium * 5} icon={<IndianRupee />} isCurrency />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Glass>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { name: "Premium", value: basePremium },
              { name: "Coverage", value: 1000 }
            ]}>
              <CartesianGrid stroke="#222" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip cursor={false} contentStyle={{ backgroundColor: "#111", borderRadius: "10px" }} />
              <Bar dataKey="value" fill="#4ade80" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Glass>

        <Glass>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={[
              { w: "W1", r: 0.2 },
              { w: "W2", r: 0.3 },
              { w: "W3", r: 0.4 },
              { w: "W4", r: 0.3 },
            ]}>
              <CartesianGrid stroke="#222" />
              <XAxis dataKey="w" stroke="#888" />
              <YAxis stroke="#888" domain={[0, 1]} />
              <Tooltip cursor={false} contentStyle={{ backgroundColor: "#111" }} />
              <Line type="monotone" dataKey="r" stroke="#facc15" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Glass>
      </div>

      {/* Conditions */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Glass><Condition label="Rain" value={conditions.rain} icon={<CloudRain />} /></Glass>
        <Glass><Condition label="AQI" value={conditions.aqi} icon={<Wind />} /></Glass>
        <Glass><Condition label="Temp" value={conditions.temp} icon={<Thermometer />} /></Glass>
      </div>

      {/* AI Insight */}
      <Glass className="mt-6">
        <div className="flex items-center gap-2 text-green-400 mb-2">
          <Sparkles size={16} /> AI Insight
        </div>

        <p className="text-gray-300 text-sm">
          High AQI indicates <span className="text-red-400 font-semibold">{getRiskLabel()}</span>.
        </p>

        {/* Confidence Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-800 h-2 rounded-full">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-red-500"
              style={{ width: `${riskScore * 100}%` }}
            />
          </div>
        </div>
      </Glass>
    </div>
  );
}

/* Components */

function Glass({ children, className = "", ...props }) {
  return (
    <div {...props} className={`p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

function Card({ title, value, icon, isCurrency, highlight }) {
  return (
    <div className={`p-5 rounded-2xl bg-white/5 border border-white/10 hover:scale-[1.05] transition ${highlight ? "bg-red-500/20" : ""}`}>
      <div className="mb-2 text-blue-400">{icon}</div>
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-bold">
        {isCurrency && "₹"} {value}
      </h2>
    </div>
  );
}

function Condition({ label, value, icon }) {
  return (
    <div className="text-center">
      <div className="mb-2">{icon}</div>
      <p className="text-gray-400 text-sm">{label}</p>
      <h3 className="text-lg font-semibold">{value}</h3>
    </div>
  );
}
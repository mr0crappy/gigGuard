import { useNavigate } from "react-router-dom";
import { IndianRupee, Shield, Zap, Crown } from "lucide-react";


export default function Plans() {
  const navigate = useNavigate();

 const plans = [
  {
    name: "Basic",
    price: 79,
    icon: "shield",
    color: "from-green-500 to-green-700",
  },
  {
    name: "Pro",
    price: 120,
    icon: "zap",
    color: "from-yellow-500 to-orange-600",
  },
  {
    name: "Elite",
    price: 199,
    icon: "crown",
    color: "from-purple-500 to-pink-600",
  },
];

  const handleSelect = (plan) => {
    // ✅ Save plan
    localStorage.setItem("selectedPlan", JSON.stringify(plan));

    // ✅ Navigate
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        Choose Your Plan
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl bg-gradient-to-br ${plan.color} hover:scale-105 transition`}
          >
            <div className="text-3xl mb-4">{
  plan.icon === "shield" && <Shield />
}
{
  plan.icon === "zap" && <Zap />
}
{
  plan.icon === "crown" && <Crown />
}</div>

            <h2 className="text-2xl font-bold">{plan.name}</h2>

            <p className="flex items-center gap-1 text-lg my-3">
              <IndianRupee size={16} /> {plan.price}/week
            </p>

            <button
  onClick={() => {
    console.log("CLICK WORKS");
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    navigate("/dashboard");
  }}
>
  Select Plan
</button>
          </div>
        ))}
      </div>
    </div>
  );
}
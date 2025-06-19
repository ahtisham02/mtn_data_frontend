import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  BarChart,
  Bar,
  LabelList,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import {
  CheckCircle,
  ChevronRight,
  Server,
  Cpu,
  Clock,
  BarChart2,
  Activity,
  Shield,
  Database,
  Layers,
  ArrowUp,
  ArrowDown,
  Zap,
  XCircle,
  ArrowRight,
  Building2,
} from "lucide-react";
import { apiData, collections, packages } from "../../utils/data";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PUBLISHABLE_KEY?.startsWith("pk_")
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        className="text-2xl font-bold fill-foreground"
      >
        {value.toLocaleString()}
      </text>
      <text
        x={cx}
        y={cy + 10}
        dy={8}
        textAnchor="middle"
        className="text-sm fill-muted-foreground"
      >
        {(percent * 100).toFixed(2)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="drop-shadow-md"
      />
    </g>
  );
};

const ResponseCodesPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_, index) => setActiveIndex(index);
  return (
    <div className="p-6 bg-card border border-border rounded-xl">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
        <Shield className="h-4 w-4" />
        Response Codes
      </h3>
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={65}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={entry.color}
                  stroke={entry.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-6 space-y-3">
        {data.map((item, index) => (
          <li
            key={item.name}
            className={`flex items-center gap-3 text-sm transition-opacity ${
              activeIndex === index ? "opacity-100" : "opacity-60"
            }`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-muted-foreground flex-1">{item.name}</span>
            <span className="font-semibold text-foreground">
              {item.value.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EndpointUsageChart = ({ data }) => {
  const colorScale = ["#a78bfa", "#9370db", "#805ad5", "#6b46c1", "#553c9a"];
  return (
    <div className="p-6 bg-card border border-border rounded-xl">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
        <Activity className="h-4 w-4" />
        Top Endpoints
      </h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
            barCategoryGap="25%"
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={100}
            />
            <Tooltip
              cursor={{ fill: "hsla(var(--accent) / 0.1)" }}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="p-2 bg-card border rounded-lg shadow-lg">
                    <p className="font-bold text-foreground">
                      {payload[0].payload.name}
                    </p>
                    <p className="text-muted-foreground">{`Requests: ${payload[0].value.toLocaleString()}`}</p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              <LabelList
                dataKey="value"
                position="right"
                formatter={(value) => value.toLocaleString()}
                className="fill-foreground font-semibold"
                fontSize={12}
              />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorScale[index % colorScale.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const LatencyDistributionChart = ({ data }) => (
  <div className="p-6 bg-card border border-border rounded-xl">
    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
      <Clock className="h-5 w-5 text-accent" />
      Latency Distribution
    </h2>
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "hsla(var(--accent) / 0.1)" }}
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Bar
            dataKey="requests"
            fill="url(#latencyGradient)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const RequestMethodsChart = ({ data }) => (
  <div className="p-6 bg-card border border-border rounded-xl">
    <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
      <Zap className="h-5 w-5 text-accent" />
      Request Methods
    </h2>
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={15}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar background dataKey="value" cornerRadius={10} />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ApiCallVolumeChart = ({ data }) => (
  <div className="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="label"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorVolume)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const StatusIndicator = ({ operational }) => (
  <span
    className={`flex items-center gap-1.5 ${
      operational
        ? "bg-green-500/10 text-green-400"
        : "bg-red-500/10 text-red-400"
    } text-xs font-medium px-2.5 py-1 rounded-full`}
  >
    {operational ? (
      <>
        <CheckCircle className="h-3.5 w-3.5" />
        Operational
      </>
    ) : (
      <>
        <Server className="h-3.5 w-3.5" />
        Down
      </>
    )}
  </span>
);

const StatCard = ({ icon, title, value, change, isPositive }) => {
  const IconComponent = icon;
  return (
    <div className="p-4 bg-card border border-border rounded-lg flex items-start gap-4">
      <div
        className={`p-2 rounded-lg ${
          isPositive
            ? "bg-green-500/10 text-green-500"
            : "bg-red-500/10 text-red-500"
        }`}
      >
        <IconComponent className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p
          className={`text-xs mt-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUp className="inline h-3 w-3" />
          ) : (
            <ArrowDown className="inline h-3 w-3" />
          )}{" "}
          {change}
        </p>
      </div>
    </div>
  );
};

const CollectionRow = ({ collection }) => {
  if (!collection.endpoints || collection.endpoints.length === 0) return null;
  const firstEndpointSlug = collection.endpoints[0].slug;
  return (
    <Link
      to={`/endpoint/${firstEndpointSlug}`}
      className="flex items-center justify-between p-4 -mx-4 rounded-lg hover:bg-accent/5 transition-colors group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-accent/10 text-accent">
          <Layers className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
            {collection.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {collection.endpoints.length} endpoints
          </p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
};

const PackageCard = ({ pkg, onCtaClick, isLoading, isCurrentPlan }) => {
  const IconComponent = pkg.icon;
  const isFreePlan = pkg.price === 0;

  return (
    <div
      className={`flex flex-col h-full p-6 transition-all duration-300 bg-white border rounded-2xl ${
        isCurrentPlan
          ? "border-accent shadow-accent/20 shadow-lg"
          : "border-border hover:shadow-2xl hover:-translate-y-2"
      }`}
    >
      {isCurrentPlan && (
        <div className="text-center py-1 px-4 bg-accent text-white text-xs font-bold rounded-full -mt-10 mx-auto mb-4">
          Current Plan
        </div>
      )}
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
          isFreePlan ? "bg-gray-100" : "bg-accent/10"
        }`}
      >
        {IconComponent && (
          <IconComponent
            className={`w-7 h-7 ${
              isFreePlan ? "text-muted-foreground" : "text-accent"
            }`}
          />
        )}
      </div>
      <h3 className="text-2xl font-bold text-foreground">{pkg.name}</h3>
      <div className="flex items-end mt-4">
        {typeof pkg.price === "number" ? (
          <>
            <span className="text-5xl font-extrabold text-foreground">
              ${pkg.price}
            </span>
            <span className="pb-1 ml-2 font-semibold text-muted">/Month</span>
          </>
        ) : (
          <span className="text-4xl font-extrabold text-foreground">
            {pkg.price}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-1 text-sm text-muted font-semibold">
        {pkg.details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
      <div className="flex flex-col flex-grow pt-8 mt-8 border-t border-border">
        <ul className="space-y-4">
          {pkg.features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-3">
              {feature.included ? (
                <CheckCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
              ) : (
                <XCircle className="flex-shrink-0 w-5 h-5 mt-0.5 text-rose-400" />
              )}
              <span
                className={
                  !feature.included
                    ? "text-muted line-through"
                    : "text-foreground"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        {pkg.rateLimit && (
          <p className="mt-6 text-xs font-semibold text-muted">
            {pkg.rateLimit}
          </p>
        )}
        <div className="mt-auto pt-8">
          <button
            onClick={onCtaClick}
            disabled={isCurrentPlan || isLoading}
            className={`flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg ${
              isCurrentPlan
                ? "bg-muted cursor-not-allowed"
                : "bg-accent hover:bg-accent-hover hover:shadow-xl"
            }`}
          >
            {isLoading
              ? "Processing..."
              : isCurrentPlan
              ? "Your Plan"
              : "Upgrade Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ApiAnalytics() {
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [apiStatus] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [currentPlanId] = useState("plan_free");
  const navigate = useNavigate();

  const standardPackages = packages.filter((p) => p.price !== "Custom");
  const customPackage = packages.find((p) => p.price === "Custom");

  const planToStripeCheckoutLinkUrl = useMemo(
    () => ({
      plan_pro: "https://buy.stripe.com/test_00w14n1CKaExcrrapJbfO01",
      plan_growth: "https://buy.stripe.com/test_8x27sL818cMFfDD1TdbfO02",
      plan_ultra: "https://buy.stripe.com/test_bJe00j6X45kd2QRapJbfO03",
    }),
    []
  );

  const handlePlanSelect = async (planId) => {
    const checkoutLinkUrl = planToStripeCheckoutLinkUrl[planId];
    if (!checkoutLinkUrl || checkoutLinkUrl.startsWith("YOUR_")) {
      toast.error("Stripe Checkout Link for this plan is not configured.");
      return;
    }
    setLoadingPlanId(planId);
    try {
      if (!stripePromise) {
        toast.error("Stripe configuration is missing. Payments are disabled.");
        throw new Error("Stripe is not initialized.");
      }
      window.location.href = checkoutLinkUrl;
    } catch (error) {
      toast.error("An unexpected error occurred while redirecting to payment.");
      setLoadingPlanId(null);
    }
  };

  const handleContactClick = () => {
    navigate("/", { state: { scrollTo: "booking" } });
  };

  const chartData = {
    "7d": [
      { label: "Mon", value: 1200 },
      { label: "Tue", value: 1800 },
      { label: "Wed", value: 1500 },
      { label: "Thu", value: 2100 },
      { label: "Fri", value: 2500 },
      { label: "Sat", value: 2300 },
      { label: "Sun", value: 3100 },
    ],
    "30d": Array(30)
      .fill(0)
      .map((_, i) => ({
        label: `${i + 1}`,
        value: Math.floor(Math.random() * 3000) + 500,
      })),
    "90d": Array(12)
      .fill(0)
      .map((_, i) => ({
        label: `Wk ${i + 1}`,
        value: Math.floor(Math.random() * 15000) + 5000,
      })),
  };
  const pieData = [
    { name: "2xx Success", value: 8934, color: "#22c55e" },
    { name: "3xx Redirect", value: 542, color: "#f59e0b" },
    { name: "4xx Client Error", value: 1042, color: "#f97316" },
    { name: "5xx Server Error", value: 213, color: "#ef4444" },
  ];
  const analyticsEndpointUsage = collections
    .flatMap((c) =>
      c.endpoints.map((e) => ({
        name: e.name,
        value: Math.floor(Math.random() * 2000) + 50,
      }))
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const latencyData = [
    { name: "< 50ms", requests: 4320 },
    { name: "50-100ms", requests: 5102 },
    { name: "100-200ms", requests: 2140 },
    { name: "200-500ms", requests: 980 },
    { name: "> 500ms", requests: 300 },
  ];
  const requestMethodsData = [
    { name: "GET", value: 9241, fill: "#8884d8" },
    { name: "POST", value: 2890, fill: "#82ca9d" },
    { name: "PUT", value: 450, fill: "#ffc658" },
    { name: "DELETE", value: 261, fill: "#ff8042" },
  ];
  const stats = [
    {
      icon: BarChart2,
      title: "Total Requests",
      value: "12,842",
      change: "12%",
      isPositive: true,
    },
    {
      icon: Cpu,
      title: "Avg Latency",
      value: "142ms",
      change: "8%",
      isPositive: true,
    },
    {
      icon: Clock,
      title: "Uptime",
      value: "99.98%",
      change: "0.02%",
      isPositive: true,
    },
    {
      icon: Server,
      title: "Errors",
      value: "125",
      change: "5%",
      isPositive: false,
    },
  ];

  return (
    <div className="space-y-8">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-accent/10 text-accent p-2 rounded-lg">
              <Database className="h-6 w-6" />
            </span>
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <span>Showing data for</span>
            <span className="font-medium text-foreground">{apiData.name}</span>
            <span>•</span>
            <span className="font-mono text-sm bg-accent/10 text-accent px-2 py-0.5 rounded">
              v{apiData.version}
            </span>
          </p>
        </div>
        <StatusIndicator operational={apiStatus} />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-8">
          <ResponseCodesPieChart data={pieData} />
          <EndpointUsageChart data={analyticsEndpointUsage} />
        </aside>
        <main className="flex-1 space-y-8 w-full">
          <section>
            <div className="p-6 bg-card border border-border rounded-xl">
              <div className="flex justify-between items-baseline mb-4">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-accent" />
                  API Call Volume
                </h2>
                <div className="flex gap-2">
                  {["7d", "30d", "90d"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`text-xs px-3 py-1 rounded-full ${
                        timeRange === range
                          ? "bg-accent/10 text-accent"
                          : "bg-card text-muted-foreground hover:bg-accent/5"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <ApiCallVolumeChart data={chartData[timeRange]} />
            </div>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LatencyDistributionChart data={latencyData} />
            <RequestMethodsChart data={requestMethodsData} />
          </div>
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" />
                API Collections
              </h2>
              <Link to="#" className="text-sm text-accent hover:underline">
                View All
              </Link>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl divide-y divide-border">
              {collections.map((c) => (
                <CollectionRow key={c.id} collection={c} />
              ))}
            </div>
          </section>
          <section id="billing">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Layers className="h-6 w-6 text-accent" />
              Billing & Plans
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {standardPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onCtaClick={() => handlePlanSelect(pkg.id)}
                  isLoading={loadingPlanId === pkg.id}
                  isCurrentPlan={currentPlanId === pkg.id}
                />
              ))}
            </div>
            {customPackage && (
              <div className="relative p-8 mt-8 overflow-hidden text-white transition-all duration-300 rounded-2xl bg-foreground hover:shadow-2xl">
                <Building2 className="absolute w-40 h-40 text-white/10 -top-8 -right-8" />
                <div className="relative items-center justify-between lg:flex">
                  <div className="lg:w-3/5">
                    <h3 className="text-3xl font-bold">{customPackage.name}</h3>
                    <p className="mt-2 text-lg text-white/80">
                      {customPackage.description}
                    </p>
                    <ul className="flex flex-wrap mt-4 gap-x-6 gap-y-2">
                      {customPackage.features.map((feature) => (
                        <li
                          key={feature.text}
                          className="flex items-center gap-2 text-sm font-semibold"
                        >
                          <CheckCircle className="flex-shrink-0 w-4 h-4 text-white/80" />
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:w-auto lg:ml-8">
                    <button
                      onClick={handleContactClick}
                      className="flex items-center justify-center w-full gap-2 px-8 py-3 font-bold text-accent transition-all duration-300 bg-white rounded-full shadow-lg lg:w-auto hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Contact Sales <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

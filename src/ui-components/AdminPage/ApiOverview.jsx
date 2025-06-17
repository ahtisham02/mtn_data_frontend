import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, Sector,
  BarChart, Bar, LabelList,
  RadialBarChart, RadialBar,
} from "recharts";
import {
  CheckCircle, ChevronRight, Server, Cpu, Clock, BarChart2,
  Activity, Shield, Database, Layers, ArrowUp, ArrowDown, Zap,
} from "lucide-react";
import { apiData, collections } from "../../utils/data";

// --- REFINED & NEW CHART COMPONENTS ---

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" className="text-2xl font-bold fill-foreground">
        {value.toLocaleString()}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" className="text-sm fill-muted-foreground">
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
                <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} />
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
              activeIndex === index ? 'opacity-100' : 'opacity-60'
            }`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></span>
            <span className="text-muted-foreground flex-1">{item.name}</span>
            <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
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
          <BarChart layout="vertical" data={data} margin={{ top: 0, right: 40, left: 0, bottom: 0 }} barCategoryGap="25%">
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
            <Tooltip
              cursor={{ fill: 'hsla(var(--accent) / 0.1)' }}
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="p-2 bg-card border rounded-lg shadow-lg">
                    <p className="font-bold text-foreground">{payload[0].payload.name}</p>
                    <p className="text-muted-foreground">{`Requests: ${payload[0].value.toLocaleString()}`}</p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              <LabelList dataKey="value" position="right" formatter={(value) => value.toLocaleString()} className="fill-foreground font-semibold" fontSize={12} />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorScale[index % colorScale.length]} />
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
        <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: 'hsla(var(--accent) / 0.1)' }} contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} />
          <Bar dataKey="requests" fill="url(#latencyGradient)" radius={[4, 4, 0, 0]} />
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
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={15} data={data} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="value" cornerRadius={10} />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
          <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ApiCallVolumeChart = ({ data }) => (
  <div className="w-full h-80">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} />
        <Area type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);


const Spinner = () => <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>;

const StatusIndicator = ({ operational }) => (
  <span className={`flex items-center gap-1.5 ${operational ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"} text-xs font-medium px-2.5 py-1 rounded-full`}>
    {operational ? <><CheckCircle className="h-3.5 w-3.5" />Operational</> : <><Server className="h-3.5 w-3.5" />Down</>}
  </span>
);

const StatCard = ({ icon, title, value, change, isPositive }) => {
  const IconComponent = icon;
  return (
    <div className="p-4 bg-card border border-border rounded-lg flex items-start gap-4">
      <div className={`p-2 rounded-lg ${isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
        <IconComponent className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-xs mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
          {" "}{change}
        </p>
      </div>
    </div>
  );
};

const PlanCard = ({ plan, onPlanSelect, isLoading }) => {
  const { title, price, active, features } = plan;
  const [integer, decimal] = price.replace("$", "").split(".");
  return (
    <div className={`p-6 w-full border rounded-lg transition-all duration-300 flex flex-col gap-6 ${active ? "border-accent ring-2 ring-accent bg-accent/5" : "border-border bg-card"}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-foreground">{title}</h4>
          <ul className="mt-4 space-y-2">{features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>))}
          </ul>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center md:items-end">
          <p className="flex items-baseline text-foreground">
            <span className="text-2xl font-semibold">$</span>
            <span className="text-5xl font-extrabold tracking-tight">{integer}</span>
            <span className="text-2xl font-semibold">.{decimal}</span>
          </p>
          <p className="text-sm text-muted -mt-1">Per Month</p>
        </div>
      </div>
      <div>
        <button onClick={() => onPlanSelect(plan)} disabled={active || isLoading} className={`w-full py-2.5 font-semibold rounded-md transition-colors flex items-center justify-center ${active ? "bg-accent/30 text-accent-hover cursor-not-allowed" : "bg-accent text-white hover:bg-accent-hover"}`}>
          {isLoading ? <Spinner /> : active ? "Current Plan" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

const CollectionRow = ({ collection }) => {
  if (!collection.endpoints || collection.endpoints.length === 0) return null;
  const firstEndpointSlug = collection.endpoints[0].slug;
  return (
    <Link to={`/endpoint/${firstEndpointSlug}`} className="flex items-center justify-between p-4 -mx-4 rounded-lg hover:bg-accent/5 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-accent/10 text-accent"><Layers className="h-5 w-5" /></div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{collection.name}</h3>
          <p className="text-sm text-muted-foreground">{collection.endpoints.length} endpoints</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
};


export default function ApiAnalytics() {
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [apiStatus] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  const handlePlanSelect = (plan) => {
    if (!plan.stripeLink) return;
    setLoadingPlanId(plan.id);
    setTimeout(() => { window.location.href = plan.stripeLink; }, 1500);
  };

  const chartData = {
    "7d": [{ label: "Mon", value: 1200 }, { label: "Tue", value: 1800 }, { label: "Wed", value: 1500 }, { label: "Thu", value: 2100 }, { label: "Fri", value: 2500 }, { label: "Sat", value: 2300 }, { label: "Sun", value: 3100 },],
    "30d": Array(30).fill(0).map((_, i) => ({ label: `${i + 1}`, value: Math.floor(Math.random() * 3000) + 500 })),
    "90d": Array(12).fill(0).map((_, i) => ({ label: `Wk ${i + 1}`, value: Math.floor(Math.random() * 15000) + 5000 })),
  };

  const pieData = [
    { name: "2xx Success", value: 8934, color: "#22c55e" }, { name: "3xx Redirect", value: 542, color: "#f59e0b" },
    { name: "4xx Client Error", value: 1042, color: "#f97316" }, { name: "5xx Server Error", value: 213, color: "#ef4444" },
  ];

  const analyticsEndpointUsage = collections.flatMap((c) => c.endpoints.map((e) => ({ name: e.name, value: Math.floor(Math.random() * 2000) + 50 }))).sort((a, b) => b.value - a.value).slice(0, 5);

  const latencyData = [
    { name: '< 50ms', requests: 4320 }, { name: '50-100ms', requests: 5102 }, { name: '100-200ms', requests: 2140 },
    { name: '200-500ms', requests: 980 }, { name: '> 500ms', requests: 300 },
  ];

  const requestMethodsData = [
    { name: 'GET', value: 9241, fill: '#8884d8' }, { name: 'POST', value: 2890, fill: '#82ca9d' },
    { name: 'PUT', value: 450, fill: '#ffc658' }, { name: 'DELETE', value: 261, fill: '#ff8042' },
  ];

  const stats = [
    { icon: BarChart2, title: "Total Requests", value: "12,842", change: "12%", isPositive: true },
    { icon: Cpu, title: "Avg Latency", value: "142ms", change: "8%", isPositive: true },
    { icon: Clock, title: "Uptime", value: "99.98%", change: "0.02%", isPositive: true },
    { icon: Server, title: "Errors", value: "125", change: "5%", isPositive: false },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <span className="bg-accent/10 text-accent p-2 rounded-lg"><Database className="h-6 w-6" /></span>
             Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <span>Showing data for</span>
            <span className="font-medium text-foreground">{apiData.name}</span>
            <span>•</span>
            <span className="font-mono text-sm bg-accent/10 text-accent px-2 py-0.5 rounded">v{apiData.version}</span>
          </p>
        </div>
        <StatusIndicator operational={apiStatus} />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
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
                    <button key={range} onClick={() => setTimeRange(range)} className={`text-xs px-3 py-1 rounded-full ${timeRange === range ? "bg-accent/10 text-accent" : "bg-card text-muted-foreground hover:bg-accent/5"}`}>
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
              <Link to="#" className="text-sm text-accent hover:underline">View All</Link>
            </div>
            <div className="p-6 bg-card border border-border rounded-xl divide-y divide-border">
              {collections.map((c) => <CollectionRow key={c.id} collection={c} />)}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">Pricing Plan</h2>
            <div className="flex justify-center mt-6">
              {apiData.plans.map((plan) => <PlanCard key={plan.id} plan={plan} onPlanSelect={handlePlanSelect} isLoading={loadingPlanId === plan.id} />)}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code,
  Users,
  Tag,
  Zap,
  Gauge,
  Clock,
  CheckCircle,
  Target,
  ChevronRight,
  Edit,
  Save,
  X,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { apiData, collections } from "../../utils/data";
import ContactModal from "./ContactModal";
import Spinner from "./Spinner";
import ApiResponseViewer from "./ApiResponseViewer";

const analyticsEndpointUsage = collections
  .flatMap((collection) =>
    collection.endpoints.map((endpoint) => ({
      name: endpoint.name,
      value: Math.floor(Math.random() * 2000) + 50,
    }))
  )
  .sort((a, b) => b.value - a.value)
  .slice(0, 5);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between hover:bg-background transition-all transform hover:-translate-y-1 shadow-sm">
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      {icon}
    </div>
    <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
  </div>
);

const PlanCard = ({ plan, onPlanSelect, isLoading }) => {
  const { title, price, active, features } = plan;
  const [integer, decimal] = price.replace("$", "").split(".");

  return (
    <div
      className={`p-6 border rounded-lg transition-all duration-300 flex flex-col ${
        active
          ? "border-accent ring-2 ring-accent bg-accent/5"
          : "border-border bg-card"
      }`}
    >
      <div className="flex-grow">
        <h4 className="font-semibold text-xl text-foreground">{title}</h4>
        <div className="flex items-baseline text-foreground my-4">
          <span className="text-2xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">
            {integer}
          </span>
          {decimal && (
            <span className="text-2xl font-semibold">.{decimal}</span>
          )}
          <span className="ml-2 text-sm text-muted-foreground">/ month</span>
        </div>
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button
          onClick={() => onPlanSelect(plan)}
          disabled={active || isLoading}
          className={`w-full py-2.5 font-semibold rounded-md transition-colors flex items-center justify-center ${
            active
              ? "bg-accent/30 text-accent-hover cursor-not-allowed"
              : "bg-accent text-accent-foreground hover:bg-accent/90"
          }`}
        >
          {isLoading ? <Spinner /> : active ? "Current Plan" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

const CollectionRow = ({ collection }) => {
  if (!collection.endpoints || collection.endpoints.length === 0) {
    return null;
  }
  const firstEndpointSlug = collection.endpoints[0].slug;

  return (
    <Link
      to={`/endpoint/${firstEndpointSlug}`}
      className="block p-4 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/5 transition-all group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-accent">{collection.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {collection.description ||
              `${collection.endpoints.length} endpoints`}
          </p>
        </div>
        <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
      </div>
    </Link>
  );
};

const AnalyticsChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const maxValue = Math.max(...data, 1);
  const labels = ["7d ago", "6d", "5d", "4d", "3d", "2d", "Today"];

  return (
    <div className="relative" onMouseLeave={() => setHoveredIndex(null)}>
      <div
        className="w-full h-56 rounded-lg flex items-end gap-2 p-4 pt-8"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to top, hsl(var(--border)) 1px, transparent 1px, transparent 20%)",
          backgroundSize: "100% 20%",
        }}
      >
        {data.map((val, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md transition-all duration-300 ease-out cursor-pointer group"
            style={{ height: `${(val / maxValue) * 100}%` }}
            onMouseEnter={() => setHoveredIndex(i)}
          >
            <div className="w-full h-full rounded-t-md bg-gradient-to-t from-accent/70 to-accent group-hover:from-accent group-hover:to-purple-500"></div>
          </div>
        ))}
      </div>

      {hoveredIndex !== null && (
        <div
          className="absolute bg-background text-foreground text-xs font-bold px-2 py-1 rounded-md pointer-events-none shadow-lg border border-border"
          style={{
            top: `${70 - (data[hoveredIndex] / maxValue) * 80}%`,
            left: `${
              (hoveredIndex / data.length) * 100 + (1 / data.length / 2) * 100
            }%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          {data[hoveredIndex].toLocaleString()}
        </div>
      )}

      <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

const EndpointUsageList = ({ data }) => (
  <div className="p-6 bg-card border border-border rounded-xl">
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
      Top Endpoint Usage
    </h3>
    <div className="space-y-4">
      {data.map((ep) => (
        <div key={ep.name}>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">{ep.name}</span>
            <span className="font-semibold text-foreground">
              {ep.value.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-accent to-purple-500 h-2 rounded-full"
              style={{
                width: `${
                  (ep.value / Math.max(...data.map((d) => d.value))) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export function ApiOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  const handleSendMessage = () => {
    setIsModalOpen(false);
    toast.success("Message sent successfully!");
  };

  const handleGetNotifications = () => {
    setIsNotifying(true);
    setTimeout(() => {
      setIsNotifying(false);
      toast.success("Notifications enabled!");
    }, 2000);
  };

  const handlePlanSelect = (plan) => {
    if (!plan.stripeLink) return;
    setLoadingPlanId(plan.id);
    setTimeout(() => {
      window.location.href = plan.stripeLink;
    }, 1500);
  };

  return (
    <>
      <div className="space-y-10">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <main className="flex-1 space-y-10 w-full">
            <header>
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-foreground">
                  {apiData.name}
                </h1>
                <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-xs font-medium px-2.5 py-1 rounded-full">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Operational
                </span>
              </div>
              <p className="text-muted-foreground mt-1">{apiData.tagline}</p>
            </header>
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard
                  icon={<Zap className="w-5 h-5" />}
                  label="Popularity"
                  value={apiData.stats.popularity}
                />
                <StatCard
                  icon={<Gauge className="w-5 h-5" />}
                  label="Uptime"
                  value={apiData.stats.serviceLevel}
                />
                <StatCard
                  icon={<Clock className="w-5 h-5" />}
                  label="Avg. Latency"
                  value={apiData.stats.latency}
                />
                <StatCard
                  icon={<Target className="w-5 h-5" />}
                  label="Success Rate"
                  value={apiData.stats.testSuccess}
                />
              </div>
            </section>
            <section>
              <div className="p-6 bg-card border border-border rounded-xl">
                <div className="flex justify-between items-baseline mb-1">
                  <h2 className="text-xl font-bold text-foreground">
                    Analytics
                  </h2>
                  <p className="text-sm text-muted-foreground">Last 7 Days</p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Total calls this period:{" "}
                  {(Math.floor(Math.random() * 5000) + 2000).toLocaleString()}
                </p>
                <AnalyticsChart
                  data={Array.from({ length: 7 }, () =>
                    Math.floor(Math.random() * 1200)
                  )}
                />
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Pricing Plans
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {apiData.plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onPlanSelect={handlePlanSelect}
                    isLoading={loadingPlanId === plan.id}
                  />
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">
                API Collections
              </h2>
              <div className="space-y-3">
                {collections.map((collection) => (
                  <CollectionRow key={collection.id} collection={collection} />
                ))}
              </div>
            </section>
          </main>
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:sticky lg:top-8">
            <div className="p-6 bg-card border border-border rounded-xl space-y-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Provider Info
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Creator</span>{" "}
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-foreground">
                      {apiData.provider}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subscribers</span>{" "}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">
                      {apiData.subscribers.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Category</span>{" "}
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="bg-background text-muted-foreground px-2 py-0.5 rounded-md text-xs font-medium">
                      {apiData.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-border space-y-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2.5 font-semibold text-accent-foreground bg-accent rounded-md hover:bg-accent/90 transition-colors"
                >
                  Contact Provider
                </button>
                <button
                  onClick={handleGetNotifications}
                  disabled={isNotifying}
                  className="w-full py-2.5 font-semibold text-foreground bg-background rounded-md hover:bg-footer-bg transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isNotifying ? <Spinner /> : "Get Notifications"}
                </button>
              </div>
            </div>
            <EndpointUsageList data={analyticsEndpointUsage} />
          </aside>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={handleSendMessage}
      />
    </>
  );
}

const getMethodClass = (method) => {
  switch (method?.toUpperCase()) {
    case "GET":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "POST":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    case "PUT":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case "PATCH":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "DELETE":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`py-3 px-4 text-sm font-medium border-b-2 flex-shrink-0 transition-colors ${
      isActive
        ? "border-accent text-accent"
        : "border-transparent text-muted-foreground hover:text-foreground"
    }`}
  >
    {label}
  </button>
);

const ParameterRow = ({
  paramKey,
  value,
  isEditing,
  onValueChange,
  placeholder,
  description,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-x-4 gap-y-2 py-3">
    <div className="font-mono text-sm text-foreground flex flex-col">
      <span>{paramKey}</span>
      {description && (
        <span className="text-xs text-muted-foreground mt-1 font-sans">
          {description}
        </span>
      )}
    </div>
    <div className="md:col-span-2">
      <input
        type="text"
        value={value || ""}
        readOnly={!isEditing}
        onChange={onValueChange}
        placeholder={placeholder}
        className={`w-full bg-background py-2 px-3 text-foreground font-mono text-sm border rounded-md focus:outline-none ${
          isEditing
            ? "border-accent focus:ring-1 focus:ring-accent"
            : "border-border cursor-default"
        }`}
      />
    </div>
  </div>
);

const SubTab = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm rounded-md ${
      isActive
        ? "bg-accent/10 text-accent font-semibold"
        : "text-muted-foreground hover:bg-footer-bg"
    }`}
  >
    {label}
  </button>
);

const RequestBodyEditor = ({
  endpoint,
  editData,
  isEditing,
  onBodyChange,
  onMediaTypeChange,
}) => {
  const [view, setView] = useState("Body");
  const mediaTypes = ["application/json", "text/plain", "application/xml"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center p-1 bg-background rounded-md space-x-1">
          <SubTab
            label="Body"
            isActive={view === "Body"}
            onClick={() => setView("Body")}
          />
          <SubTab
            label="Schema"
            isActive={view === "Schema"}
            onClick={() => setView("Schema")}
          />
        </div>
        {view === "Body" && isEditing && (
          <div className="relative">
            <select
              onChange={onMediaTypeChange}
              defaultValue={
                editData.headers.find(
                  (h) => h.key.toLowerCase() === "content-type"
                )?.value
              }
              className="pl-3 pr-8 py-1.5 text-sm border border-border rounded-md appearance-none focus:outline-none bg-background"
            >
              {mediaTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        )}
      </div>
      {view === "Body" &&
        (isEditing ? (
          <textarea
            value={editData.body}
            onChange={onBodyChange}
            rows={8}
            className="w-full bg-background p-4 font-mono text-sm text-foreground border-accent focus:ring-accent focus:outline-none rounded-md"
          />
        ) : (
          <pre className="bg-background border border-border rounded-md p-4 font-mono text-sm text-foreground whitespace-pre-wrap break-all">
            {editData.body}
          </pre>
        ))}
      {view === "Schema" && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-10 bg-background p-3 font-semibold text-sm border-b border-border">
            <div className="col-span-3">Field</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-5">Description</div>
          </div>
          <div className="divide-y divide-border">
            {endpoint.requestSchema.map((field, index) => (
              <div
                key={field.field}
                className={`grid grid-cols-10 p-3 text-sm ${
                  index % 2 !== 0 ? "bg-background/50" : ""
                }`}
              >
                <div className="col-span-3 font-mono text-foreground">
                  {field.field}
                  {field.required && (
                    <span className="text-accent ml-1">*</span>
                  )}
                </div>
                <div className="col-span-2 font-mono text-muted-foreground">
                  {field.type}
                </div>
                <div className="col-span-5 text-muted-foreground">
                  {field.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyStateMessage = ({ message }) => (
  <div className="text-center py-16 flex flex-col items-center justify-center text-muted-foreground">
    <AlertCircle className="mb-4 h-8 w-8 text-accent" strokeWidth={1.5} />
    <p className="text-sm">{message}</p>
  </div>
);

const InitialStateViewer = ({ url }) => (
  <div className="bg-card border border-border rounded-lg h-full p-6 flex flex-col">
    {/* <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Request URL</h3>
        <div className="bg-background p-3 rounded-md border border-border">
            <pre className="text-sm text-foreground font-mono whitespace-pre-wrap break-all">{url}</pre>
        </div> */}
    <div className="flex-grow flex flex-col items-center justify-center text-center text-muted-foreground">
      <svg
        className="w-16 h-16 mb-4 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
      <p className="font-semibold text-foreground">Ready to Test</p>
      <p className="text-sm mt-1">
        Configure your request and click "Test Endpoint" to see a response.
      </p>
    </div>
  </div>
);

export default function EndpointPage({ endpoint }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    params: [],
    headers: [],
    body: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [activeRequestTab, setActiveRequestTab] = useState("Params");
  const requestTabs = ["Parameters", `Headers`, "Authorization", "Body"];

  useEffect(() => {
    if (endpoint) {
      setEditData({
        params: JSON.parse(JSON.stringify(endpoint.params || [])),
        headers: JSON.parse(JSON.stringify(endpoint.headers || [])),
        body: endpoint.body || "",
      });
      setIsEditing(false);
      setTestResult(null);
      setActiveRequestTab(endpoint.params?.length > 0 ? "Parameters" : "Body");
    }
  }, [endpoint]);

  const handleTestEndpoint = async () => {
    setIsLoading(true);
    setTestResult(null);
    const startTime = performance.now();
    const headers = Object.fromEntries(
      editData.headers.map((h) => [h.key, h.value])
    );

    let urlTemplate = endpoint.url;
    const queryParams = new URLSearchParams();
    editData.params?.forEach((p) => {
      if (p.value) {
        p.in === "path"
          ? (urlTemplate = urlTemplate.replace(`{${p.key}}`, p.value))
          : queryParams.append(p.key, p.value);
      }
    });

    const finalUrl = queryParams.toString()
      ? `${urlTemplate}?${queryParams.toString()}`
      : urlTemplate;
    const requestOptions = {
      method: endpoint.method,
      headers,
      body:
        endpoint.method !== "GET" && editData.body ? editData.body : undefined,
    };

    try {
      const response = await fetch(finalUrl, requestOptions);
      const endTime = performance.now();
      const total = Math.round(endTime - startTime);
      const contentType = response.headers.get("content-type");
      const responseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();
      const responseHeaders = Array.from(response.headers.entries()).map(
        ([key, value]) => ({ key, value })
      );

      setTestResult({
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        timing: { total },
        bodySize: new Blob([JSON.stringify(responseData)]).size,
        requestParams: editData.params,
        requestHeaders: editData.headers,
        requestBody: editData.body,
        responseHeaders: responseHeaders,
        data: responseData,
      });
    } catch (error) {
      const endTime = performance.now();
      setTestResult({
        isError: true,
        status: "Error",
        statusText: "Failed to Fetch",
        url: finalUrl,
        timing: { total: Math.round(endTime - startTime) },
        data: {
          message: error.message,
          details:
            "Could not connect to the API. Check the URL, server status, and CORS configuration.",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (type, index, field, value) => {
    const updated = [...editData[type]];
    updated[index][field] = value;
    setEditData((prev) => ({ ...prev, [type]: updated }));
  };

  const handleMediaTypeChange = (e) => {
    const newType = e.target.value;
    const headers = [...editData.headers];
    const contentTypeIndex = headers.findIndex(
      (h) => h.key.toLowerCase() === "content-type"
    );
    if (contentTypeIndex !== -1) headers[contentTypeIndex].value = newType;
    else headers.push({ key: "Content-Type", value: newType });
    setEditData((prev) => ({ ...prev, headers }));
  };

  if (!endpoint) return null;

  return (
    <div className="space-y-6 h-full flex flex-col">
      <header className="flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-bold px-3 py-1 rounded-md border ${getMethodClass(
                endpoint.method
              )}`}
            >
              {endpoint.method}
            </span>
            <h1 className="text-xl font-bold text-foreground truncate">
              {endpoint.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 text-sm font-semibold text-foreground bg-background rounded-md hover:bg-footer-bg flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-2 text-sm font-semibold text-foreground bg-background rounded-md hover:bg-footer-bg flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={handleTestEndpoint}
                  disabled={isLoading}
                  className="px-6 py-2 font-semibold text-white bg-accent rounded-md hover:bg-accent-hover disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner small /> Testing...
                    </>
                  ) : (
                    "Test Endpoint"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
        <p className="text-muted-foreground font-mono text-sm mt-2 bg-slate-100 p-2 rounded-md border border-border">
          {endpoint.url}
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <section
          className="bg-card border rounded-lg flex flex-col transition-shadow duration-300 min-h-[400px] lg:min-h-0 overflow-hidden"
          id="request-panel"
        >
          <div
            className={`border-b border-border flex-shrink-0 ${
              isEditing ? "bg-accent/5" : ""
            }`}
          >
            <nav className="flex space-x-1 px-2 overflow-x-auto">
              {requestTabs.map((tab) => (
                <TabButton
                  key={tab}
                  label={tab}
                  isActive={activeRequestTab === tab}
                  onClick={() => setActiveRequestTab(tab)}
                />
              ))}
            </nav>
          </div>
          <div className="p-6 overflow-y-auto">
            {activeRequestTab === "Parameters" &&
              (editData.params?.length > 0 ? (
                <div className="divide-y divide-border -my-3">
                  {editData.params.map((p, i) => (
                    <ParameterRow
                      key={i}
                      paramKey={p.key}
                      value={p.value}
                      isEditing={isEditing}
                      onValueChange={(e) =>
                        handleEditChange("params", i, "value", e.target.value)
                      }
                      placeholder={p.in}
                      description={p.description}
                    />
                  ))}
                </div>
              ) : (
                <EmptyStateMessage message="This endpoint has no parameters." />
              ))}
            {activeRequestTab === "Headers" &&
              (editData.headers?.length > 0 ? (
                <div className="divide-y divide-border -my-3">
                  {editData.headers.map((h, i) => (
                    <ParameterRow
                      key={i}
                      paramKey={h.key}
                      value={h.value}
                      isEditing={isEditing}
                      onValueChange={(e) =>
                        handleEditChange("headers", i, "value", e.target.value)
                      }
                    />
                  ))}
                </div>
              ) : (
                <EmptyStateMessage message="No headers are defined for this request." />
              ))}
            {activeRequestTab === "Authorization" && (
              <div className="space-y-2 text-foreground">
                <h3 className="font-bold">{endpoint.auth.type}</h3>
                <p className="text-sm text-muted-foreground">
                  {endpoint.auth.details}
                </p>
              </div>
            )}
            {activeRequestTab === "Body" &&
              (endpoint.body || endpoint.requestSchema?.length > 0 ? (
                <RequestBodyEditor
                  endpoint={endpoint}
                  editData={editData}
                  isEditing={isEditing}
                  onBodyChange={(e) =>
                    setEditData((p) => ({ ...p, body: e.target.value }))
                  }
                  onMediaTypeChange={handleMediaTypeChange}
                />
              ) : (
                <EmptyStateMessage message="This request does not have a body." />
              ))}
          </div>
        </section>

        <section className="min-h-[400px] lg:min-h-0" id="response-panel">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full bg-card border-border border rounded-lg">
              <Spinner large />
              <p className="mt-4 text-muted-foreground">Sending request...</p>
            </div>
          )}
          {!isLoading && !testResult && (
            <InitialStateViewer url={endpoint.url} />
          )}
          {!isLoading &&
            testResult &&
            (testResult.isError ? (
              <div className="bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg p-4 h-full overflow-y-auto">
                <div className="flex items-center gap-2 font-bold mb-2 text-accent">
                  <AlertCircle /> {testResult.statusText}
                </div>
                <pre className="text-sm bg-background/30 p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </div>
            ) : (
              <ApiResponseViewer result={testResult} />
            ))}
        </section>
      </div>
    </div>
  );
}

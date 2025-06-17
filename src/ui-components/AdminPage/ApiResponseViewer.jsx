import { useState, useEffect } from "react";
import { Copy, CheckCircle, AlertCircle } from "lucide-react";
import { Clock, Database, Link2 } from "lucide-react";

const getStatusInfo = (status) => {
  if (status >= 200 && status < 300)
    return {
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      icon: CheckCircle,
    };
  if (status >= 400 && status < 500)
    return {
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      icon: AlertCircle,
    };
  // Default to error style for 5xx and other statuses
  return {
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: AlertCircle,
  };
};

// --- UI Components (Enhanced Styling) ---

const MainTab = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
      isActive
        ? "border-accent text-accent font-semibold"
        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
    }`}
  >
    {label}
  </button>
);

const SubTab = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
      isActive
        ? "bg-accent/10 text-accent font-semibold"
        : "text-muted-foreground hover:bg-background hover:text-foreground"
    }`}
  >
    {label}
  </button>
);

const InfoStatCard = ({
  icon,
  label,
  value,
  valueClassName = "text-foreground",
}) => (
  <div className="bg-background border border-border rounded-xl p-4 flex items-center gap-4 transition-all hover:border-accent/80 hover:bg-footer-bg/50">
    <div className="flex-shrink-0 text-accent">{icon}</div>
    <div className="flex-1">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className={`text-lg font-bold tracking-tight ${valueClassName}`}>
        {value}
      </div>
    </div>
  </div>
);

const KeyValueTable = ({ items, keyTitle, valueTitle }) => (
  <div className="border border-border rounded-lg overflow-hidden">
    <div className="grid grid-cols-12 bg-background p-3 font-semibold text-sm border-b border-border">
      <div className="col-span-4">{keyTitle}</div>
      <div className="col-span-8">{valueTitle}</div>
    </div>
    <div className="divide-y divide-border">
      {items?.length > 0 ? (
        items.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-12 p-3 text-sm font-mono hover:bg-footer-bg/50 transition-colors ${
              i % 2 !== 0 ? "bg-background/40" : ""
            }`}
          >
            <div className="col-span-4 text-muted-foreground break-all">
              {item.key}
            </div>
            <div className="col-span-8 text-foreground break-all">
              {String(item.value)}
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No data to display.
        </div>
      )}
    </div>
  </div>
);

const TimingBar = ({ timings }) => {
  const total = timings.total || 1; // Prevent division by zero
  const toPercent = (val) => ((val || 0) / total) * 100;
  const segments = [
    {
      label: "DNS",
      value: timings.dns,
      color: "bg-purple-500",
      percent: toPercent(timings.dns),
    },
    {
      label: "TCP",
      value: timings.tcp,
      color: "bg-orange-500",
      percent: toPercent(timings.tcp),
    },
    {
      label: "TLS",
      value: timings.tls,
      color: "bg-yellow-500",
      percent: toPercent(timings.tls),
    },
    {
      label: "Processing",
      value: timings.processing,
      color: "bg-blue-500",
      percent: toPercent(timings.processing),
    },
    {
      label: "Transfer",
      value: timings.transfer,
      color: "bg-green-500",
      percent: toPercent(timings.transfer),
    },
  ].filter((s) => s.percent > 0.1); // Only show meaningful segments

  return (
    <div className="bg-background border border-border p-4 rounded-lg">
      <div className="w-full flex rounded-full overflow-hidden h-2.5 bg-footer-bg">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={seg.color}
            style={{ width: `${seg.percent}%` }}
            title={`${seg.label}: ${seg.value}ms (${seg.percent.toFixed(1)}%)`}
          ></div>
        ))}
      </div>
      <dl className="text-xs grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-2 mt-4">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${seg.color}`}></span>
            <span className="text-muted-foreground">{seg.label}:</span>
            <span className="font-semibold text-foreground">{seg.value}ms</span>
          </div>
        ))}
      </dl>
    </div>
  );
};

const JsonViewer = ({ data }) => {
  const highlightJson = (jsonString) => {
    if (typeof jsonString !== "string") {
      jsonString = JSON.stringify(jsonString, null, 2);
    }
    jsonString = jsonString
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">");
    return jsonString.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "text-green-400";
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? "text-accent" : "text-blue-400";
        } else if (/true|false/.test(match)) {
          cls = "text-purple-400";
        } else if (/null/.test(match)) {
          cls = "text-muted-foreground";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };
  return (
    <pre
      className="text-sm bg-background border border-border p-4 rounded-lg overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: highlightJson(data) }}
    />
  );
};

// --- Main Component ---
export default function ApiResponseViewer({ result }) {
  const [mainTab, setMainTab] = useState("Response");
  const [requestSubTab, setRequestSubTab] = useState("Params");
  const [responseSubTab, setResponseSubTab] = useState("Pretty");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!result) return;
    setMainTab("Response"); // Default to response tab on new result

    const hasParams = result.requestParams?.some((p) => p.value);
    if (hasParams) {
      setRequestSubTab("Params");
    } else if (result.requestBody && result.requestBody !== "{}") {
      setRequestSubTab("Body");
    } else {
      setRequestSubTab("Headers");
    }
  }, [result]);

  const handleCopy = async () => {
    if (!result.data) return;
    const textToCopy = JSON.stringify(result.data, null, 2);
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!result) return null;

  const {
    color,
    bgColor,
    borderColor,
    icon: StatusIcon,
  } = getStatusInfo(result.status);
  const hasRequestParams = result.requestParams?.some((p) => p.value);
  const hasRequestBody = result.requestBody && result.requestBody !== "{}";

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col overflow-hidden">
      <div className={`p-3 border-b ${bgColor} ${borderColor}`}>
        <span
          className={`font-semibold text-base flex items-center gap-2 ${color}`}
        >
          <StatusIcon className="w-5 h-5" />
          {result.status} {result.statusText}
        </span>
      </div>
      <nav className="flex items-center border-b border-border px-4 flex-shrink-0">
        <MainTab
          label="Response"
          isActive={mainTab === "Response"}
          onClick={() => setMainTab("Response")}
        />
        <MainTab
          label="Request"
          isActive={mainTab === "Request"}
          onClick={() => setMainTab("Request")}
        />
        <MainTab
          label="Info"
          isActive={mainTab === "Info"}
          onClick={() => setMainTab("Info")}
        />
      </nav>
      <div className="p-6 flex-1 overflow-y-auto bg-background/20">
        {mainTab === "Info" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoStatCard
                icon={<StatusIcon className="w-6 h-6" />}
                label="Status"
                value={`${result.status} ${result.statusText}`}
                valueClassName={`font-extrabold ${color}`}
              />
              <InfoStatCard
                icon={<Clock className="w-6 h-6" />}
                label="Total Time"
                value={`${result.timing.total} ms`}
              />
              <InfoStatCard
                icon={<Database className="w-6 h-6" />}
                label="Body Size"
                value={`${(result.bodySize / 1024).toFixed(2)} KB`}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Request URL
              </h3>
              <div className="bg-background border border-border rounded-lg p-3 font-mono text-sm text-foreground break-all shadow-inner">
                {result.url}
              </div>
            </div>
          </div>
        )}
        {mainTab === "Request" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2 p-1 bg-footer-bg rounded-md w-fit">
              {hasRequestParams && (
                <SubTab
                  label="Params"
                  isActive={requestSubTab === "Params"}
                  onClick={() => setRequestSubTab("Params")}
                />
              )}
              <SubTab
                label="Headers"
                isActive={requestSubTab === "Headers"}
                onClick={() => setRequestSubTab("Headers")}
              />
              {hasRequestBody && (
                <SubTab
                  label="Body"
                  isActive={requestSubTab === "Body"}
                  onClick={() => setRequestSubTab("Body")}
                />
              )}
            </div>
            {requestSubTab === "Params" && (
              <KeyValueTable
                items={result.requestParams}
                keyTitle="Parameter"
                valueTitle="Value"
              />
            )}
            {requestSubTab === "Headers" && (
              <KeyValueTable
                items={result.requestHeaders}
                keyTitle="Header Name"
                valueTitle="Header Value"
              />
            )}
            {requestSubTab === "Body" && (
              <JsonViewer data={result.requestBody} />
            )}
          </div>
        )}
        {mainTab === "Response" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 p-1 bg-footer-bg rounded-md w-fit">
                <SubTab
                  label="Pretty"
                  isActive={responseSubTab === "Pretty"}
                  onClick={() => setResponseSubTab("Pretty")}
                />
                <SubTab
                  label="Raw"
                  isActive={responseSubTab === "Raw"}
                  onClick={() => setResponseSubTab("Raw")}
                />
                <SubTab
                  label="Headers"
                  isActive={responseSubTab === "Headers"}
                  onClick={() => setResponseSubTab("Headers")}
                />
              </div>
              <button
                onClick={handleCopy}
                disabled={isCopied}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-default transition-colors"
              >
                {isCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            {responseSubTab === "Pretty" && <JsonViewer data={result.data} />}
            {responseSubTab === "Raw" && (
              <pre className="text-sm bg-background border border-border p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
            {responseSubTab === "Headers" && (
              <KeyValueTable
                items={result.responseHeaders}
                keyTitle="Header Name"
                valueTitle="Header Value"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

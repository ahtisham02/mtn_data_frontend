import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const MainTab = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium border-b-2 ${isActive ? 'border-accent text-accent font-semibold' : 'border-transparent text-muted hover:text-foreground'}`}>
        {label}
    </button>
);

const SubTab = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-3 py-1 text-sm rounded-md ${isActive ? 'bg-accent/10 text-accent font-semibold' : 'text-muted hover:bg-background'}`}>
        {label}
    </button>
);

const InfoRow = ({ label, value }) => (
    <div className="flex items-center py-2 border-b border-border last:border-none">
        <dt className="w-1/3 text-sm text-muted">{label}</dt>
        <dd className="w-2/3 text-sm text-foreground break-all font-mono">{value}</dd>
    </div>
);

const HeaderTable = ({ headers }) => (
    <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex bg-background p-2 font-semibold text-sm border-b border-border">
            <div className="w-1/3">Header Name</div>
            <div className="w-2/3">Header Value</div>
        </div>
        <div className="divide-y divide-border">
            {headers.map((header, i) => (
                <div key={i} className="flex p-2 hover:bg-background text-sm">
                    <div className="w-1/3 font-mono text-muted break-all">{header.key}</div>
                    <div className="w-2/3 font-mono break-all">{String(header.value)}</div>
                </div>
            ))}
        </div>
    </div>
);

const TimingBar = ({ timings }) => (
    <div className="w-full flex rounded overflow-hidden h-2 my-1">
        <div className="bg-purple-400" style={{ width: `${timings.dns}px` }} title={`DNS: ${timings.dns}ms`}></div>
        <div className="bg-orange-400" style={{ width: `${timings.tcp}px` }} title={`TCP: ${timings.tcp}ms`}></div>
        <div className="bg-yellow-400" style={{ width: `${timings.tls}px` }} title={`TLS: ${timings.tls}ms`}></div>
        <div className="bg-blue-400" style={{ width: `${timings.processing}px` }} title={`Processing: ${timings.processing}ms`}></div>
        <div className="bg-green-400" style={{ width: `${timings.transfer}px` }} title={`Transfer: ${timings.transfer}ms`}></div>
    </div>
);

const JsonViewer = ({ data }) => {
    const highlightJson = (jsonString) => {
        if (!jsonString) return '';
        return jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
            let cls = 'text-green-700';
            if (/^"/.test(match)) cls = /:$/.test(match) ? 'text-accent' : 'text-blue-700';
            else if (/true|false/.test(match)) cls = 'text-purple-700';
            else if (/null/.test(match)) cls = 'text-muted';
            return `<span class="${cls}">${match}</span>`;
        });
    };
    return <pre className="text-sm bg-background p-4 rounded-md overflow-x-auto" dangerouslySetInnerHTML={{ __html: highlightJson(JSON.stringify(data, null, 2)) }} />;
};

export default function ApiResponseViewer({ result }) {
    const [mainTab, setMainTab] = useState('Response');
    const [requestSubTab, setRequestSubTab] = useState('Headers');
    const [responseSubTab, setResponseSubTab] = useState('Pretty');
    
    const getStatusColor = (status) => status >= 200 && status < 300 ? 'border-green-500 bg-green-500/10 text-green-700' : 'border-red-500 bg-red-500/10 text-red-700';

    return (
        <div className="bg-card border border-border rounded-lg h-full flex flex-col">
            <div className={`p-3 border-b ${getStatusColor(result.status)}`}><span className="font-semibold text-sm flex items-center gap-2"><CheckCircle className="w-5 h-5"/> {result.status} {result.statusText}</span></div>
            <nav className="flex items-center border-b border-border px-2">
                <MainTab label="Info" isActive={mainTab === 'Info'} onClick={() => setMainTab('Info')} />
                <MainTab label="Request" isActive={mainTab === 'Request'} onClick={() => setMainTab('Request')} />
                <MainTab label="Response" isActive={mainTab === 'Response'} onClick={() => setMainTab('Response')} />
            </nav>
            <div className="p-4 flex-1 overflow-y-auto">
                {mainTab === 'Info' && (
                    <div className="space-y-6">
                        <dl className="divide-y divide-border border border-border rounded-lg p-4">
                            <InfoRow label="URL" value={result.url} /><InfoRow label="Status" value={`${result.status} ${result.statusText}`} /><InfoRow label="Total Time" value={`${result.timing.total} ms`} /><InfoRow label="Body Size" value={`${result.bodySize} Bytes`} />
                        </dl>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Timing Breakdown</h3>
                            <TimingBar timings={result.timing} />
                            <dl className="text-xs grid grid-cols-5 gap-2 mt-2">
                                <div className="text-purple-700">DNS: {result.timing.dns}ms</div><div className="text-orange-700">TCP: {result.timing.tcp}ms</div><div className="text-yellow-700">TLS: {result.timing.tls}ms</div><div className="text-blue-700">Processing: {result.timing.processing}ms</div><div className="text-green-700">Transfer: {result.timing.transfer}ms</div>
                            </dl>
                        </div>
                    </div>
                )}
                {mainTab === 'Request' && (
                    <div>
                        <div className="flex items-center gap-2 mb-4 p-1 bg-background rounded-md w-fit">
                            <SubTab label="Headers" isActive={requestSubTab === 'Headers'} onClick={() => setRequestSubTab('Headers')} /><SubTab label="Body" isActive={requestSubTab === 'Body'} onClick={() => setRequestSubTab('Body')} />
                        </div>
                        {requestSubTab === 'Headers' && <HeaderTable headers={result.requestHeaders} />}
                        {requestSubTab === 'Body' && <pre className="text-sm bg-background p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">{result.requestBody}</pre>}
                    </div>
                )}
                {mainTab === 'Response' && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 p-1 bg-background rounded-md w-fit">
                                <SubTab label="Pretty" isActive={responseSubTab === 'Pretty'} onClick={() => setResponseSubTab('Pretty')} /><SubTab label="Raw" isActive={responseSubTab === 'Raw'} onClick={() => setResponseSubTab('Raw')} /><SubTab label="Headers" isActive={responseSubTab === 'Headers'} onClick={() => setResponseSubTab('Headers')} />
                            </div>
                            <button className="flex items-center gap-2 text-sm text-muted hover:text-foreground"><Copy className="w-4 h-4" /> Copy</button>
                        </div>
                        {responseSubTab === 'Pretty' && <JsonViewer data={result.data} />}
                        {responseSubTab === 'Raw' && <pre className="text-sm bg-background p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">{JSON.stringify(result.data, null, 2)}</pre>}
                        {responseSubTab === 'Headers' && <HeaderTable headers={result.responseHeaders} />}
                    </div>
                )}
            </div>
        </div>
    );
}
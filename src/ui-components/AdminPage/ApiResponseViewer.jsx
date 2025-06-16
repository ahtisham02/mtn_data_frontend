import { useState, useEffect } from 'react';
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
        <dd className="w-2/3 text-sm text-foreground break-all font-mono whitespace-pre-wrap">{value}</dd>
    </div>
);

const KeyValueTable = ({ items, keyTitle, valueTitle }) => (
    <div className="border border-border rounded-lg overflow-hidden">
        <div className="flex bg-background p-2 font-semibold text-sm border-b border-border">
            <div className="w-1/3">{keyTitle}</div>
            <div className="w-2/3">{valueTitle}</div>
        </div>
        <div className="divide-y divide-border">
            {items?.map((item, i) => (
                <div key={i} className="flex p-2 hover:bg-background text-sm">
                    <div className="w-1/3 font-mono text-muted break-all">{item.key}</div>
                    <div className="w-2/3 font-mono break-all">{String(item.value)}</div>
                </div>
            ))}
        </div>
    </div>
);

const TimingBar = ({ timings }) => (
    <div className="w-full flex rounded overflow-hidden h-2 my-1">
        <div className="bg-purple-400" style={{ width: `${timings.dns || 0}px` }} title={`DNS: ${timings.dns || 0}ms`}></div>
        <div className="bg-orange-400" style={{ width: `${timings.tcp || 0}px` }} title={`TCP: ${timings.tcp || 0}ms`}></div>
        <div className="bg-yellow-400" style={{ width: `${timings.tls || 0}px` }} title={`TLS: ${timings.tls || 0}ms`}></div>
        <div className="bg-blue-400" style={{ width: `${timings.processing || 0}px` }} title={`Processing: ${timings.processing || 0}ms`}></div>
        <div className="bg-green-400" style={{ width: `${timings.transfer || 0}px` }} title={`Transfer: ${timings.transfer || 0}ms`}></div>
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
    const [requestSubTab, setRequestSubTab] = useState('Params');
    const [responseSubTab, setResponseSubTab] = useState('Pretty');
    const [isCopied, setIsCopied] = useState(false);
    
    useEffect(() => {
        if (result.requestParams && result.requestParams.length > 0) {
            setRequestSubTab('Params');
        } else if (result.requestBody) {
            setRequestSubTab('Body');
        } else {
            setRequestSubTab('Headers');
        }
    }, [result]);

    const getStatusColor = (status) => status >= 200 && status < 300 ? 'border-green-500 bg-green-500/10 text-green-700' : 'border-red-500 bg-red-500/10 text-red-700';

    const handleCopy = async () => {
        if (!result.data) return;
        
        const textToCopy = JSON.stringify(result.data, null, 2);
        await navigator.clipboard.writeText(textToCopy);

        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };
    
    const hasRequestParams = result.requestParams && result.requestParams.filter(p => p.value).length > 0;
    const hasRequestBody = result.requestBody && result.requestBody !== "{}";

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
                                <div className="text-purple-700">DNS: {result.timing.dns || 0}ms</div><div className="text-orange-700">TCP: {result.timing.tcp || 0}ms</div><div className="text-yellow-700">TLS: {result.timing.tls || 0}ms</div><div className="text-blue-700">Processing: {result.timing.processing || 0}ms</div><div className="text-green-700">Transfer: {result.timing.transfer || 0}ms</div>
                            </dl>
                        </div>
                    </div>
                )}
                {mainTab === 'Request' && (
                    <div>
                        <div className="flex items-center gap-2 mb-4 p-1 bg-background rounded-md w-fit">
                            {hasRequestParams && <SubTab label="Params" isActive={requestSubTab === 'Params'} onClick={() => setRequestSubTab('Params')} />}
                            <SubTab label="Headers" isActive={requestSubTab === 'Headers'} onClick={() => setRequestSubTab('Headers')} />
                            {hasRequestBody && <SubTab label="Body" isActive={requestSubTab === 'Body'} onClick={() => setRequestSubTab('Body')} />}
                        </div>
                        {requestSubTab === 'Params' && <KeyValueTable items={result.requestParams} keyTitle="Parameter" valueTitle="Value" />}
                        {requestSubTab === 'Headers' && <KeyValueTable items={result.requestHeaders} keyTitle="Header Name" valueTitle="Header Value" />}
                        {requestSubTab === 'Body' && <pre className="text-sm bg-background p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">{result.requestBody}</pre>}
                    </div>
                )}
                {mainTab === 'Response' && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 p-1 bg-background rounded-md w-fit">
                                <SubTab label="Pretty" isActive={responseSubTab === 'Pretty'} onClick={() => setResponseSubTab('Pretty')} /><SubTab label="Raw" isActive={responseSubTab === 'Raw'} onClick={() => setResponseSubTab('Raw')} /><SubTab label="Headers" isActive={responseSubTab === 'Headers'} onClick={() => setResponseSubTab('Headers')} />
                            </div>
                            <button onClick={handleCopy} disabled={isCopied} className="flex items-center gap-2 text-sm text-muted hover:text-foreground disabled:opacity-50 disabled:cursor-default">
                                {isCopied ? (<><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-green-600">Copied!</span></>) : (<><Copy className="w-4 h-4" /><span>Copy</span></>)}
                            </button>
                        </div>
                        {responseSubTab === 'Pretty' && <JsonViewer data={result.data} />}
                        {responseSubTab === 'Raw' && <pre className="text-sm bg-background p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">{JSON.stringify(result.data, null, 2)}</pre>}
                        {responseSubTab === 'Headers' && <KeyValueTable items={result.responseHeaders} keyTitle="Header Name" valueTitle="Header Value" />}
                    </div>
                )}
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import { Edit, Save, X, ChevronDown, AlertCircle } from 'lucide-react';
import Spinner from './Spinner';
import ApiResponseViewer from './ApiResponseViewer';

const TabButton = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`py-3 px-4 text-sm font-medium border-b-2 flex-shrink-0 transition-colors ${isActive ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-foreground'}`}>
      {label}
    </button>
);

const RequestDetail = ({ label, value, isEditing, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-muted mb-1">{label}</label>
        <div className="flex items-center bg-background border border-border rounded-md">
            {isEditing ? (
                 <input type="text" value={value} onChange={onChange} className="w-full bg-white py-2 px-3 text-foreground font-mono text-sm border-accent focus:ring-accent focus:outline-none rounded-md" />
            ) : (
                 <input type="text" value={value} readOnly className="w-full bg-transparent py-2 px-3 text-foreground font-mono text-sm"/>
            )}
        </div>
    </div>
);

const RequestBodyEditor = ({ endpoint, editData, isEditing, onBodyChange, onMediaTypeChange }) => {
    const [view, setView] = useState('Body');
    const mediaTypes = ['application/json', 'text/plain', 'application/xml'];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center p-1 bg-background rounded-md space-x-1">
                    <SubTab label="Body" isActive={view === 'Body'} onClick={() => setView('Body')} />
                    <SubTab label="Schema" isActive={view === 'Schema'} onClick={() => setView('Schema')} />
                </div>
                {view === 'Body' && isEditing && (
                    <div className="relative">
                        <select onChange={onMediaTypeChange} defaultValue={editData.headers.find(h => h.key.toLowerCase() === 'content-type')?.value} className="pl-3 pr-8 py-1.5 text-sm border border-border rounded-md appearance-none focus:outline-none bg-white">
                            {mediaTypes.map(type => <option key={type}>{type}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                    </div>
                )}
            </div>
            {view === 'Body' && ( isEditing ? (
                <textarea value={editData.body} onChange={onBodyChange} rows={8} className="w-full bg-white p-4 font-mono text-sm text-foreground border-accent focus:ring-accent focus:outline-none rounded-md" />
                ) : (
                <pre className="bg-background border border-border rounded-md p-4 font-mono text-sm text-green-700 whitespace-pre-wrap break-all">{editData.body}</pre>
                )
            )}
            {view === 'Schema' && (
                <div className="border border-border rounded-lg overflow-hidden">
                    <div className="flex bg-background p-2 font-semibold text-sm border-b border-border"><div className="w-1/4">Field</div><div className="w-1/4">Type</div><div className="w-1/2">Description</div></div>
                    <div className="divide-y divide-border">{endpoint.requestSchema.map(field => (<div key={field.field} className="flex p-2 text-sm"><div className="w-1/4 font-mono text-foreground">{field.field}{field.required && <span className="text-accent">*</span>}</div><div className="w-1/4 font-mono text-muted">{field.type}</div><div className="w-1/2 text-muted">{field.description}</div></div>))}</div>
                </div>
            )}
        </div>
    );
};

const SubTab = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`px-3 py-1 text-sm rounded-md ${isActive ? 'bg-accent/10 text-accent font-semibold' : 'text-muted hover:bg-footer-bg'}`}>
        {label}
    </button>
);

const EmptyStateMessage = ({ message }) => (
    <div className="text-center py-16 flex flex-col items-center justify-center text-muted">
        <div className="mb-4 text-rose-400">
            <AlertCircle size={32} strokeWidth={1.5} />
        </div>
        <p className="text-sm">{message}</p>
    </div>
);

const InitialStateViewer = ({ url }) => (
    <div className="bg-card border border-border rounded-lg h-full p-6 flex flex-col">
        <div className="text-left w-full">
            <h3 className="text-sm font-semibold text-muted mb-2 uppercase tracking-wider">Request URL</h3>
            <div className="bg-background p-3 rounded-md border border-border">
                <pre className="text-sm text-foreground font-mono whitespace-pre-wrap break-all">{url}</pre>
            </div>
        </div>
        <div className="flex-grow flex items-center justify-center">
            <p className="text-muted text-center">Click "Test Endpoint" to send a request.</p>
        </div>
    </div>
);

export default function EndpointPage({ endpoint }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ params: [], headers: [], body: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [activeRequestTab, setActiveRequestTab] = useState('Body');

  useEffect(() => {
    setEditData({ 
        params: JSON.parse(JSON.stringify(endpoint.params || [])), 
        headers: JSON.parse(JSON.stringify(endpoint.headers || [])), 
        body: endpoint.body || '' 
    });
    setIsEditing(false);
    setTestResult(null);
    setActiveRequestTab(endpoint.body || endpoint.requestSchema?.length > 0 ? 'Body' : 'Params');
  }, [endpoint]);
  
  const handleTestEndpoint = async () => {
    setIsLoading(true);
    setTestResult(null);
    const startTime = performance.now();
    
    const headers = Object.fromEntries(editData.headers.map(h => [h.key, h.value]));

    let urlTemplate = endpoint.url;
    const queryParams = new URLSearchParams();

    if (editData.params && editData.params.length > 0) {
        editData.params.forEach(p => {
            if (p.value) {
                if (p.in === 'path') {
                    urlTemplate = urlTemplate.replace(`{${p.key}}`, p.value);
                } else {
                    queryParams.append(p.key, p.value);
                }
            }
        });
    }

    const queryString = queryParams.toString();
    const finalUrl = queryString ? `${urlTemplate}?${queryString}` : urlTemplate;

    const requestOptions = {
        method: endpoint.method,
        headers: headers,
        body: (endpoint.method !== 'GET' && endpoint.method !== 'DELETE' && editData.body) ? editData.body : undefined,
    };
    
    try {
        const response = await fetch(finalUrl, requestOptions);
        const endTime = performance.now();
        const total = Math.round(endTime - startTime);

        let responseData;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }
        
        const responseHeaders = [];
        response.headers.forEach((value, key) => {
            responseHeaders.push({ key, value });
        });
        
        const bodySize = new Blob([JSON.stringify(responseData)]).size;
        
        setTestResult({
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            timing: { dns: 0, tcp: 0, tls: 0, processing: total, transfer: 0, total },
            bodySize: bodySize,
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
            status: 'Error',
            statusText: 'Failed to Fetch',
            url: finalUrl,
            timing: { total: Math.round(endTime - startTime) },
            requestParams: editData.params,
            requestHeaders: editData.headers,
            requestBody: editData.body,
            data: {
                message: error.message,
                details: "Could not connect to the API endpoint. Check the server, URL, and for CORS issues."
            }
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleEditChange = (type, index, field, value) => {
    const updated = [...editData[type]];
    updated[index][field] = value;
    setEditData(prev => ({ ...prev, [type]: updated }));
  };
  
  const handleMediaTypeChange = (e) => {
      const newType = e.target.value;
      const headers = [...editData.headers];
      const contentTypeIndex = headers.findIndex(h => h.key.toLowerCase() === 'content-type');
      if (contentTypeIndex !== -1) {
          headers[contentTypeIndex].value = newType;
      } else {
          headers.push({ key: 'Content-Type', value: newType });
      }
      setEditData(prev => ({ ...prev, headers }));
  };

  const requestTabs = ['Params', `Headers`, 'Authorizations', 'Body'];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center flex-shrink-0">
        <h1 className="text-3xl font-bold text-foreground">{endpoint.method} {endpoint.name}</h1>
        <div className="flex items-center gap-2">
            {isEditing ? (
                <>
                 <button onClick={() => setIsEditing(false)} className="px-4 py-2 font-semibold text-foreground bg-background rounded-md hover:bg-footer-bg flex items-center gap-2"><X className="w-4 h-4"/> Cancel</button>
                 <button onClick={() => setIsEditing(false)} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center gap-2"><Save className="w-4 h-4"/> Save</button>
                </>
            ) : (
                <>
                 <button onClick={() => setIsEditing(true)} className="px-4 py-2 font-semibold text-foreground bg-background rounded-md hover:bg-footer-bg flex items-center gap-2"><Edit className="w-4 h-4"/> Edit</button>
                 <button onClick={handleTestEndpoint} disabled={isLoading} className="px-6 py-2 font-semibold text-white bg-accent rounded-md hover:bg-accent-hover disabled:opacity-50 flex items-center gap-2">
                    {isLoading && <Spinner />} {isLoading ? 'Testing...' : 'Test Endpoint'}
                 </button>
                </>
            )}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <div className={`bg-card border rounded-lg transition-shadow ${isEditing ? 'border-accent ring-2 ring-accent' : 'border-border'}`}>
          <div className="border-b border-border"><nav className="flex space-x-1 px-2 overflow-x-auto">{requestTabs.map(tab => ( <TabButton key={tab} label={tab} isActive={activeRequestTab === tab} onClick={() => setActiveRequestTab(tab)} /> ))}</nav></div>
          <div className="p-6">
             {activeRequestTab === 'Params' && (editData.params?.length > 0 ? (<div className="space-y-4">{editData.params.map((p, i) => <RequestDetail key={i} label={p.key} value={p.value} isEditing={isEditing} onChange={(e) => handleEditChange('params', i, 'value', e.target.value)} />)}</div>) : (<EmptyStateMessage message="This endpoint does not require any parameters." />))}
             {activeRequestTab === 'Headers' && (editData.headers?.length > 0 ? (<div className="space-y-4">{editData.headers.map((h, i) => <RequestDetail key={i} label={h.key} value={h.value} isEditing={isEditing} onChange={(e) => handleEditChange('headers', i, 'value', e.target.value)} />)}</div>) : (<EmptyStateMessage message="No default headers are specified for this request." />))}
             {activeRequestTab === 'Authorizations' && (<div className="space-y-2 text-foreground"><h3 className="font-bold">{endpoint.auth.type}</h3><p className="text-sm text-muted">{endpoint.auth.details}</p></div>)}
             {activeRequestTab === 'Body' && (endpoint.body || endpoint.requestSchema?.length > 0 ? (<RequestBodyEditor endpoint={endpoint} editData={editData} isEditing={isEditing} onBodyChange={(e) => setEditData(p => ({ ...p, body: e.target.value}))} onMediaTypeChange={handleMediaTypeChange} />) : (<EmptyStateMessage message="This request does not have a body." />))}
          </div>
        </div>
        <div className="min-h-[400px]">
            {isLoading && <div className="flex items-center justify-center h-full bg-card border-border border rounded-lg"><Spinner large /></div>}
            {!isLoading && !testResult && <InitialStateViewer url={endpoint.url} />}
            {!isLoading && testResult && (
                testResult.isError ? 
                <div className="bg-red-500/10 border border-red-500 text-red-700 rounded-lg p-4 h-full">
                    <div className="flex items-center gap-2 font-bold mb-2"><AlertCircle/> {testResult.statusText}</div>
                    <pre className="text-sm bg-background p-4 rounded-md overflow-x-auto whitespace-pre-wrap break-all">{JSON.stringify(testResult.data, null, 2)}</pre>
                </div> 
                : 
                <ApiResponseViewer result={testResult} />
            )}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Edit, Save, X, ChevronDown } from 'lucide-react';
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

export default function EndpointPage({ endpoint }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [activeRequestTab, setActiveRequestTab] = useState('Body');

  useEffect(() => {
    setEditData({ params: [...endpoint.params], headers: [...endpoint.headers], body: endpoint.body || '' });
    setIsEditing(false);
    setTestResult(null);
    setActiveRequestTab(endpoint.body || endpoint.requestSchema?.length > 0 ? 'Body' : 'Params');
  }, [endpoint]);
  
  const handleTestEndpoint = () => {
    setIsLoading(true);
    setTestResult(null);
    const startTime = performance.now();
    
    setTimeout(() => {
      const endTime = performance.now();
      const total = Math.round(endTime - startTime);
      const timing = { dns: 10, tcp: 5, tls: 20, processing: total - 55, transfer: 20, total };
      const bodySize = new Blob([JSON.stringify(endpoint.response)]).size;

      setTestResult({
          status: endpoint.method === 'POST' ? 201 : 200,
          statusText: endpoint.method === 'POST' ? 'Created' : 'OK',
          url: endpoint.url, timing, bodySize,
          requestHeaders: editData.headers,
          requestBody: editData.body,
          responseHeaders: endpoint.responseHeaders || [],
          data: endpoint.response
      });
      setIsLoading(false);
    }, 1500);
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
          setEditData(prev => ({ ...prev, headers }));
      }
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
          <div className="p-6 space-y-4">
             {activeRequestTab === 'Params' && (editData.params?.length > 0 ? (<div className="space-y-4">{editData.params.map((p, i) => <RequestDetail key={i} label={p.key} value={p.value} isEditing={isEditing} onChange={(e) => handleEditChange('params', i, 'value', e.target.value)} />)}</div>) : (<div className="text-muted text-center py-8">No parameters.</div>))}
             {activeRequestTab === 'Headers' && (<div className="space-y-4">{editData.headers?.map((h, i) => <RequestDetail key={i} label={h.key} value={h.value} isEditing={isEditing} onChange={(e) => handleEditChange('headers', i, 'value', e.target.value)} />)}</div>)}
             {activeRequestTab === 'Authorizations' && (<div className="space-y-2 text-foreground"><h3 className="font-bold">{endpoint.auth.type}</h3><p className="text-sm text-muted">{endpoint.auth.details}</p></div>)}
             {activeRequestTab === 'Body' && (endpoint.body || endpoint.requestSchema?.length > 0 ? (<RequestBodyEditor endpoint={endpoint} editData={editData} isEditing={isEditing} onBodyChange={(e) => setEditData(p => ({ ...p, body: e.target.value}))} onMediaTypeChange={handleMediaTypeChange} />) : (<div className="text-muted text-center py-8">No request body.</div>))}
          </div>
        </div>
        <div className="min-h-[400px]">
            {isLoading && <div className="flex items-center justify-center h-full bg-card border-border border rounded-lg"><Spinner large /></div>}
            {!isLoading && !testResult && (<div className="flex items-center justify-center h-full bg-card border-border border rounded-lg text-muted">Click "Test Endpoint" to see the response.</div>)}
            {!isLoading && testResult && <ApiResponseViewer result={testResult} />}
        </div>
      </div>
    </div>
  );
}
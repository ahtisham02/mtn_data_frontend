import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, FileCode2 } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, endpoints }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) setSearchTerm('');
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredEndpoints = endpoints.filter(ep => 
    ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex justify-center pt-20" onClick={onClose}>
      <div className="w-full max-w-2xl bg-card border border-border rounded-lg shadow-2xl h-fit max-h-[70vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-border flex items-center">
          <Search className="h-5 w-5 mr-3 text-muted"/>
          <input
            type="text"
            placeholder="Search all endpoints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-foreground focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X />
          </button>
        </div>
        <div className="overflow-y-auto">
          {filteredEndpoints.length > 0 ? (
            <ul>
              {filteredEndpoints.map(endpoint => (
                <li key={endpoint.slug}>
                  <Link to={`/endpoint/${endpoint.slug}`} onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-background">
                    <FileCode2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{endpoint.name}</p>
                      <p className="text-sm text-muted">{endpoint.method} /endpoint/{endpoint.slug}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center p-16 text-muted">
              <p>No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
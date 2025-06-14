import { useState } from 'react';
import { X } from 'lucide-react';
import Spinner from './Spinner';

export default function ContactModal({ isOpen, onClose, onSend }) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    
    setTimeout(() => {
      onSend(message);
      setMessage('');
      setIsSending(false);
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-card border border-border rounded-lg shadow-2xl p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Contact Provider</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-muted">
          Send a direct message to this provider regarding any question you might have.
        </p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please type your message here..."
          rows="5"
          className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className="px-6 py-2 font-semibold text-white bg-accent rounded-md hover:bg-accent-hover transition-colors disabled:bg-accent/50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[150px]"
          >
            {isSending ? (
              <>
                <Spinner />
                <span>Sending...</span>
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
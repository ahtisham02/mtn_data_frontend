export default function Spinner({ large = false }) {
  const sizeClass = large ? 'w-8 h-8' : 'w-5 h-5';
  return (
    <div 
      className={`${sizeClass} border-2 border-border border-t-accent rounded-full animate-spin`}
    ></div>
  );
}
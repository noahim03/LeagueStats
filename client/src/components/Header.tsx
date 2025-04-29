import { Link } from "wouter";

export default function Header() {
  return (
    <header className="border-b border-lol-gold-dark">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 100 100" 
            className="w-10 h-10 text-lol-gold"
          >
            <path fill="currentColor" d="M50 0L0 20v60l50 20 50-20V20L50 0zm0 10l37.5 15v50L50 90 12.5 75V25L50 10zm0 8L25 30v40l25 12.5L75 70V30L50 18zm0 8l15 7.5v30L50 71 35 63.5v-30L50 26z"/>
          </svg>
          <h1 className="ml-3 text-xl md:text-2xl font-lol-display font-bold text-lol-gold">LoL Counterpick</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-lol-gray-light hover:text-lol-gold transition-colors">Home</Link></li>
            <li><a href="#" className="text-lol-gray-light hover:text-lol-gold transition-colors">Champions</a></li>
            <li><a href="#" className="text-lol-gray-light hover:text-lol-gold transition-colors">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

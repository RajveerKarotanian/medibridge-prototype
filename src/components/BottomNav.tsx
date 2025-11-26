import { Bell } from 'lucide-react';

interface BottomNavProps {
  onNavigate: (screen: string) => void;
  activeScreen: string;
}

export function BottomNav({ onNavigate, activeScreen }: BottomNavProps) {
  return (
    <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-around px-6 fixed bottom-0 left-0 right-0 lg:relative">
      <button
        onClick={() => onNavigate('landing')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeScreen === 'landing' ? 'text-[#284995]' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span className="text-xs">Home</span>
      </button>
      <button
        onClick={() => onNavigate('history')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeScreen === 'history' ? 'text-[#284995]' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
        <span className="text-xs">History</span>
      </button>
      <button
        onClick={() => onNavigate('alerts')}
        className={`flex flex-col items-center gap-1 transition-colors relative ${
          activeScreen === 'alerts' ? 'text-[#284995]' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <Bell className="w-6 h-6" />
        {activeScreen !== 'alerts' && (
          <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
        <span className="text-xs">Alerts</span>
      </button>
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeScreen === 'profile' ? 'text-[#284995]' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
}

import { useAuth } from '@/contexts/AuthContext';
import FacebookLogin from './FacebookLogin';

export const HeaderBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black">Estrela sem censura</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{user?.name}</span>
          {!user ? (
            <FacebookLogin />
          ) : (
            <button
              type="button"
              onClick={logout}
              className="bg-red-800 hover:bg-red-900 hover:cursor-pointer text-white px-4 py-2 rounded"
            >
              Sair
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

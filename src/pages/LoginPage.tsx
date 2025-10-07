import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentDeals } from '../services/api';
import { Asset } from '../types/asset';
import { LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecentDeals(username);
      if (data && data.result && data.result.length > 0) {
        const assetsWithCoords: Asset[] = data.result.map((asset, index) => ({
          ...asset,
        }));

        login({ name: username, username });

        navigate('/asset-analysis', { state: { assets: assetsWithCoords } });
      } else {
        setError('No assets found for this user.');
      }
    } catch (err) {
      setError('Invalid login. Please check the username and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen font-sans">

      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="w-full max-w-md p-8 space-y-8">
          <div className="text-center lg:text-left">
            <img src="/logo-1.svg" alt="PROMS Logo" className="h-10 mx-auto lg:mx-0" />
            <p className="mt-2 text-base text-slate-600">
              Welcome back! Please sign in to your account.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  placeholder="Please Input your Username here"
                  className="block w-full px-4 py-2.5 text-sm bg-white border rounded-lg shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="block w-full px-4 py-2.5 text-sm bg-white border rounded-lg shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Please Input your Password here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative flex-col items-center justify-center hidden w-1/2 lg:flex bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-cover opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}></div>
        <div className="z-10 text-center text-white">
          <h2 className="text-4xl font-bold">Unlock Your Data</h2>
          <p className="max-w-md mt-4 text-lg text-slate-300">
            Gain insights and manage your property portfolio with ease.
          </p>
        </div>
      </div>

    </div>
  );
};
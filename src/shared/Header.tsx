import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import secondLogo from '../assets/logo-2.svg';

type HeaderProps = {
  logo?: string;
  version?: string;
};

export const Header: React.FC<HeaderProps> = ({ logo = secondLogo, version }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const headerRef = useRef<HTMLElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeight(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setIsSticky(scrollY > height);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [height]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {isSticky && <div style={{ height }} aria-hidden="true" />}

      <header
        ref={headerRef}
        className={
          (isSticky ? "fixed top-0 left-0 right-0 z-40 shadow-sm " : "relative ") +
          "w-full border-b bg-white"
        }
      >
        <div className="max-w-full mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Project logo" className="h-8" />
          </div>

          <div className="flex items-center space-x-4">
            {version && <div className="text-xs text-slate-500">{version}</div>}

            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-700 hidden sm:inline">
                  {user.name || user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Log out"
                >
                  Log out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
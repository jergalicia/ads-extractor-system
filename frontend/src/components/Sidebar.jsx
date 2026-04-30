import React from 'react';
import { LayoutDashboard, Search, Building2, Download, Settings, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Search size={20} />, label: 'Buscador', path: '/search' },
    { icon: <Building2 size={20} />, label: 'Empresas', path: '/companies' },
    { icon: <BarChart3 size={20} />, label: 'Estadísticas', path: '/stats' },
    { icon: <Download size={20} />, label: 'Exportar', path: '/export' },
  ];

  return (
    <div className="w-64 min-h-screen glass border-r border-white/10 p-6 flex flex-col fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Search className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          AdsExtractor
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
          <p className="text-xs text-indigo-300 font-semibold mb-1 uppercase tracking-wider">Plan</p>
          <p className="text-sm text-white font-medium">Cloud Startup</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

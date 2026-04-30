import React from 'react';

const StatCard = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {trend === 'up' ? '+' : '-'}{trendValue}%
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;

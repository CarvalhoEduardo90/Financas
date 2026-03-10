import React from 'react';

interface HeaderProps {
  title: string;
  showToast: (msg: string) => void;
}

export default function Header({ title, showToast }: HeaderProps) {
  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="relative hidden md:block w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="Buscar..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4 lg:pl-6">
          <button onClick={() => showToast('Nenhuma notificação no momento')} className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          <div onClick={() => showToast('Abrindo menu do perfil...')} className="size-10 rounded-full bg-slate-200 overflow-hidden border-2 border-primary/20 cursor-pointer">
            <img
              className="w-full h-full object-cover"
              alt="Avatar de perfil"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRXzgI_WSreBvwI47k57g0nrSRn9qNx4-fjOHpTGaPgm-rEG_gQlDvBlmmI7SN_VdeINKuv51n0p1-MnF7uRaTe4x4mH_eyDT5miqSs896JXFwHmCetRasejUQZlOWnDWwX70fqiOe8osxZgtwC61NjhNl03DKRqSl0squLR5BgEqW0-L_zypEH230vCXB4rztOmBPgCPLANsW2im3Fkk2be1awKNaAASnT8mJCXQJYH-3Ff6vlGiXEQCLyHF-_bVSmMdYNRiYfCY"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

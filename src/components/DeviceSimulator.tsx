import React from 'react';
import { RotateCw, Monitor, Smartphone, Tablet, Maximize2 } from 'lucide-react';

export type DevicePreviewMode = 'desktop' | 'mobile' | 'tablet';
export type DeviceOrientation = 'portrait' | 'landscape';

interface DeviceSimulatorProps {
  device: DevicePreviewMode;
  orientation: DeviceOrientation;
  onChangeDevice: (mode: DevicePreviewMode) => void;
  onToggleOrientation: () => void;
  isDarkMode: boolean;
  children: React.ReactNode;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  device,
  orientation,
  onChangeDevice,
  onToggleOrientation,
  isDarkMode,
  children,
}) => {
  // If desktop / Current screen size, render children directly with zero extra DOM or overhead
  if (device === 'desktop') {
    return <>{children}</>;
  }

  const isMobile = device === 'mobile';
  const isLandscape = orientation === 'landscape';

  // Exact responsive max-widths without hardware bezel bugs
  const maxWidthClass = isMobile
    ? isLandscape ? 'max-w-[844px]' : 'max-w-[420px]'
    : isLandscape ? 'max-w-[1024px]' : 'max-w-[768px]';

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100/90 text-slate-800'
      } py-2 sm:py-4 px-2 sm:px-4 flex flex-col items-center transition-colors duration-200 select-none`}
    >
      {/* Sleek Minimalist Simulator Top Bar (matching screenshot layout) */}
      <div className="w-full max-w-4xl mx-auto mb-3 px-3 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Rotate Button */}
          <button
            onClick={onToggleOrientation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80 active:scale-95"
            title="Putar Orientasi Layar (Rotate Portrait / Landscape)"
          >
            <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
            <span>Rotate</span>
            <span className="text-[10px] text-slate-400 font-normal">
              ({isLandscape ? 'Landscape' : 'Portrait'})
            </span>
          </button>

          {/* Current Device Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800/60">
            {isMobile ? <Smartphone className="w-3.5 h-3.5" /> : <Tablet className="w-3.5 h-3.5" />}
            <span>{isMobile ? 'Mobile' : 'Tablet'}</span>
            <span className="text-slate-400 font-normal text-[11px] hidden sm:inline">
              ({isMobile ? (isLandscape ? '844 × 390' : '390 × 844') : (isLandscape ? '1024 × 768' : '768 × 1024')}px)
            </span>
          </div>
        </div>

        {/* Quick Switch / Close to Current Screen Size */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onChangeDevice(isMobile ? 'tablet' : 'mobile')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Ganti ke {isMobile ? 'Tablet' : 'Mobile'}
          </button>
          <button
            onClick={() => onChangeDevice('desktop')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Kembali ke Layar Penuh (Current screen size)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Current screen size</span>
          </button>
        </div>
      </div>

      {/* Centered Device Viewport Container - Clean, native scrolling without hardware bezel bugs */}
      <div
        className={`w-full ${maxWidthClass} transition-all duration-300 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden bg-[#faf9f6] dark:bg-slate-900 min-h-[calc(100vh-6rem)] flex flex-col`}
      >
        {children}
      </div>
    </div>
  );
};

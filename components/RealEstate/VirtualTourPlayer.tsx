import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';

interface VirtualTourProps {
  propertyId: string;
  propertyName: string;
  tourUrl?: string; // YouTube/Vimeo embed URL or local video URL
  thumbnailUrl?: string;
  duration?: number; // in seconds
  resolution?: '720p' | '1080p' | '4K';
  features?: string[];
  onClose?: () => void;
}

export default function VirtualTourPlayer({
  propertyId,
  propertyName,
  tourUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  thumbnailUrl = 'https://images.unsplash.com/photo-1580587771525-78991c7c15f9?w=800',
  duration = 180,
  resolution = '1080p',
  features = ['360° views', 'Room-by-room tour', 'HD quality'],
  onClose
}: VirtualTourProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [selectedResolution, setSelectedResolution] = useState(resolution);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const PlayerComponent = () => (
    <div className={`bg-black rounded-lg overflow-hidden flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* VIDEO/EMBED AREA */}
      <div className="bg-black aspect-video relative">
        {tourUrl.includes('youtube.com') || tourUrl.includes('youtu.be') ? (
          <iframe
            width="100%"
            height="100%"
            src={isPlaying ? tourUrl : tourUrl.replace('watch?v=', 'embed/').split('&')[0]}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <video
            width="100%"
            height="100%"
            controls={isPlaying}
            muted={isMuted}
            poster={thumbnailUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => setVolume(e.currentTarget.volume * 100)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            className="w-full h-full"
          >
            <source src={tourUrl} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        )}

        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
          >
            <Play size={64} className="text-white" fill="white" />
          </button>
        )}

        {/* RESOLUTION BADGE */}
        <div className="absolute top-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white">
          {selectedResolution}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-gray-900 border-t border-gray-700 p-4 space-y-3">
        {/* TITLE & INFO */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-bold text-sm">{propertyName}</h3>
            <p className="text-xs text-gray-400 mt-1">
              {formatTime(currentTime)} / {formatTime(duration)} • {selectedResolution}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-700 rounded-full h-1 cursor-pointer hover:h-2 transition">
          <div
            className="bg-yellow-600 h-full rounded-full transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        {/* CONTROLS BAR */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* PLAY BUTTON */}
            <button
              onClick={handlePlay}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="white" />}
            </button>

            {/* VOLUME CONTROL */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 hover:bg-white/20 transition text-gray-300"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (Number(e.target.value) > 0) setIsMuted(false);
                }}
                className="w-12 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* TIME DISPLAY */}
            <span className="text-xs text-gray-400 font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* RESOLUTION SELECTOR */}
            <select
              value={selectedResolution}
              onChange={(e) => setSelectedResolution(e.target.value as any)}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded border border-white/20 cursor-pointer transition"
            >
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="4K">4K</option>
            </select>

            {/* FULLSCREEN BUTTON */}
            <button
              onClick={handleFullscreen}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
              title="Fullscreen"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/5 px-2 py-1.5 rounded border border-white/10 text-center text-gray-300"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isFullscreen) {
    return <PlayerComponent />;
  }

  return (
    <div className="bg-black border border-yellow-600/40 rounded-lg overflow-hidden">
      <div className="aspect-video">
        <PlayerComponent />
      </div>
    </div>
  );
}

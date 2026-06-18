'use client';

import { useEffect, useState } from 'react';

interface MusicProps {
  id: string;
  type?: 'song' | 'playlist' | 'album';
  auto?: boolean;
}

const typeMap = {
  song: { type: 2, height: 66 },
  playlist: { type: 0, height: 430 },
  album: { type: 1, height: 430 },
};

export function Music({ id, type = 'song', auto = false }: MusicProps) {
  const [mounted, setMounted] = useState(false);
  const cfg = typeMap[type];
  const src = '//music.163.com/outchain/player?type=' + cfg.type + '&id=' + id + '&auto=' + (auto ? 1 : 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="my-6 not-prose" style={{ height: cfg.height }}>
        <div className="rounded-lg bg-muted animate-pulse" style={{ height: cfg.height }} />
      </div>
    );
  }

  return (
    <div className="my-6 not-prose">
      <iframe
        title="music-player"
        frameBorder="no"
        marginWidth={0}
        marginHeight={0}
        width="100%"
        height={cfg.height}
        src={src}
        className="rounded-lg"
      />
    </div>
  );
}

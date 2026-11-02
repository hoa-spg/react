import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Umgebungsvariablen die im Browser verfügbar sein sollen
  // (NEXT_PUBLIC_ Prefix wird automatisch erkannt)

  // Für Produktion: stricte Header für Sicherheit
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

export default nextConfig;

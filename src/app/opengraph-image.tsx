import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NeuraFlow — AI Workflow Automation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 50%, #0a0a0f 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #818cf8 0%, #a855f7 50%, #ec4899 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          NeuraFlow
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#a1a1aa',
            marginTop: 16,
          }}
        >
          AI Workflow Automation Platform
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#71717a',
            marginTop: 12,
          }}
        >
          Build • Deploy • Scale — Intelligent Automations
        </div>
      </div>
    ),
    { ...size }
  );
}

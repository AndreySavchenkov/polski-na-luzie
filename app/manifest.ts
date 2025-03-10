import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Polski Na Luzie',
    short_name: 'PNL',
    description: 'Application for learn Polish',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/logoWithText192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logoWithText512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
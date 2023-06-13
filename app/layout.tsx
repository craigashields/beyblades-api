

import './globals.css'
import Footer from './components/Footer';
import SectionContainer from './components/SectionContainer';
import { Metadata } from 'next'
import siteMetadata from './data/siteMetadata';
import Icon from './icons/favicon.ico'
import { Analytics } from '@vercel/analytics/react';

const icon = Icon
export const metadata: Metadata = {
  title: {
    default: `${siteMetadata.title}`,
    template: `%s | ${siteMetadata.title}`,
  },
  description: `${siteMetadata.description}`,
  keywords: ['beyblades', 'React', 'Typescript', 'Next.js', 'PlanetScale'],
  authors: [{ name: `${siteMetadata.author}`, url: `${siteMetadata.github}` }],
  creator: `${siteMetadata.author}`,
  publisher: `${siteMetadata.author}`,
  icons: {
    icon: `${icon.src}`
  },
  openGraph: {
    title: `${siteMetadata.title}`,
    description: `${siteMetadata.description}`,
    url: `${siteMetadata.siteUrl}`,
    siteName: `${siteMetadata.title}`,
    images: [
      {
        url: `${siteMetadata.siteUrl}/${siteMetadata.socialBanner}`

      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
      <SectionContainer>
        <div className="flex-1 flex flex-col gap-y-16 py-14">
            {children}
        </div>
          <Footer />
      </SectionContainer>
      <Analytics />

    </body>
    </html>
    
  )
}

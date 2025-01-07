import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        pathname: '/_next/static/media/**'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|mov)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos',
            outputPath: 'static/videos',
            name: '[name].[hash].[ext]'
          }
        }
      ]
    })

    return config
  }
}

export default nextConfig

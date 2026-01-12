/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/vector-calculator',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig

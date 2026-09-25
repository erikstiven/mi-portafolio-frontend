/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚫 No frenes el build por ESLint en producción
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 🚫 No frenes el build por errores de types en producción
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'portafolio.codecima.com' },
      { protocol: 'https', hostname: 'codecima.com' },
    ],
  },
};

export default nextConfig;

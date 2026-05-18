const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
	"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
	"img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com https://*.supabase.co",
	"font-src 'self' data: https://fonts.gstatic.com",
	"connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com",
	"frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
	"media-src 'self' https://*.supabase.co",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'self'",
	...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
	{
		key: "Content-Security-Policy",
		value: contentSecurityPolicy,
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "X-Frame-Options",
		value: "SAMEORIGIN",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
	},
	{
		key: "Cross-Origin-Opener-Policy",
		value: "same-origin",
	},
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	...(isProduction
		? [
				{
					key: "Strict-Transport-Security",
					value: "max-age=31536000; includeSubDomains; preload",
				},
			]
		: []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	compress: true,
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 604800,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.youtube.com",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
			},
			{
				protocol: "https",
				hostname: "**.supabase.co",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
};

export default nextConfig;

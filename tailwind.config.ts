
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'rgb(230, 230, 230)',
				input: 'rgb(244, 244, 244)',
				ring: 'rgb(0, 113, 227)',
				background: 'rgb(255, 255, 255)',
				foreground: 'rgb(29, 29, 31)',
				primary: {
					DEFAULT: 'rgb(0, 113, 227)',
					foreground: 'rgb(255, 255, 255)'
				},
				secondary: {
					DEFAULT: 'rgb(244, 244, 244)',
					foreground: 'rgb(29, 29, 31)'
				},
				destructive: {
					DEFAULT: 'rgb(255, 59, 48)',
					foreground: 'rgb(255, 255, 255)'
				},
				muted: {
					DEFAULT: 'rgb(246, 246, 246)',
					foreground: 'rgb(134, 134, 139)'
				},
				accent: {
					DEFAULT: 'rgb(242, 242, 247)',
					foreground: 'rgb(29, 29, 31)'
				},
				popover: {
					DEFAULT: 'rgb(255, 255, 255)',
					foreground: 'rgb(29, 29, 31)'
				},
				card: {
					DEFAULT: 'rgb(255, 255, 255)',
					foreground: 'rgb(29, 29, 31)'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: '12px',
				md: '8px',
				sm: '4px'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-up': {
					from: { transform: 'translateY(10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					from: { transform: 'translateY(-10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'slide-down': 'slide-down 0.4s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

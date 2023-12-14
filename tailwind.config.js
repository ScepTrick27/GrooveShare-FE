/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
	  extend: {
		colors: {
		  primary: '#00B2CA',
		  secondary: '#7DCFB6',
		  background: '#FFFFFF',
		  dark: {
			500: '#8CABFF',
			600: '#4477CE',
			700: '#512B81',
			800: '#35155D',
			900: '#13003B',
		  },
		},
	  },
	},
	darkMode: 'class', // Enforce dark mode
	plugins: [],
  };

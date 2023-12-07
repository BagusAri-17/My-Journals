/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '16px',
          sm: '16px',
          md: '64px',
          lg: '120px',
        }
      },
      colors: {
        "darkBlue": "#1C1E53",
        "softYellow": "#FCD980"
      },
      fontFamily: {
        "poppins": ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
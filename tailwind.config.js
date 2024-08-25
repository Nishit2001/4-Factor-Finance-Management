/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {backgroundImage: {
      'Revenue-bro': "url('/src/assets/Revenue-bro.png')",
      'Personal-Finance' : "url('/src/assets/Personal-finance-rafiki.png')",
      'Earnings' : "url('/src/assets/Coins-amico.png')",
      'About' : "url('/src/assets/About us page-amico.png')"
    }},
  },
  plugins: [],
};

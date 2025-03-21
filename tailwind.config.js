/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E1E8EF",
          100: "#D4DEE7",
          200: "#B7C7D7",
          300: "#99B0C7",
          400: "#7C99B6",
          500: "#5E82A6",
          600: "#4C6B8A",
          700: "#3C546C",
          800: "#2C3D4F",
          900: "#1B2631",
          950: "#141C24",
        },
        accent: {
          50: "#FAF5F0",
          100: "#F4ECE1",
          200: "#E8D6BF",
          300: "#DDC2A2",
          400: "#D2AF84",
          500: "#C69963",
          600: "#B78343",
          700: "#926835",
          800: "#6C4D28",
          900: "#4B351B",
          950: "#382814",
        },
      },
    },
  },
  plugins: [],
};



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: "#F3E6FA",
//           100: "#DFC2F0",
//           200: "#C898E2",
//           300: "#B06ED3",
//           400: "#9944C5",
//           500: "#7D26A9",
//           600: "#611E87",
//           700: "#451665",
//           800: "#2A0D42",
//           900: "#26002B", // Deep purple base
//           950: "#1B001F",
//         },
//         accent: {
//           50: "#FAF4E3",
//           100: "#F4E9C7",
//           200: "#EAD99F",
//           300: "#E0C977",
//           400: "#D6B94F",
//           500: "#D4AF37", // **Royal Gold**
//           600: "#B2922C",
//           700: "#8F7621",
//           800: "#6B5917",
//           900: "#473D0D",
//           950: "#2D2507",
//         },
//         secondary: {
//           50: "#FCF8ED",
//           100: "#F8EED4",
//           200: "#F1DFAD",
//           300: "#EBD187",
//           400: "#E5C361",
//           500: "#E6C87F", // **Champagne Gold**
//           600: "#C7A768",
//           700: "#A98852",
//           800: "#8A6A3B",
//           900: "#6B4D26",
//           950: "#4D3718",
//         },
//         background: {
//           50: "#FFFCF3",
//           100: "#FFF8E2", // Soft Beige
//           200: "#FFF3D0",
//           300: "#FFEEBF",
//           400: "#FFE9AE",
//           500: "#FFE39D",
//           600: "#E5CA8C",
//           700: "#CCB07B",
//           800: "#B39669",
//           900: "#9A7D58",
//           950: "#816547",
//         },
//         white: "#FFFFFF",
//       },
//     },
//   },
//   plugins: [],
// };

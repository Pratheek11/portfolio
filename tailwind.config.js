module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        left: {
          "0%": {
            opacity: "0",
            transform: "translateX(-40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
        right: {
          "0%": {
            opacity: "0",
            transform: "translateX(40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          },
        },
      },
      animation: {
        "slide-left": "left 1s ease-in-out",
        "slide-right": "right 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
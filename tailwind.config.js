const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: "true",
      padding: {
        DEFAULT: "2rem", // default padding for all screen sizes
        sm: "2rem", // padding from sm screens and up
        md: "4rem", // padding from md screens and up
        lg: "6rem", // padding from lg screens and up
        xl: "8rem", // padding from xl screens and up
        "2xl": "10.69rem", // padding from 2xl screens and up
      },
    },

    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        appcolors: {
          one: "var(--app-color-1)",
          two: "var(--app-color-2)",
          three: "var(--app-color-3)",
          four: "var(--app-color-4)",
          five: "var(--app-color-5)",
          six: "var(--app-color-6)",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        fira: ["var(--font-fira)", ...fontFamily.sans],
        unbounded: ["var(--font-unbounded)", ...fontFamily.sans],
        instrument: ["var(--font-instrument)", ...fontFamily.serif],
        jura: ["var(--font-jura)", ...fontFamily.sans],
        baloo: ["var(--font-baloo)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 10s ease infinite",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(129.96deg, #FF2F2F 10.43%, #000460 92.78%), radial-gradient(100% 246.94% at 100% 0%, #FFFFFF 0%, #020063 100%), linear-gradient(121.18deg, #1400FF 0.45%, #3A0000 100%), linear-gradient(154.03deg, #FF002E 0%, #FF003D 74.04%), linear-gradient(341.1deg, #B25BBA 7.52%, #1700A7 77.98%), linear-gradient(222.34deg, #0047FF 12.99%, #FF0000 87.21%), linear-gradient(150.76deg, #B7D500 15.35%, #2200AA 89.57%)",
        right:
          "linear-gradient(90deg, hsl(var(--primary-foreground, 287 59.8% 66.9%)) 0%, hsl(var(--background)) 100%)",
        left: "linear-gradient(270deg, hsl(var(--primary-foreground, 287 59.8% 66.9%)) 0%, hsl(var(--background)) 100%)",
      },
      boxShadow: {
        "light-form": "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        "dark-form":
          "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

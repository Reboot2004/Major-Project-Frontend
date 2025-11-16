import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: "#f1f8ff",
                    100: "#e2f0ff",
                    200: "#b9dcff",
                    300: "#8ec7ff",
                    400: "#52a9ff",
                    500: "#1f8cff",
                    600: "#0a6fe6",
                    700: "#0858b4",
                    800: "#064182",
                    900: "#042c5a"
                }
            }
        }
    },
    plugins: [],
};

export default config;

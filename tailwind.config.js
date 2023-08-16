/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {

        extend: {
            colors: {
                thePrimary: "#ff8700",
                thePrimary50: "rgba(255,135,0,0.5)"
            },
        },
    },
    plugins: [],
}

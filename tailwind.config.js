/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#2F4F4F', // اللون الأساسي الداكن
          light: '#52796F',   // درجة أفتح قليلاً للعناصر الثانوية
        },
        terracotta: {
          DEFAULT: '#E2725B', // لون التمييز (الأزرار والتنبيهات)
          hover: '#D05D47',   // لون عند مرور الماوس
        },
        warm: {
          DEFAULT: '#FAFAF9', // خلفية الموقع (أبيض كريمي دافئ)
          card: '#FFFFFF',    // خلفية البطاقات (أبيض نقي لتبرز)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // للنصوص العادية
        serif: ['Lora', 'serif'],      // للعناوين
      }
    },
  },
  plugins: [],
}
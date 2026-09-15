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
        },
        gold: {
          DEFAULT: '#C4A468', // لمسة فاخرة هادئة للعناصر المميزة
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // للنصوص العادية
        serif: ['Lora', 'serif'],      // للعناوين
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(4%, 6%) scale(1.08)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        'marquee': 'marquee 60s linear infinite',
      },
    },
  },
  plugins: [],
}
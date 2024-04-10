import flowbitePlugin from 'flowbite/plugin';
import tailwindScrollbar from 'tailwind-scrollbar';
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customGreen: 'rgb(73, 199, 172)',
      },
    },
  },
  plugins: [
    flowbitePlugin,
    tailwindScrollbar,
  ],
};

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
      backgroundImage: theme=>({
        'custom-gradient': 'linear-gradient(109.6deg, rgb(0, 204, 130) 11.2%, rgb(58, 181, 46) 91.7%)',
      }),
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

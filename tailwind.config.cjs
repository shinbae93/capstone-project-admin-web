/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#FFB606',
        secondary: '#FFB606',
        gray: '#E8EBED',
        price: 'rgba(255,34,68,0.8)',
        lighterBlack: '#424242',
        success: '#52c41a',
      },
      backgroundColor: {
        breadcrumb: '#F3F3F3',
        info: '#333333',
        sider: '#1B1B1B',
      },
      textColor: {
        normal: '#584C47',
        footer: '#999999',
        breadcrumb: '#333333',
        redpink: '#F24C59',
      },
      gridTemplateColumns: {
        'course-item': '270px 1fr',
      },
      borderWidth: {
        thin: '1px',
      },
      borderColor: {
        thin: '#eee',
        info: '#cccccc',
        arrows: '#E8E8E8',
      },
      height: {
        carousel: 'calc(100vh - 120px)',
      },
    },
  },
  plugins: [],
}

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// define: {
	// 	// expose env variables to client-side code
	// 	'process.env': Object.fromEntries(
	// 		Object.entries(import.meta.env).filter(([key]) => key.startsWith('VITE_'))
	// 	),
	// },
});

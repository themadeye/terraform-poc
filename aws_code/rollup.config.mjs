import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";

export default {
    input: {
        "s3-upload": './src/s3-upload.ts',
        "funny-demo": './src/funny-demo.ts',
    },
    output: {
        dir: 'dist',
        entryFileNames: '[name]/[name].js',
        chunkFileNames: "assets/[name].js",
        sourcemap: 'inline',
    },
    plugins: [typescript()]
}
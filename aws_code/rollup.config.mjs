import json from "@rollup/plugin-json";
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";
import summary from 'rollup-plugin-bundle-summary';
import del from 'rollup-plugin-delete';

export default {
    input: {
        "s3-upload": './src/s3-upload.ts',
        "funny-demo": './src/funny-demo.ts',
    },
    output: {
        dir: 'dist',
        entryFileNames: '[name].js',
        chunkFileNames: "assets/[name].js",
        sourcemap: 'inline'
    },
    plugins: [
        del({ targets: 'dist/*' }), // Delete the folder once
        resolve({
            browser: true,
            extensions: ['.js', '.ts']
        }),
        commonjs({
            extensions: ['.js', '.ts'],
            include: [
                'node_modules/**',
            ],
        }),
        typescript({ compilerOptions: { module: 'CommonJS' } }),
        json(),
        nodePolyfills(),
        terser(),
        summary()
    ]
}
import babel from 'rollup-plugin-babel';
import rollupTypescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: './src/main.ts',
    moduleName: 'hmb_math',
    output: {
        file: "./build/main.min.js",
        format: "umd",
        name: 'bundle-name'
    },
    sourceMap: 'true',
    plugins: [
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers', '@babel/plugin-proposal-class-properties'],
            presets: ['@babel/env']
        }),
        rollupTypescript(),
    ]
}
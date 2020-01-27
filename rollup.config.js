import babel from 'rollup-plugin-babel';
import rollupTypescript from 'rollup-plugin-typescript2';

export default {
    input: './src/main.ts',
    output: {
        file: "./build/main.min.js",
        format: "umd",
        name: 'bundle-name'
    },
    sourceMap: 'inline',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers']
        }),
        rollupTypescript()
    ]
}
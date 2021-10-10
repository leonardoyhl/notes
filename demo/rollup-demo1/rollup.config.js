import resolve from 'rollup-plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from 'rollup-plugin-commonjs';    // 将非ES6语法的包转为ES6可用
import autoExternal from 'rollup-plugin-auto-external';
// https://github.com/johnapache/rollup-usage-doc
// https://www.cnblogs.com/blackcat/p/12027440.html
// https://chenshenhai.github.io/rollupjs-note/
import typescript from 'rollup-plugin-typescript';
// import typescript2 from 'rollup-plugin-typescript2'; // 能生成 声明文件，依赖typescript & tslib去编译ts代码
// import babel from 'rollup-plugin-babel';          // rollup 的 babel 插件，ES6转ES5
import replace from 'rollup-plugin-replace';      // 替换待打包文件里的一些变量，如process在浏览器端是不存在的，需要被替换
import json from 'rollup-plugin-json';            // 令 Rollup 从 JSON 文件中读取数据
// import { uglify } from 'rollup-plugin-uglify';        // 压缩包，不支持es6语法
// import { terser } from 'rollup-plugin-terser';        // 打包压缩es6的js代码
import { eslint } from 'rollup-plugin-eslint';
// import serve from 'rollup-plugin-serve';          // 启动一个HTTP服务
// import liveServer from 'rollup-plugin-live-server';
// import path from 'path';
// import safeResolve from 'safe-resolve';

export default {
  input: 'src/index.js',
  treeshake: true,
  // 将其视为外部依赖
  // external: [
  //   'uuid',
  //   'lodash',
  //   'lodash-es',
  // ],
  external: (moduleId, parentModuleId, resolved) => {
    console.log('rollup.config.js', moduleId, parentModuleId, resolved);
    // return /^uuid|^lodash-es|^lodash/.test(moduleId);
    // console.log(moduleId, 'safeResolve', safeResolve(moduleId));
    return /^uuid|^lodash-es|^lodash/.test(moduleId);
  },
  output: [
    {
      file: 'dist/index.es.js',
      format: 'esm',
      // name: 'Test', // 打包后的全局变量，如浏览器端 window.ReactRedux
      globals: {  // 这跟external 是配套使用的，指明global.React即是外部依赖react
        // 'lodash': '_',
      },
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      // name: 'Test', // 打包后的全局变量，如浏览器端 window.ReactRedux
      globals: {  // 这跟external 是配套使用的，指明global.React即是外部依赖react
        // 'lodash': '_',
      },
      sourcemap: true,
    },
  ],
  plugins: [
    // resolve({ jsnext: true, preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时的警告
    resolve(),
    commonjs(),
    // autoExternal({
    //   builtins: false,
    //   dependencies: true,
    //   packagePath: path.resolve('./package.json'),
    //   peerDependencies: true,
    // }),
    autoExternal(),
    typescript(),
    // babel({
    //   exclude: '**/node_modules/**'
    // }),
    replace({
      'process.env.NODE_ENV': 'test',
    }),
    json(),
    eslint(),
  ],
};

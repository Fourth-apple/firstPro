// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
//   };不要了
// const { override, fixBabelImports } = require('customize-cra');不要脸
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
        //  style: 'css',
         style:true,
       }),
       addLessLoader({
           javascriptEnabled: true,
           modifyVars: { '@primary-color': '#1DA57A' },
         }),
     );
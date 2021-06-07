export default {
  title: 'PowerDesign',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  navs: [
    null,
    {},
  ],
  esbuild: {},
  hash: true,
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  }
};

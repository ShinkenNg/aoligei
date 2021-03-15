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
  hash: true,
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.Quill': 'quill',
    })
  ]
};

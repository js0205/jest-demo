module.exports = {
  // 使用 ts-jest 预设，支持 TypeScript 测试
  preset: 'ts-jest',
  
  // 使用 jsdom 作为测试环境，模拟浏览器环境
  testEnvironment: 'jsdom',
  
  // 指定在每个测试文件之前运行的设置文件
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // 模块名称映射，用于处理非 JavaScript 文件的导入
  moduleNameMapper: {
    // 将样式文件映射为身份代理，避免样式导入错误
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    // 将图像和字体文件映射到模拟文件
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js'
  },
  
  // 指定如何转换源文件
  transform: {
    // 使用 ts-jest 转换 TypeScript 文件
    '^.+\\.tsx?$': 'ts-jest'
  },
  
  // 指定 Jest 应该识别的文件扩展名
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
  // 指定哪些路径应该被排除在转换之外
  // 这里排除了 node_modules 下的大多数包，但保留了 @testing-library/jest-dom 的转换
  transformIgnorePatterns: [
    'node_modules/(?!@testing-library/jest-dom)'
  ]
}; 
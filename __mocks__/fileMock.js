/**
 * 文件模拟模块 (File Mock Module)
 * 
 * 这个模块在 Jest 测试环境中用于模拟文件导入。
 * 当测试代码中导入非 JavaScript 文件（如图片、CSS、字体等）时，
 * Jest 可以被配置为使用这个模拟模块替代实际文件。
 * 
 * 在 Jest 配置文件中，通常会有类似以下的配置：
 * moduleNameMapper: {
 *   "\\.(jpg|jpeg|png|gif|svg|css|less|scss)$": "<rootDir>/__mocks__/fileMock.js"
 * }
 * 
 * 这样，当测试代码导入匹配上述模式的文件时，Jest 会返回 'test-file-stub' 字符串，
 * 而不是尝试处理实际文件内容，从而简化测试过程。
 */
module.exports = 'test-file-stub'; 
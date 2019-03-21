module.exports = {
    restoreMocks: true,
    globals: {
      __DEV__: true
    },
    modulePaths: ["<rootDir>/node_modules"],
    setupFiles: ["raf/polyfill"],
    testMatch: ["**/src/**/__tests__/**/*test.(t|j)s?(x)"],
    testURL: "http://localhost/"
  };
  

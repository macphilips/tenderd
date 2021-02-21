module.exports = {
  testEnvironment: "node",
  coverageDirectory: "<rootDir>/build/test-results/",
  coverageReporters: ["html", "text", "lcov"],
  globals: {
    "ts-jest": {
      stringifyContentPathRegex: "\\.html?$",
      tsconfig: "tsconfig.json"
    }
  },
  testMatch: ["<rootDir>/src/test/**/+(*.)+(spec.ts)"],
  testURL: "http://localhost/",
  preset: "ts-jest"
}

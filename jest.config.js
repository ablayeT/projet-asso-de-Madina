module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/tests/setup.ts"],
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
};

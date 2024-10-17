module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

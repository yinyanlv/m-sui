module.exports = {
    verbose: true,
    clearMocks: false,
    collectCoverage: true,
    collectCoverageFrom: ["components/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
    coverageDirectory: "coverage",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/styleMock.js"
    },
    testMatch: ["<rootDir>/**/__tests__/**/*.test.(js|jsx|ts|tsx)"],
    transform: {
        "^.+test\\.(js|jsx)$": "babel-jest",
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"]
};
import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(j|t)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  collectCoverageFrom: ['**/*.(j|t)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};

export default config;

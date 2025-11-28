# Frontend Test Suite

This directory contains comprehensive tests for the React + Vite project setup (Issue #31).

## Test Files

### 1. setup.ts
Test configuration and setup file for Vitest and React Testing Library.

### 2. project-structure.test.ts (26 tests)
Validates the project's folder and file structure:
- Root configuration files
- Directory structure
- Source files
- Application structure
- Assets
- Git configuration

### 3. configuration.test.ts (54 tests)
Validates all configuration files:
- package.json structure and scripts
- TypeScript configuration (tsconfig files)
- Vite configuration
- ESLint configuration
- HTML entry point
- README.md
- Vitest configuration

### 4. build-and-scripts.test.ts (23 tests)
Validates build processes and scripts:
- Node.js version compatibility
- TypeScript compilation
- ESLint execution
- Package management
- Build process
- Development server
- Dependencies installation

### 5. environment.test.ts (22 tests)
Validates environment configuration:
- Environment files (.env.example)
- Environment variable access
- Vite environment types
- Best practices
- Variable validation

### 6. nodejs-and-docs.test.ts (39 tests)
Validates Node.js compatibility and documentation:
- Node.js LTS v20 compatibility
- README.md quality
- Project metadata
- Development workflow
- Production readiness
- Dependency management
- File organization

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Philosophy

These tests focus on **infrastructure validation** rather than application code testing. They verify:

1. **Project Setup** - All required files and folders exist
2. **Configuration** - All configs are valid and properly structured
3. **Tooling** - Build tools, linters, and compilers work correctly
4. **Documentation** - README and configs are complete
5. **Environment** - Environment variables are properly configured
6. **Compatibility** - Node.js and dependency versions are correct

## Coverage Goals

- **Infrastructure Coverage:** 100% (all setup aspects verified)
- **Test Coverage Threshold:** 80% for application code (configured in vitest.config.ts)

## Adding New Tests

When adding new infrastructure or configuration:

1. Add tests to the appropriate test file
2. Follow the existing test structure
3. Use descriptive test names
4. Group related tests in describe blocks
5. Ensure tests are deterministic and isolated

## Test Categories

### Structure Tests
Verify files and folders exist in the correct locations.

### Configuration Tests
Verify configuration files are valid and complete.

### Functional Tests
Verify tools and scripts execute correctly.

### Integration Tests
Verify different parts of the setup work together.

## Continuous Integration

These tests should run on:
- Every commit (pre-commit hook)
- Pull requests
- CI/CD pipeline

## Troubleshooting

### Tests Taking Too Long
Some tests (especially build and lint tests) have extended timeouts (30-60 seconds). This is normal for infrastructure tests.

### Test Failures After Config Changes
If you modify configuration files:
1. Update the corresponding tests
2. Verify the change is intentional
3. Ensure all tests still pass

### Coverage Reports
The low coverage percentage for application code is expected - these tests focus on project setup validation, not application logic.

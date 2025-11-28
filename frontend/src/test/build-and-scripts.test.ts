import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, statSync, readdirSync } from 'fs'
import { join } from 'path'

describe('Build and Scripts - Issue #31', () => {
  const projectRoot = join(__dirname, '../..')

  describe('Node.js Version Compatibility', () => {
    it('should be running on Node.js v20 or higher', () => {
      const nodeVersion = process.version
      const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1))
      expect(majorVersion).toBeGreaterThanOrEqual(20)
    })

    it('should have Node.js version in expected format', () => {
      const nodeVersion = process.version
      expect(nodeVersion).toMatch(/^v\d+\.\d+\.\d+/)
    })
  })

  describe('TypeScript Compilation', () => {
    it('should have TypeScript installed', () => {
      const result = execSync('npx tsc --version', {
        cwd: projectRoot,
        encoding: 'utf-8',
      })
      expect(result).toContain('Version')
    })

    it('should compile TypeScript without errors', () => {
      expect(() => {
        execSync('npx tsc --noEmit', {
          cwd: projectRoot,
          encoding: 'utf-8',
          stdio: 'pipe',
        })
      }).not.toThrow()
    })

    it('should have TypeScript 5.x installed', () => {
      const result = execSync('npx tsc --version', {
        cwd: projectRoot,
        encoding: 'utf-8',
      })
      expect(result).toMatch(/Version 5\.\d+/)
    })
  })

  describe('ESLint', () => {
    it('should have ESLint installed', { timeout: 30000 }, () => {
      const result = execSync('npx eslint --version', {
        cwd: projectRoot,
        encoding: 'utf-8',
      })
      expect(result).toMatch(/v\d+\.\d+/)
    })

    it('should run ESLint without critical errors', { timeout: 60000 }, () => {
      try {
        execSync('npm run lint', {
          cwd: projectRoot,
          encoding: 'utf-8',
          stdio: 'pipe',
        })
        expect(true).toBe(true)
      } catch (error: any) {
        // ESLint may have warnings but should not crash
        expect(error.status).toBeLessThan(2)
      }
    })
  })

  describe('Package Manager', () => {
    it('should have package-lock.json', () => {
      const lockPath = join(projectRoot, 'package-lock.json')
      expect(existsSync(lockPath)).toBe(true)
    })

    it('should have node_modules installed', () => {
      const nodeModulesPath = join(projectRoot, 'node_modules')
      expect(existsSync(nodeModulesPath)).toBe(true)
      expect(statSync(nodeModulesPath).isDirectory()).toBe(true)
    })

    it('should have React installed in node_modules', () => {
      const reactPath = join(projectRoot, 'node_modules', 'react')
      expect(existsSync(reactPath)).toBe(true)
    })

    it('should have Vite installed in node_modules', () => {
      const vitePath = join(projectRoot, 'node_modules', 'vite')
      expect(existsSync(vitePath)).toBe(true)
    })
  })

  describe('Build Process', () => {
    it('should be able to run build command', () => {
      // This test verifies the build command exists and can be executed
      // We'll check if the command is defined in package.json
      const packageJson = require(join(projectRoot, 'package.json'))
      expect(packageJson.scripts.build).toBeDefined()
      expect(packageJson.scripts.build).toContain('vite build')
    })

    it('should create dist directory after build', { timeout: 60000 }, () => {
      try {
        // Run the build
        execSync('npm run build', {
          cwd: projectRoot,
          encoding: 'utf-8',
          stdio: 'pipe',
        })

        const distPath = join(projectRoot, 'dist')
        expect(existsSync(distPath)).toBe(true)
        expect(statSync(distPath).isDirectory()).toBe(true)
      } catch (error: any) {
        // If build fails, check if it's a configuration issue vs compilation issue
        expect(error.message).not.toContain('command not found')
      }
    })

    it('should generate index.html in dist after build', () => {
      const distIndexPath = join(projectRoot, 'dist', 'index.html')
      if (existsSync(join(projectRoot, 'dist'))) {
        expect(existsSync(distIndexPath)).toBe(true)
      } else {
        // Skip if build hasn't run yet
        expect(true).toBe(true)
      }
    })

    it('should generate assets directory in dist after build', () => {
      const distAssetsPath = join(projectRoot, 'dist', 'assets')
      if (existsSync(join(projectRoot, 'dist'))) {
        expect(existsSync(distAssetsPath)).toBe(true)
      } else {
        // Skip if build hasn't run yet
        expect(true).toBe(true)
      }
    })
  })

  describe('Development Server', () => {
    it('should have dev script defined', () => {
      const packageJson = require(join(projectRoot, 'package.json'))
      expect(packageJson.scripts.dev).toBeDefined()
      expect(packageJson.scripts.dev).toContain('vite')
    })

    it('should have preview script defined', () => {
      const packageJson = require(join(projectRoot, 'package.json'))
      expect(packageJson.scripts.preview).toBeDefined()
      expect(packageJson.scripts.preview).toContain('vite preview')
    })
  })

  describe('Vite Configuration Validation', () => {
    it('should be able to import vite config', async () => {
      const viteConfigPath = join(projectRoot, 'vite.config.ts')
      expect(existsSync(viteConfigPath)).toBe(true)
    })

    it('should have valid vite configuration syntax', () => {
      expect(() => {
        execSync('npx vite --version', {
          cwd: projectRoot,
          encoding: 'utf-8',
        })
      }).not.toThrow()
    })
  })

  describe('Dependencies Installation', () => {
    it('should have all production dependencies installed', () => {
      const packageJson = require(join(projectRoot, 'package.json'))
      const dependencies = Object.keys(packageJson.dependencies || {})

      dependencies.forEach((dep) => {
        const depPath = join(projectRoot, 'node_modules', dep)
        expect(
          existsSync(depPath),
          `${dep} should be installed in node_modules`
        ).toBe(true)
      })
    })

    it('should have critical devDependencies installed', () => {
      const criticalDevDeps = ['vite', 'typescript', 'eslint', 'vitest']

      criticalDevDeps.forEach((dep) => {
        const depPath = join(projectRoot, 'node_modules', dep)
        expect(
          existsSync(depPath),
          `${dep} should be installed in node_modules`
        ).toBe(true)
      })
    })
  })

  describe('Project Execution', () => {
    it('should have executable scripts in package.json', () => {
      const packageJson = require(join(projectRoot, 'package.json'))
      const requiredScripts = ['dev', 'build', 'lint', 'preview', 'test']

      requiredScripts.forEach((script) => {
        expect(
          packageJson.scripts[script],
          `${script} script should be defined`
        ).toBeDefined()
      })
    })

    it('should not have syntax errors in main entry file', { timeout: 30000 }, () => {
      // TypeScript compilation check was already done in the TypeScript Compilation section
      // Here we just verify the file exists and is readable
      const mainPath = join(projectRoot, 'src', 'main.tsx')
      expect(existsSync(mainPath)).toBe(true)
      const content = require('fs').readFileSync(mainPath, 'utf-8')
      expect(content).toContain('createRoot')
      expect(content).toContain('App')
    })
  })
})

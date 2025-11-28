import { describe, it, expect } from 'vitest'
import { existsSync, statSync } from 'fs'
import { join } from 'path'

describe('Project Structure - Issue #31', () => {
  const projectRoot = join(__dirname, '../..')

  describe('Root Files', () => {
    it('should have package.json in root', () => {
      const packageJsonPath = join(projectRoot, 'package.json')
      expect(existsSync(packageJsonPath)).toBe(true)
      expect(statSync(packageJsonPath).isFile()).toBe(true)
    })

    it('should have vite.config.ts', () => {
      const vitePath = join(projectRoot, 'vite.config.ts')
      expect(existsSync(vitePath)).toBe(true)
      expect(statSync(vitePath).isFile()).toBe(true)
    })

    it('should have tsconfig.json', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json')
      expect(existsSync(tsconfigPath)).toBe(true)
      expect(statSync(tsconfigPath).isFile()).toBe(true)
    })

    it('should have tsconfig.app.json', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.app.json')
      expect(existsSync(tsconfigPath)).toBe(true)
      expect(statSync(tsconfigPath).isFile()).toBe(true)
    })

    it('should have tsconfig.node.json', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.node.json')
      expect(existsSync(tsconfigPath)).toBe(true)
      expect(statSync(tsconfigPath).isFile()).toBe(true)
    })

    it('should have eslint.config.js', () => {
      const eslintPath = join(projectRoot, 'eslint.config.js')
      expect(existsSync(eslintPath)).toBe(true)
      expect(statSync(eslintPath).isFile()).toBe(true)
    })

    it('should have README.md', () => {
      const readmePath = join(projectRoot, 'README.md')
      expect(existsSync(readmePath)).toBe(true)
      expect(statSync(readmePath).isFile()).toBe(true)
    })

    it('should have .gitignore', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      expect(existsSync(gitignorePath)).toBe(true)
      expect(statSync(gitignorePath).isFile()).toBe(true)
    })

    it('should have index.html', () => {
      const htmlPath = join(projectRoot, 'index.html')
      expect(existsSync(htmlPath)).toBe(true)
      expect(statSync(htmlPath).isFile()).toBe(true)
    })

    it('should have vitest.config.ts', () => {
      const vitestPath = join(projectRoot, 'vitest.config.ts')
      expect(existsSync(vitestPath)).toBe(true)
      expect(statSync(vitestPath).isFile()).toBe(true)
    })
  })

  describe('Directory Structure', () => {
    it('should have src directory', () => {
      const srcPath = join(projectRoot, 'src')
      expect(existsSync(srcPath)).toBe(true)
      expect(statSync(srcPath).isDirectory()).toBe(true)
    })

    it('should have public directory', () => {
      const publicPath = join(projectRoot, 'public')
      expect(existsSync(publicPath)).toBe(true)
      expect(statSync(publicPath).isDirectory()).toBe(true)
    })

    it('should have node_modules directory', () => {
      const nodeModulesPath = join(projectRoot, 'node_modules')
      expect(existsSync(nodeModulesPath)).toBe(true)
      expect(statSync(nodeModulesPath).isDirectory()).toBe(true)
    })

    it('should have src/test directory', () => {
      const testPath = join(projectRoot, 'src', 'test')
      expect(existsSync(testPath)).toBe(true)
      expect(statSync(testPath).isDirectory()).toBe(true)
    })
  })

  describe('Source Files', () => {
    it('should have src/main.tsx', () => {
      const mainPath = join(projectRoot, 'src', 'main.tsx')
      expect(existsSync(mainPath)).toBe(true)
      expect(statSync(mainPath).isFile()).toBe(true)
    })

    it('should have src/App.tsx', () => {
      const appPath = join(projectRoot, 'src', 'App.tsx')
      expect(existsSync(appPath)).toBe(true)
      expect(statSync(appPath).isFile()).toBe(true)
    })

    it('should have src/index.css', () => {
      const cssPath = join(projectRoot, 'src', 'index.css')
      expect(existsSync(cssPath)).toBe(true)
      expect(statSync(cssPath).isFile()).toBe(true)
    })

    it('should have src/App.css', () => {
      const cssPath = join(projectRoot, 'src', 'App.css')
      expect(existsSync(cssPath)).toBe(true)
      expect(statSync(cssPath).isFile()).toBe(true)
    })
  })

  describe('Application Structure', () => {
    it('should have src/types directory', () => {
      const typesPath = join(projectRoot, 'src', 'types')
      expect(existsSync(typesPath)).toBe(true)
      expect(statSync(typesPath).isDirectory()).toBe(true)
    })

    it('should have src/services directory', () => {
      const servicesPath = join(projectRoot, 'src', 'services')
      expect(existsSync(servicesPath)).toBe(true)
      expect(statSync(servicesPath).isDirectory()).toBe(true)
    })

    it('should have src/pages directory', () => {
      const pagesPath = join(projectRoot, 'src', 'pages')
      expect(existsSync(pagesPath)).toBe(true)
      expect(statSync(pagesPath).isDirectory()).toBe(true)
    })
  })

  describe('Assets', () => {
    it('should have src/assets directory', () => {
      const assetsPath = join(projectRoot, 'src', 'assets')
      expect(existsSync(assetsPath)).toBe(true)
      expect(statSync(assetsPath).isDirectory()).toBe(true)
    })

    it('should have public/vite.svg', () => {
      const svgPath = join(projectRoot, 'public', 'vite.svg')
      expect(existsSync(svgPath)).toBe(true)
      expect(statSync(svgPath).isFile()).toBe(true)
    })
  })

  describe('Git Configuration', () => {
    it('.gitignore should ignore node_modules', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      const content = require('fs').readFileSync(gitignorePath, 'utf-8')
      expect(content).toContain('node_modules')
    })

    it('.gitignore should ignore dist', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      const content = require('fs').readFileSync(gitignorePath, 'utf-8')
      expect(content).toContain('dist')
    })

    it('.gitignore should ignore logs', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      const content = require('fs').readFileSync(gitignorePath, 'utf-8')
      expect(content).toContain('logs')
    })
  })
})

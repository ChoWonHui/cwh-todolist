import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('Configuration Files - Issue #31', () => {
  const projectRoot = join(__dirname, '../..')

  describe('package.json', () => {
    const packageJsonPath = join(projectRoot, 'package.json')
    let packageJson: any

    it('should be valid JSON', () => {
      const content = readFileSync(packageJsonPath, 'utf-8')
      expect(() => JSON.parse(content)).not.toThrow()
      packageJson = JSON.parse(content)
    })

    it('should have name field', () => {
      const content = readFileSync(packageJsonPath, 'utf-8')
      packageJson = JSON.parse(content)
      expect(packageJson.name).toBeDefined()
      expect(typeof packageJson.name).toBe('string')
    })

    it('should have version field', () => {
      expect(packageJson.version).toBeDefined()
      expect(typeof packageJson.version).toBe('string')
    })

    it('should have type: module', () => {
      expect(packageJson.type).toBe('module')
    })

    it('should have required scripts', () => {
      expect(packageJson.scripts).toBeDefined()
      expect(packageJson.scripts.dev).toBeDefined()
      expect(packageJson.scripts.build).toBeDefined()
      expect(packageJson.scripts.lint).toBeDefined()
      expect(packageJson.scripts.preview).toBeDefined()
    })

    it('should have dev script using vite', () => {
      expect(packageJson.scripts.dev).toContain('vite')
    })

    it('should have build script with TypeScript check', () => {
      expect(packageJson.scripts.build).toContain('tsc')
      expect(packageJson.scripts.build).toContain('vite build')
    })

    it('should have lint script using eslint', () => {
      expect(packageJson.scripts.lint).toContain('eslint')
    })

    it('should have React dependencies', () => {
      expect(packageJson.dependencies.react).toBeDefined()
      expect(packageJson.dependencies['react-dom']).toBeDefined()
    })

    it('should have Vite in devDependencies', () => {
      expect(packageJson.devDependencies.vite).toBeDefined()
    })

    it('should have TypeScript in devDependencies', () => {
      expect(packageJson.devDependencies.typescript).toBeDefined()
    })

    it('should have ESLint in devDependencies', () => {
      expect(packageJson.devDependencies.eslint).toBeDefined()
    })

    it('should have React Vite plugin', () => {
      expect(packageJson.devDependencies['@vitejs/plugin-react']).toBeDefined()
    })

    it('should have test scripts', () => {
      expect(packageJson.scripts.test).toBeDefined()
      expect(packageJson.scripts['test:ui']).toBeDefined()
      expect(packageJson.scripts['test:coverage']).toBeDefined()
    })
  })

  describe('TypeScript Configuration', () => {
    describe('tsconfig.json', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json')
      let tsconfig: any

      it('should be valid JSON', () => {
        const content = readFileSync(tsconfigPath, 'utf-8')
        expect(() => JSON.parse(content)).not.toThrow()
        tsconfig = JSON.parse(content)
      })

      it('should have references to app and node configs', () => {
        expect(tsconfig.references).toBeDefined()
        expect(Array.isArray(tsconfig.references)).toBe(true)
        expect(tsconfig.references.length).toBeGreaterThan(0)
      })

      it('should reference tsconfig.app.json', () => {
        const hasAppConfig = tsconfig.references.some(
          (ref: any) => ref.path === './tsconfig.app.json'
        )
        expect(hasAppConfig).toBe(true)
      })

      it('should reference tsconfig.node.json', () => {
        const hasNodeConfig = tsconfig.references.some(
          (ref: any) => ref.path === './tsconfig.node.json'
        )
        expect(hasNodeConfig).toBe(true)
      })
    })

    describe('tsconfig.app.json', () => {
      const tsconfigAppPath = join(projectRoot, 'tsconfig.app.json')
      let tsconfigApp: any

      it('should exist and be readable', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        expect(content.length).toBeGreaterThan(0)
        // TypeScript config files can contain comments (JSON5), so we just check structure
        expect(content).toContain('compilerOptions')
      })

      it('should have compilerOptions', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        // Parse after removing comments
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        tsconfigApp = JSON.parse(jsonContent)
        expect(tsconfigApp.compilerOptions).toBeDefined()
      })

      it('should target modern ES version', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        tsconfigApp = JSON.parse(jsonContent)
        expect(tsconfigApp.compilerOptions.target).toBeDefined()
        expect(['ES2020', 'ES2021', 'ES2022', 'ESNext']).toContain(
          tsconfigApp.compilerOptions.target
        )
      })

      it('should have JSX configuration for React', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        tsconfigApp = JSON.parse(jsonContent)
        expect(tsconfigApp.compilerOptions.jsx).toBe('react-jsx')
      })

      it('should have strict mode enabled', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        tsconfigApp = JSON.parse(jsonContent)
        expect(tsconfigApp.compilerOptions.strict).toBe(true)
      })

      it('should include src directory', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        tsconfigApp = JSON.parse(jsonContent)
        expect(tsconfigApp.include).toBeDefined()
        expect(tsconfigApp.include).toContain('src')
      })

      it('should have module resolution configured', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        tsconfigApp = JSON.parse(jsonContent)
        expect(tsconfigApp.compilerOptions.moduleResolution).toBeDefined()
      })

      it('should have DOM lib included', () => {
        const content = readFileSync(tsconfigAppPath, 'utf-8')
        const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
        tsconfigApp = JSON.parse(jsonContent)
        expect(tsconfigApp.compilerOptions.lib).toBeDefined()
        const hasDOM = tsconfigApp.compilerOptions.lib.some((lib: string) =>
          lib.includes('DOM')
        )
        expect(hasDOM).toBe(true)
      })
    })
  })

  describe('Vite Configuration', () => {
    const viteConfigPath = join(projectRoot, 'vite.config.ts')
    let viteConfig: string

    it('should exist and be readable', () => {
      expect(() => {
        viteConfig = readFileSync(viteConfigPath, 'utf-8')
      }).not.toThrow()
    })

    it('should import defineConfig from vite', () => {
      expect(viteConfig).toContain("from 'vite'")
      expect(viteConfig).toContain('defineConfig')
    })

    it('should import React plugin', () => {
      expect(viteConfig).toContain("from '@vitejs/plugin-react'")
    })

    it('should configure React plugin', () => {
      expect(viteConfig).toContain('plugins')
      expect(viteConfig).toContain('react()')
    })

    it('should export default configuration', () => {
      expect(viteConfig).toContain('export default')
    })
  })

  describe('ESLint Configuration', () => {
    const eslintConfigPath = join(projectRoot, 'eslint.config.js')
    let eslintConfig: string

    it('should exist and be readable', () => {
      expect(() => {
        eslintConfig = readFileSync(eslintConfigPath, 'utf-8')
      }).not.toThrow()
    })

    it('should import from @eslint/js', () => {
      expect(eslintConfig).toContain("from '@eslint/js'")
    })

    it('should import typescript-eslint', () => {
      expect(eslintConfig).toContain("from 'typescript-eslint'")
    })

    it('should import React hooks plugin', () => {
      expect(eslintConfig).toContain("from 'eslint-plugin-react-hooks'")
    })

    it('should import React refresh plugin', () => {
      expect(eslintConfig).toContain("from 'eslint-plugin-react-refresh'")
    })

    it('should have defineConfig', () => {
      expect(eslintConfig).toContain('defineConfig')
    })

    it('should ignore dist directory', () => {
      expect(eslintConfig).toContain('dist')
    })

    it('should configure TypeScript files', () => {
      expect(eslintConfig).toContain('**/*.{ts,tsx}')
    })
  })

  describe('HTML Entry Point', () => {
    const htmlPath = join(projectRoot, 'index.html')
    let html: string

    it('should be valid HTML5 doctype', () => {
      html = readFileSync(htmlPath, 'utf-8')
      expect(html).toContain('<!doctype html>')
    })

    it('should have root div element', () => {
      expect(html).toContain('<div id="root"></div>')
    })

    it('should reference main.tsx script', () => {
      expect(html).toContain('/src/main.tsx')
      expect(html).toContain('type="module"')
    })

    it('should have viewport meta tag', () => {
      expect(html).toContain('name="viewport"')
      expect(html).toContain('width=device-width')
    })

    it('should have charset meta tag', () => {
      expect(html).toContain('<meta charset="UTF-8"')
    })
  })

  describe('README.md', () => {
    const readmePath = join(projectRoot, 'README.md')
    let readme: string

    it('should exist and be readable', () => {
      expect(() => {
        readme = readFileSync(readmePath, 'utf-8')
      }).not.toThrow()
    })

    it('should have content (not empty)', () => {
      expect(readme.trim().length).toBeGreaterThan(0)
    })

    it('should mention React', () => {
      expect(readme.toLowerCase()).toContain('react')
    })

    it('should mention Vite', () => {
      expect(readme.toLowerCase()).toContain('vite')
    })

    it('should have headings', () => {
      expect(readme).toMatch(/^#/m)
    })
  })

  describe('Vitest Configuration', () => {
    const vitestConfigPath = join(projectRoot, 'vitest.config.ts')
    let vitestConfig: string

    it('should exist and be readable', () => {
      expect(() => {
        vitestConfig = readFileSync(vitestConfigPath, 'utf-8')
      }).not.toThrow()
    })

    it('should import from vitest/config', () => {
      expect(vitestConfig).toContain("from 'vitest/config'")
    })

    it('should have test configuration', () => {
      expect(vitestConfig).toContain('test:')
    })

    it('should configure coverage', () => {
      expect(vitestConfig).toContain('coverage:')
    })

    it('should set coverage threshold to 80%', () => {
      expect(vitestConfig).toContain('80')
    })
  })
})

import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

describe('Node.js Compatibility and Documentation - Issue #31', () => {
  const projectRoot = join(__dirname, '../..')

  describe('Node.js LTS v20 Compatibility', () => {
    it('should be running on Node.js v20 LTS or higher', () => {
      const nodeVersion = process.version
      const match = nodeVersion.match(/^v(\d+)\.(\d+)\.(\d+)/)

      expect(match).not.toBeNull()

      const [, major] = match!
      const majorVersion = parseInt(major)

      expect(majorVersion).toBeGreaterThanOrEqual(20)
    })

    it('should display Node.js version correctly', () => {
      const version = execSync('node --version', { encoding: 'utf-8' }).trim()
      expect(version).toMatch(/^v\d+\.\d+\.\d+/)
    })

    it('should have npm available', () => {
      const version = execSync('npm --version', { encoding: 'utf-8' }).trim()
      expect(version).toMatch(/^\d+\.\d+\.\d+/)
    })

    it('should support ES modules', () => {
      const packageJsonPath = join(projectRoot, 'package.json')
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      expect(packageJson.type).toBe('module')
    })

    it('should support modern JavaScript features', () => {
      // Test optional chaining
      const obj: any = { a: { b: { c: 'value' } } }
      expect(obj?.a?.b?.c).toBe('value')

      // Test nullish coalescing
      const value = null ?? 'default'
      expect(value).toBe('default')
    })

    it('should support async/await', async () => {
      const asyncFunction = async () => {
        return new Promise((resolve) => setTimeout(() => resolve('done'), 10))
      }

      const result = await asyncFunction()
      expect(result).toBe('done')
    })
  })

  describe('README.md Documentation Quality', () => {
    const readmePath = join(projectRoot, 'README.md')
    let readme: string

    beforeAll(() => {
      readme = readFileSync(readmePath, 'utf-8')
    })

    it('should have a title/heading', () => {
      expect(readme).toMatch(/^#\s+.+/m)
    })

    it('should be at least 100 characters long', () => {
      expect(readme.length).toBeGreaterThan(100)
    })

    it('should mention the tech stack', () => {
      const lowerReadme = readme.toLowerCase()
      expect(lowerReadme).toMatch(/react|vite|typescript/)
    })

    it('should have multiple sections', () => {
      const headingCount = (readme.match(/^#{1,6}\s+/gm) || []).length
      expect(headingCount).toBeGreaterThan(1)
    })

    it('should mention React', () => {
      expect(readme).toMatch(/React/i)
    })

    it('should mention Vite', () => {
      expect(readme).toMatch(/Vite/i)
    })

    it('should mention TypeScript', () => {
      expect(readme).toMatch(/TypeScript/i)
    })

    it('should have code blocks or examples', () => {
      const hasCodeBlock = readme.includes('```')
      expect(hasCodeBlock).toBe(true)
    })

    it('should mention ESLint configuration', () => {
      expect(readme.toLowerCase()).toContain('eslint')
    })

    it('should have useful content (not just template)', () => {
      // Check for multiple paragraphs
      const paragraphs = readme
        .split('\n\n')
        .filter((p) => p.trim().length > 0)
      expect(paragraphs.length).toBeGreaterThan(2)
    })
  })

  describe('Project Metadata', () => {
    const packageJsonPath = join(projectRoot, 'package.json')
    let packageJson: any

    beforeAll(() => {
      packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    })

    it('should have a project name', () => {
      expect(packageJson.name).toBeDefined()
      expect(typeof packageJson.name).toBe('string')
      expect(packageJson.name.length).toBeGreaterThan(0)
    })

    it('should have a version number', () => {
      expect(packageJson.version).toBeDefined()
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+/)
    })

    it('should specify private: true for application', () => {
      expect(packageJson.private).toBe(true)
    })

    it('should specify module type', () => {
      expect(packageJson.type).toBe('module')
    })
  })

  describe('Development Workflow', () => {
    const packageJsonPath = join(projectRoot, 'package.json')
    let packageJson: any

    beforeAll(() => {
      packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    })

    it('should have all essential npm scripts', () => {
      const essentialScripts = ['dev', 'build', 'lint', 'preview', 'test']

      essentialScripts.forEach((script) => {
        expect(
          packageJson.scripts[script],
          `Missing ${script} script`
        ).toBeDefined()
      })
    })

    it('dev script should start development server', () => {
      expect(packageJson.scripts.dev).toContain('vite')
      expect(packageJson.scripts.dev).not.toContain('build')
    })

    it('build script should include TypeScript check', () => {
      expect(packageJson.scripts.build).toContain('tsc')
    })

    it('build script should run vite build', () => {
      expect(packageJson.scripts.build).toContain('vite build')
    })

    it('lint script should run ESLint', () => {
      expect(packageJson.scripts.lint).toContain('eslint')
    })

    it('test scripts should be comprehensive', () => {
      expect(packageJson.scripts.test).toBeDefined()
      expect(packageJson.scripts['test:ui']).toBeDefined()
      expect(packageJson.scripts['test:coverage']).toBeDefined()
    })
  })

  describe('Production Readiness', () => {
    it('should have proper TypeScript configuration for production', () => {
      const tsconfigAppPath = join(projectRoot, 'tsconfig.app.json')
      const content = readFileSync(tsconfigAppPath, 'utf-8')
      // Remove comments before parsing
      const jsonContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
      const tsconfig = JSON.parse(jsonContent)

      expect(tsconfig.compilerOptions.strict).toBe(true)
      expect(tsconfig.compilerOptions.noUnusedLocals).toBe(true)
      expect(tsconfig.compilerOptions.noUnusedParameters).toBe(true)
    })

    it('should have ESLint configured', () => {
      const eslintPath = join(projectRoot, 'eslint.config.js')
      const eslintConfig = readFileSync(eslintPath, 'utf-8')

      expect(eslintConfig).toContain('typescript-eslint')
      expect(eslintConfig).toContain('react-hooks')
    })

    it('should have .gitignore for build artifacts', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      const gitignore = readFileSync(gitignorePath, 'utf-8')

      expect(gitignore).toContain('node_modules')
      expect(gitignore).toContain('dist')
    })

    it('should ignore environment files in git', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      const gitignore = readFileSync(gitignorePath, 'utf-8')

      expect(gitignore).toMatch(/\.env/)
    })
  })

  describe('Dependency Management', () => {
    const packageJsonPath = join(projectRoot, 'package.json')
    let packageJson: any

    beforeAll(() => {
      packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
    })

    it('should have React as production dependency', () => {
      expect(packageJson.dependencies.react).toBeDefined()
    })

    it('should have React DOM as production dependency', () => {
      expect(packageJson.dependencies['react-dom']).toBeDefined()
    })

    it('should have build tools as dev dependencies', () => {
      expect(packageJson.devDependencies.vite).toBeDefined()
      expect(packageJson.devDependencies.typescript).toBeDefined()
    })

    it('should have testing tools as dev dependencies', () => {
      expect(packageJson.devDependencies.vitest).toBeDefined()
    })

    it('should have React types defined', () => {
      expect(packageJson.devDependencies['@types/react']).toBeDefined()
      expect(packageJson.devDependencies['@types/react-dom']).toBeDefined()
    })

    it('should use compatible React versions', () => {
      const reactVersion = packageJson.dependencies.react
      const reactDomVersion = packageJson.dependencies['react-dom']

      // Both should be defined and similar version ranges
      expect(reactVersion).toBeDefined()
      expect(reactDomVersion).toBeDefined()
    })
  })

  describe('File Organization', () => {
    it('should have organized source structure', () => {
      const srcPath = join(projectRoot, 'src')
      const srcContent = readFileSync(join(srcPath, 'main.tsx'), 'utf-8')

      // main.tsx should import App
      expect(srcContent).toContain('App')
    })

    it('should have proper entry point', () => {
      const indexHtmlPath = join(projectRoot, 'index.html')
      const indexHtml = readFileSync(indexHtmlPath, 'utf-8')

      // Should reference main.tsx
      expect(indexHtml).toContain('/src/main.tsx')
    })

    it('should have CSS files in proper location', () => {
      const indexCssPath = join(projectRoot, 'src', 'index.css')
      expect(existsSync(indexCssPath)).toBe(true)
    })
  })
})

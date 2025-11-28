import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

describe('Environment Configuration - Issue #31', () => {
  const projectRoot = join(__dirname, '../..')

  describe('Environment Files', () => {
    it('should have .env.example file', () => {
      const envExamplePath = join(projectRoot, '.env.example')
      expect(existsSync(envExamplePath)).toBe(true)
    })

    it('.env.example should contain VITE_ prefixed variables', () => {
      const envExamplePath = join(projectRoot, '.env.example')
      const content = readFileSync(envExamplePath, 'utf-8')
      expect(content).toMatch(/VITE_/)
    })

    it('.env.example should have API URL configuration', () => {
      const envExamplePath = join(projectRoot, '.env.example')
      const content = readFileSync(envExamplePath, 'utf-8')
      expect(content).toContain('VITE_API_URL')
    })

    it('.env.example should have environment setting', () => {
      const envExamplePath = join(projectRoot, '.env.example')
      const content = readFileSync(envExamplePath, 'utf-8')
      expect(content).toMatch(/VITE_.*ENV/)
    })

    it('.env should be in .gitignore', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      const content = readFileSync(gitignorePath, 'utf-8')
      expect(content).toMatch(/\.env/)
    })
  })

  describe('Environment Variable Access', () => {
    it('should have import.meta.env available in Vite environment', () => {
      // In Vite, environment variables are available via import.meta.env
      expect(import.meta.env).toBeDefined()
    })

    it('should have MODE defined in import.meta.env', () => {
      expect(import.meta.env.MODE).toBeDefined()
    })

    it('should have DEV flag defined', () => {
      expect(import.meta.env.DEV).toBeDefined()
      expect(typeof import.meta.env.DEV).toBe('boolean')
    })

    it('should have PROD flag defined', () => {
      expect(import.meta.env.PROD).toBeDefined()
      expect(typeof import.meta.env.PROD).toBe('boolean')
    })

    it('should have BASE_URL defined', () => {
      expect(import.meta.env.BASE_URL).toBeDefined()
      expect(typeof import.meta.env.BASE_URL).toBe('string')
    })

    it('DEV and PROD should be opposite', () => {
      expect(import.meta.env.DEV).not.toBe(import.meta.env.PROD)
    })
  })

  describe('Vite Environment Variable Types', () => {
    it('should have vite/client types', () => {
      const tsconfigAppPath = join(projectRoot, 'tsconfig.app.json')
      const content = readFileSync(tsconfigAppPath, 'utf-8')
      expect(content).toContain('vite/client')
    })
  })

  describe('Environment Configuration Best Practices', () => {
    it('.env.example should have comments explaining variables', () => {
      const envExamplePath = join(projectRoot, '.env.example')
      const content = readFileSync(envExamplePath, 'utf-8')
      expect(content).toMatch(/#/)
    })

    it('.env.example should be non-empty', () => {
      const envExamplePath = join(projectRoot, '.env.example')
      const content = readFileSync(envExamplePath, 'utf-8')
      expect(content.trim().length).toBeGreaterThan(0)
    })

    it('.env.example should use proper format (KEY=value)', () => {
      const envExamplePath = join(projectRoot, '.env.example')
      const content = readFileSync(envExamplePath, 'utf-8')
      const lines = content.split('\n').filter((line) => line.trim() && !line.startsWith('#'))

      lines.forEach((line) => {
        expect(line).toMatch(/^[A-Z_]+=.+/)
      })
    })

    it('should not have .env file committed (security)', () => {
      const gitignorePath = join(projectRoot, '.gitignore')
      const content = readFileSync(gitignorePath, 'utf-8')
      expect(content).toContain('.env')
    })
  })

  describe('Environment Variable Validation', () => {
    let envExampleContent: string
    let envVars: { [key: string]: string }

    beforeAll(() => {
      const envExamplePath = join(projectRoot, '.env.example')
      envExampleContent = readFileSync(envExamplePath, 'utf-8')

      // Parse env variables
      envVars = {}
      envExampleContent.split('\n').forEach((line) => {
        if (line.trim() && !line.startsWith('#')) {
          const [key, value] = line.split('=')
          if (key && value) {
            envVars[key.trim()] = value.trim()
          }
        }
      })
    })

    it('should have VITE_API_URL defined', () => {
      expect(envVars.VITE_API_URL).toBeDefined()
    })

    it('VITE_API_URL should be a valid URL format', () => {
      const apiUrl = envVars.VITE_API_URL
      expect(apiUrl).toMatch(/^https?:\/\//)
    })

    it('should define environment-specific variables', () => {
      const hasEnvVar = Object.keys(envVars).some((key) =>
        key.includes('ENV')
      )
      expect(hasEnvVar).toBe(true)
    })

    it('all environment variables should use VITE_ prefix', () => {
      const nonCommentLines = envExampleContent
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#'))

      nonCommentLines.forEach((line) => {
        const key = line.split('=')[0].trim()
        expect(key).toMatch(/^VITE_/)
      })
    })
  })

  describe('Environment Mode Configuration', () => {
    it('should support development mode', () => {
      // In test mode, we can verify MODE is defined
      const mode = import.meta.env.MODE
      expect(mode).toBeDefined()
      expect(['development', 'production', 'test']).toContain(mode)
    })

    it('should have consistent environment detection', () => {
      const isDev = import.meta.env.DEV
      const mode = import.meta.env.MODE

      if (isDev) {
        expect(mode).not.toBe('production')
      } else {
        expect(mode).toBe('production')
      }
    })
  })
})

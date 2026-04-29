#!/usr/bin/env node

/**
 * Generate TypeScript types from backend OpenAPI/Swagger documentation
 * 
 * This script:
 * 1. Fetches the OpenAPI spec from the running backend
 * 2. Generates TypeScript types using openapi-typescript
 * 3. Saves them to src/types/generated/api.ts
 * 
 * Usage:
 *   npm run generate:types
 * 
 * Requirements:
 *   - Backend must be running at NEXT_PUBLIC_API_URL
 *   - Backend must expose Swagger at /docs-json
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const execAsync = promisify(exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuration
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'
const SWAGGER_ENDPOINT = `${BACKEND_URL}/docs-json`
const OUTPUT_FILE = join(__dirname, '../src/types/generated/api.ts')

async function checkBackendHealth() {
  console.log('🔍 Checking if backend is running...')
  console.log(`   URL: ${BACKEND_URL}`)
  
  try {
    const response = await fetch(`${BACKEND_URL}/health`)
    if (response.ok) {
      console.log('✅ Backend is running')
      return true
    }
  } catch (error) {
    console.error('❌ Backend is not running!')
    console.error('   Please start the backend first:')
    console.error('   cd 234photos-backend && npm run start:dev')
    return false
  }
  return false
}

async function generateTypes() {
  console.log('\n🚀 Starting OpenAPI type generation...\n')
  
  // Check if backend is running
  const isBackendRunning = await checkBackendHealth()
  if (!isBackendRunning) {
    process.exit(1)
  }
  
  // Ensure output directory exists
  const outputDir = dirname(OUTPUT_FILE)
  if (!existsSync(outputDir)) {
    console.log(`📁 Creating directory: ${outputDir}`)
    mkdirSync(outputDir, { recursive: true })
  }
  
  console.log('\n🔄 Generating types from Swagger...')
  console.log(`   Source: ${SWAGGER_ENDPOINT}`)
  console.log(`   Output: ${OUTPUT_FILE}`)
  
  try {
    // Generate types using openapi-typescript
    const command = `npx openapi-typescript "${SWAGGER_ENDPOINT}" -o "${OUTPUT_FILE}"`
    
    const { stdout, stderr } = await execAsync(command)
    
    if (stderr && !stderr.includes('deprecated')) {
      console.warn('⚠️  Warnings:', stderr)
    }
    
    console.log('\n✅ Types generated successfully!')
    console.log(`📁 Output: ${OUTPUT_FILE}`)
    console.log('\n💡 You can now import types from @/types/generated')
    console.log('   Example: import type { paths, components } from "@/types/generated"')
    
  } catch (error) {
    console.error('\n❌ Failed to generate types!')
    console.error('Error:', error.message)
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Make sure the backend is running:')
      console.error('   cd 234photos-backend && npm run start:dev')
    }
    
    process.exit(1)
  }
}

// Run the generator
generateTypes()

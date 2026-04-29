# Generated API Types

This directory contains **auto-generated TypeScript types** from the backend's OpenAPI/Swagger documentation.

## ⚠️ Important

**DO NOT EDIT FILES IN THIS DIRECTORY MANUALLY**

These files are automatically generated and will be overwritten. Any manual changes will be lost.

## 🔄 Generating Types

### Prerequisites

The backend must be running before generating types:

```bash
cd 234photos-backend
npm run start:dev
```

### Generate Types

```bash
# From the frontend directory
npm run generate:types
```

This will:
1. Check if backend is running at `http://localhost:3001/api/v1`
2. Fetch the OpenAPI spec from `/docs-json`
3. Generate TypeScript types to `src/types/generated/api.ts`

### Watch Mode (Optional)

Auto-regenerate types when backend changes:

```bash
npm run generate:types:watch
```

This watches the backend `src` directory and regenerates types on any change.

## 📦 Usage

### Import Generated Types

```typescript
// Import specific DTOs
import type { 
  UserResponseDto, 
  AssetResponseDto,
  DownloadResponseDto 
} from '@/types/generated'

// Import raw OpenAPI types
import type { paths, components } from '@/types/generated'

// Use helper types for API calls
import type { ApiResponse, ApiRequestBody } from '@/types/generated'

type LoginResponse = ApiResponse<'/auth/login', 'post'>
type LoginRequest = ApiRequestBody<'/auth/login', 'post'>
```

### Example: Type-Safe API Client

```typescript
import type { paths } from '@/types/generated'

// Extract types from paths
type LoginResponse = paths['/auth/login']['post']['responses']['200']['content']['application/json']
type SignupRequest = paths['/auth/signup']['post']['requestBody']['content']['application/json']

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  return response.json()
}
```

## 🎯 Benefits

✅ **Single Source of Truth** - Backend Swagger defines all types  
✅ **Auto-Sync** - Types update automatically when backend changes  
✅ **Type Safety** - Catch API changes at compile time  
✅ **Zero Maintenance** - No manual type updates needed  
✅ **Full IDE Support** - Complete autocomplete for all endpoints  

## 🔧 Configuration

### Backend URL

Set the backend URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Generation Script

The generation script is located at `scripts/generate-types.mjs`.

## 📝 Files

- `api.ts` - Raw generated types from OpenAPI spec (auto-generated)
- `index.ts` - Friendly exports and helper types (manually maintained)
- `README.md` - This file

## 🐛 Troubleshooting

### "Backend is not running"

Make sure the backend is running:
```bash
cd 234photos-backend
npm run start:dev
```

### "Failed to generate types"

1. Check backend is accessible at `http://localhost:3001/api/v1/health`
2. Check Swagger is available at `http://localhost:3001/api/v1/docs`
3. Ensure all backend DTOs have proper Swagger decorators

### Types are outdated

Regenerate types after backend changes:
```bash
npm run generate:types
```

## 🔄 CI/CD Integration

To auto-generate types in CI/CD, add to your pipeline:

```yaml
# .github/workflows/ci.yml
- name: Start backend
  run: cd 234photos-backend && npm run start:dev &
  
- name: Wait for backend
  run: npx wait-on http://localhost:3001/api/v1/health
  
- name: Generate types
  run: cd 234photos-frontend && npm run generate:types
  
- name: Type check
  run: cd 234photos-frontend && npm run type-check
```

## 📚 Learn More

- [openapi-typescript](https://github.com/drwpow/openapi-typescript)
- [OpenAPI Specification](https://swagger.io/specification/)
- [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)

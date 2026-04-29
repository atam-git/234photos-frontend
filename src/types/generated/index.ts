/**
 * Generated API Types
 * 
 * Auto-generated from backend OpenAPI/Swagger documentation.
 * 
 * To regenerate: npm run generate:types
 * 
 * Usage:
 *   import type { UserResponseDto, AssetResponseDto } from '@/types/generated'
 *   import type { paths, components } from '@/types/generated'
 */

// Re-export the main generated types
export type { paths, components, operations } from './api'

// Import for internal use
import type { components, paths } from './api'

// Extract commonly used schema types for convenience
export type Schemas = components['schemas']

// User types
export type UserResponseDto = Schemas['UserResponseDto']
export type UserProfileResponseDto = Schemas['UserProfileResponseDto']
export type AuthResponseDto = Schemas['AuthResponseDto']

// Asset types
export type AssetResponseDto = Schemas['AssetResponseDto']
export type AssetPricesDto = Schemas['AssetPricesDto']
export type AssetStatsDto = Schemas['AssetStatsDto']

// Notification types
export type NotificationResponseDto = Schemas['NotificationResponseDto']
export type NotificationPreferencesDto = Schemas['NotificationPreferencesDto']

// Base response types
export type PaginatedResponseDto = Schemas['PaginatedResponseDto']
export type PaginationMetaDto = Schemas['PaginationMetaDto']

// Helper type to extract response types from paths
export type ApiResponse<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends { responses: { 200: { content: { 'application/json': infer R } } } }
  ? R
  : paths[Path][Method] extends { responses: { 201: { content: { 'application/json': infer R } } } }
  ? R
  : never

// Helper type to extract request body types from paths
export type ApiRequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = paths[Path][Method] extends { requestBody: { content: { 'application/json': infer R } } }
  ? R
  : never

// Examples of using the helper types:
// type LoginResponse = ApiResponse<'/api/v1/auth/login', 'post'>
// type LoginRequest = ApiRequestBody<'/api/v1/auth/login', 'post'>
// type GetAssetsResponse = ApiResponse<'/api/v1/assets', 'get'>

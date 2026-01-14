export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponseDto {
  message: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export type UserRole = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isEmailVerified: boolean;
  createdAt: string; // Dates are strings in JSON responses
  updatedAt: string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ForgotPasswordDto { // Fixed typo from backend 'FrorgetPasswordDto'
  email: string;
}

export interface VerifyResetCodeDto {
  code: string;
}

export interface ResetPasswordDto {
  password: string;
}

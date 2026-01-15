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

export type UserRole = 'ADMIN' | 'STUDENT';

export interface UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    googleId: string | null;
    title: string | null;
    company: string | null;
    phone: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    profileImageUrl: string | null;
    coverImageUrl: string | null;
    twoFA: boolean;
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

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

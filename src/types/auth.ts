export type User = {
  id: string;
  email: string;
  displayName: string;
  isActive: boolean;
  lastLoginAt: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponseData = {
  user: User;
  accessToken: string;
  refreshToken: string;
  message: string;
};

type UserRole = "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: {
    path: string;
  };
  role: UserRole;
  createdAt: Date | string;
  updatedAt: Date | string;
};

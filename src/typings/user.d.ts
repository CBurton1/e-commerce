declare namespace ECS {
  interface User {
    id?: string;
    isAdmin?: boolean;
    email: string;
    firstName: string;
    lastName: string;
  }

  interface SignUpData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
}
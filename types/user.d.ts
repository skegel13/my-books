declare namespace Auth {
  interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: {
      id: number;
      name: string;
      description: string;
      type: string;
    };
    created_at: Date | string;
    updated_at: Date | string;
  }
}

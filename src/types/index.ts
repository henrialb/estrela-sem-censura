export interface User {
  name: string;
  avatar_url: string;
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  created_at: string;
}

export interface Post {
  id: string;
  facebook_id: string;
  permalink_url: string;
  comments: Comment[];
}

export interface AuthContextType {
  user: User | null;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

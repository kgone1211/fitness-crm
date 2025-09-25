import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface ClientTokenPayload {
  clientId: string;
  email: string;
  type: 'client';
  iat?: number;
  exp?: number;
}

export class ClientAuth {
  static generateToken(clientId: string, email: string): string {
    return jwt.sign(
      { clientId, email, type: 'client' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  static verifyToken(token: string): ClientTokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as ClientTokenPayload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  static isTokenValid(token: string): boolean {
    const payload = this.verifyToken(token);
    return payload !== null && payload.type === 'client';
  }

  static getClientIdFromToken(token: string): string | null {
    const payload = this.verifyToken(token);
    return payload?.clientId || null;
  }
}

// Client-side authentication utilities
export const clientAuthUtils = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('client-token');
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('client-token', token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('client-token');
  },

  isAuthenticated: (): boolean => {
    const token = clientAuthUtils.getToken();
    if (!token) return false;
    
    try {
      const payload = jwt.decode(token) as ClientTokenPayload;
      return payload?.type === 'client' && payload?.exp && payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  logout: (): void => {
    clientAuthUtils.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/client/login';
    }
  }
};

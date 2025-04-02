import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { postLogin } from '../../Request';
import { apiClient } from '../../../../../core/apiClient';

// Mock the axios client
vi.mock('../../../../../core/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
    defaults: {
      headers: {
        common: {}
      }
    }
  },
  setAuthToken: vi.fn(),
  setRefreshToken: vi.fn()
}));

// Mock localStorage
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
});

describe('postLogin', () => {
  const mockCredentials = {
    email: 'test@example.com',
    password: 'password123'
  };

  const mockResponse = {
    data: {
      token: 'mock-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
      }
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should make a POST request to /api/auth/login with credentials', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    // Execute
    const result = await postLogin(mockCredentials);

    // Verify
    expect(apiClient.post).toHaveBeenCalledWith('/api/auth/login', mockCredentials);
    expect(result).toEqual(mockResponse.data);
  });

  it('should store the token in localStorage and set the Authorization header', async () => {
    // Setup
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    // Execute
    await postLogin(mockCredentials);

    // Verify
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', mockResponse.data.token);
    expect(apiClient.defaults.headers.common['Authorization']).toBe(`Bearer ${mockResponse.data.token}`);
  });

  it('should throw an error if the API call fails', async () => {
    // Setup
    const mockError = new Error('Network error');
    vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);
    
    // Execute & Verify
    await expect(postLogin(mockCredentials)).rejects.toThrow(mockError);
  });
}); 
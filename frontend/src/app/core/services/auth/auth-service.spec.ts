import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service';
import { Supabase } from '../supabase/supabase';

describe('AuthService', () => {
  let service: AuthService;
  let supabaseMock: {
    client: {
      auth: {
        signInWithPassword: ReturnType<typeof vi.fn>;
        signOut: ReturnType<typeof vi.fn>;
        getSession: ReturnType<typeof vi.fn>;
        onAuthStateChange: ReturnType<typeof vi.fn>;
      }
    }
  };

  beforeEach(() => {
    supabaseMock = {
      client: {
        auth: {
          signInWithPassword: vi.fn(),
          signOut: vi.fn(),
          getSession: vi.fn(),
          onAuthStateChange: vi.fn()
        }
      }
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Supabase,
          useValue: supabaseMock
        }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should call supabase signIn function with email and password', async () => {
      await service.signIn('email123', 'password1');

      expect(supabaseMock.client.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'email123',
        password: 'password1'
      });
    });
  });

  describe('signOut', () => {
    it('should call the client signOut function', async () => {
      await service.signOut();

      expect(supabaseMock.client.auth.signOut).toHaveBeenCalled();
    })
  })

  describe('getSession', () => {
    it('should retrieve the user session', async () => {
      await service.getSession();

      expect(supabaseMock.client.auth.getSession).toHaveBeenCalled();
    })
  })

  describe('onAuthStateChange', () => {
    it('should call the onAuthStateChange supabase function with the provided callback', () => {
      const callback = vi.fn();
      service.onAuthStateChange(callback);

      expect(supabaseMock.client.auth.onAuthStateChange).toHaveBeenCalledWith(callback);
    })
  })
});

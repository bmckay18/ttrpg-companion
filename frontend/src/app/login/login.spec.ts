import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { AuthService } from '../core/services/auth/auth-service';
import { Router } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceMock: {
    signIn: ReturnType<typeof vi.fn>;
  };
  let routerMock: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    authServiceMock = {
      signIn: vi.fn(),
    };

    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should return when the form is invalid', async () => {
      await component.onSubmit();

      expect(authServiceMock.signIn).not.toHaveBeenCalled();
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('should call the auth service with the provided email and password', async () => {
      component.loginForm.setValue({
        email: 'email@email.com',
        password: 'password123',
      });

      authServiceMock.signIn.mockResolvedValue({
        data: {
          user: 1,
        },
      });

      await component.onSubmit();

      expect(component.loginForm.valid).toBe(true);
      expect(authServiceMock.signIn).toHaveBeenCalledWith('email@email.com', 'password123');
    });

    it('should navigate to the campaigns tab on successful sign in', async () => {
      component.loginForm.setValue({
        email: 'email@email.com',
        password: 'password123',
      });

      authServiceMock.signIn.mockResolvedValue({
        data: {
          user: 1,
        },
      });

      await component.onSubmit();

      expect(component.loginForm.valid).toBe(true);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/app/campaigns']);
    });

    it('should return if an error occurs during sign in', async () => {
      component.loginForm.setValue({
        email: 'email@email.com',
        password: 'password123',
      });

      authServiceMock.signIn.mockResolvedValue({
        error: {
          message: 'error',
        },
      });

      await component.onSubmit();

      expect(component.loginForm.valid).toBe(true);
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });
  });
});

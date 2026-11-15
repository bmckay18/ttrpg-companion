import { TestBed } from '@angular/core/testing';

const { mockCreateClient } = vi.hoisted(() => ({
  mockCreateClient: vi.fn(),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: mockCreateClient,
}));

import { Supabase } from './supabase';
import { environment } from '../../../../environments/environment';

describe('Supabase', () => {
  let service: Supabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create client with url and key', () => {
    expect(mockCreateClient).toHaveBeenCalledWith(environment.supabaseUrl, environment.supabaseKey);
  });
});

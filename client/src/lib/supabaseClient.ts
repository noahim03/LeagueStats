import { createClient } from '@supabase/supabase-js';

// Temporary hardcoded values for testing
const supabaseUrl = 'https://eribnfzxznpwwccnkaea.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyaWJuZnp4em5wd3djY25rYWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNzQ0MzcsImV4cCI6MjA2Mjc1MDQzN30.gCyLdPR1ILHAtIKYxZgO14xMw1TXhlthJgoN4cmGkDo';

console.log('Using Supabase URL:', supabaseUrl);
console.log('Using Supabase Key (first 10 chars):', supabaseKey.substring(0, 10) + '...');

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection
supabase.from('Champions').select('count').single()
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    } else {
      console.log('Supabase connection test successful');
    }
  }); 
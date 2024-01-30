import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(
  'https://nkqnblcgpjimqjjqjzws.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rcW5ibGNncGppbXFqanFqendzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUwMTczMDAsImV4cCI6MjAyMDU5MzMwMH0.8FCU9rN9IyZJ8-xyouDHWAs4sS-QGiXzXOACU6VvYfg',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

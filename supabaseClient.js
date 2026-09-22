// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dalnxsrbjduqynggvwej.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbG54c3JiamR1cXluZ2d2d2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxMTU0NDksImV4cCI6MjEwMDY5MTQ0OX0.8orbQDLrhuEAqZ4TKLYiTob81F1HJlQVATsOJMg7jrQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
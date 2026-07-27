// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dalnxsrbjduqynggvwej.supabase.co/rest/v1/candidature'
const supabaseKey = 'dalnxsrbjduqynggvwej'

export const supabase = createClient(supabaseUrl, supabaseKey)
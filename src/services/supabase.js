
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://tgunhjnulqzfcxxjpzex.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndW5oam51bHF6ZmN4eGpwemV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MDg0NDcsImV4cCI6MjAwOTA4NDQ0N30.qx68KrD1_CncDpK17cTOo6WARYTE8kcP_Buzh84OAlc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
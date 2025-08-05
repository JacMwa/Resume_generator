import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hesazmzlsmlxbvsvdmem.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlc2F6bXpsc21seGJ2c3ZkbWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTQzODUsImV4cCI6MjA2OTI5MDM4NX0.HqSISVCjxf42s_pvngh90oXC52Z5N0N8kft8mV1_1GU'

export const supabase = createClient(supabaseUrl, supabaseKey)

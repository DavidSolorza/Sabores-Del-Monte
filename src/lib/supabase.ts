import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para obtener el contador de visitas
export const getVisitCount = async () => {
  const { data, error } = await supabase
    .from('visit_counter')
    .select('total_visits')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Error fetching visit count:', error)
    return 0
  }

  return data?.total_visits || 0
}

// Función para incrementar el contador de visitas
export const incrementVisitCount = async () => {
  const { data, error } = await supabase.rpc('increment_visit_counter')

  if (error) {
    console.error('Error incrementing visit count:', error)
    return 0
  }

  return data || 0
}
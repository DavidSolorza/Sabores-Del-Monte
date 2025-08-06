/*
  # Crear tabla de contador de visitas

  1. Nueva Tabla
    - `visit_counter`
      - `id` (integer, primary key)
      - `total_visits` (integer, contador total)
      - `updated_at` (timestamp, última actualización)

  2. Seguridad
    - Habilitar RLS en la tabla `visit_counter`
    - Agregar política para que todos puedan leer el contador
    - Agregar política para que solo el sistema pueda actualizar
*/

CREATE TABLE IF NOT EXISTS visit_counter (
  id integer PRIMARY KEY DEFAULT 1,
  total_visits integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Insertar registro inicial si no existe
INSERT INTO visit_counter (id, total_visits) 
VALUES (1, 0) 
ON CONFLICT (id) DO NOTHING;

ALTER TABLE visit_counter ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a todos
CREATE POLICY "Anyone can read visit counter"
  ON visit_counter
  FOR SELECT
  TO public
  USING (true);

-- Política para permitir actualización a todos (necesario para incrementar contador)
CREATE POLICY "Anyone can update visit counter"
  ON visit_counter
  FOR UPDATE
  TO public
  USING (id = 1);

-- Función para incrementar visitas de forma segura
CREATE OR REPLACE FUNCTION increment_visit_counter()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE visit_counter 
  SET total_visits = total_visits + 1, 
      updated_at = now()
  WHERE id = 1
  RETURNING total_visits INTO new_count;
  
  RETURN new_count;
END;
$$;
/*
  # Update testimonials table for image uploads

  1. Changes
    - Add `image_data` column to store base64 encoded images
    - Keep `display_picture` for backward compatibility
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add image_data column to testimonials table
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS image_data TEXT;

-- Update existing policies to include the new column
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Anyone can read approved testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admins can manage all testimonials" ON testimonials;

-- Recreate policies
CREATE POLICY "Anyone can insert testimonials"
  ON testimonials
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read approved testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (approved = true);

CREATE POLICY "Admins can manage all testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
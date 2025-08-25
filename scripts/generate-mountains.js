import fs from 'fs'
import { supabase } from '../src/lib/supabase.js'

async function generate() {
  try {
    console.log('🔄 Fetching data from Supabase...')
    
    const { data, error } = await supabase
      .from('mountain')
      .select(`
        id, name, elevation, lat, long,
        province:province_id (name), island:island_id (name)
      `)
      .order('name')

    if (error) {
      // Check if it's a paused database error
      if (error.message?.includes('paused') || error.message?.includes('suspended') || error.code === 'PGRST301') {
        console.warn('⚠️  Supabase database is paused/suspended. Skipping data fetch.')
        console.log('📝 Using existing mountains.json file if available...')
        
        // Check if mountains.json already exists
        if (fs.existsSync('public/mountains.json')) {
          console.log('✅ Existing mountains.json found, continuing with build...')
          return
        } else {
          console.log('📄 Creating empty mountains.json as fallback...')
          fs.writeFileSync('public/mountains.json', JSON.stringify([], null, 2))
          return
        }
      }
      
      // For other errors, still exit with error
      console.error('❌ Error fetching data: ', error)
      process.exit(1)
    }

    const flatData = data.map(m => ({
      id: m.id,
      name: m.name,
      elevation: m.elevation,
      lat: m.lat,
      long: m.long,
      province: m.province?.name || null,
      island: m.island?.name || null,
    }))

    fs.writeFileSync('public/mountains.json', JSON.stringify(flatData, null, 2))
    console.log('✅ mountains.json generated successfully')
    
  } catch (err) {
    // Handle network errors or connection timeouts
    if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.message?.includes('timeout')) {
      console.warn('⚠️  Network error connecting to Supabase. Skipping data fetch.')
      console.log('📝 Using existing mountains.json file if available...')
      
      if (fs.existsSync('public/mountains.json')) {
        console.log('✅ Existing mountains.json found, continuing with build...')
        return
      } else {
        console.log('📄 Creating empty mountains.json as fallback...')
        fs.writeFileSync('public/mountains.json', JSON.stringify([], null, 2))
        return
      }
    }
    
    // For unexpected errors, log and exit
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

generate()

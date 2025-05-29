import fs from 'fs'
import { supabase } from '../src/lib/supabase.js'

async function generate() {
  const { data, error } = await supabase
    .from('mountain')
    .select(`
      id, name, elevation, lat, long,
      province:province_id (name), island:island_id (name)
    `)
    .order('name')

  if (error) {
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
  console.log('✅ mountains.json generated')
}

generate()

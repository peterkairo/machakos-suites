import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

type Room = {
  id: string
  name: string
  price: number
  is_featured?: boolean
  image_url?: string
}

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState<Room[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const { data, error } = await supabase.from('rooms').select('id,name,price,is_featured,image_url').order('is_featured', { ascending: false }).limit(6)
        if (error) throw error
        if (mounted) setRooms(data as Room[])
      } catch (e) {
        console.error('Failed to load rooms', e)
        if (mounted) setRooms(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold">Featured Rooms</h2>
        <div className="mt-4">
          {loading && <p>Loading rooms…</p>}
          {!loading && (!rooms || rooms.length === 0) && (
            <p className="mt-2">No rooms found — fallback content displayed.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {rooms && rooms.map((r) => (
              <article key={r.id} className="border p-4 rounded">
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-gray-600">KES {r.price}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabase'

type Review = {
  id: string
  guest_name: string
  rating: number
  comment: string
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const { data, error } = await supabase.from('reviews').select('id,guest_name,rating,comment').eq('is_approved', true).limit(6)
        if (error) throw error
        if (mounted) setReviews(data as Review[])
      } catch (e) {
        console.error('Failed to load reviews', e)
        if (mounted) setReviews(null)
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
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <div className="mt-4">
          {loading && <p>Loading reviews…</p>}
          {!loading && (!reviews || reviews.length === 0) && (
            <p className="mt-2">No reviews yet.</p>
          )}
          <div className="space-y-4 mt-4">
            {reviews && reviews.map((r) => (
              <blockquote key={r.id} className="border-l-4 pl-4">
                <p className="italic">“{r.comment}”</p>
                <footer className="mt-2 text-sm">— {r.guest_name}, {r.rating}/5</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

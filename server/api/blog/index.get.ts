export default defineEventHandler(async (event) => {
  try {
    const supabase = useSupabaseServer()

    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, category, category_color, author, read_time, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase query error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch blog posts'
      })
    }

    // Format the response
    const posts = (data || []).map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      categoryColor: post.category_color,
      author: post.author,
      readTime: post.read_time,
      date: new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }))

    return { posts }
  } catch (err) {
    console.error('Blog posts fetch error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})

export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (R) => R.min(0).max(5),
    },
    { name: 'reviews', title: 'Reviews label', type: 'string' },
    {
      name: 'featured',
      title: 'Show as Top Product on Home Page',
      type: 'boolean',
      initialValue: false,
      description:
        'If ON, this item can appear in the Home page product row. If no items are marked, the Home page falls back to showing the highest-rated items automatically.',
    },
  ],
}

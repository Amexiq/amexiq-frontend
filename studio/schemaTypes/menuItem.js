export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Main Dishes', 'Starters', 'Dessert', 'Drinks'] },
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
  ],
}

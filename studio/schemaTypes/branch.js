export default {
  name: 'branch',
  title: 'Branch',
  type: 'document',
  fields: [
    { name: 'name', title: 'Branch Name', type: 'string', validation: (R) => R.required() },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'mapLink', title: 'Google Maps Link', type: 'url' },
    { name: 'order', title: 'Sort Order', type: 'number' },
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}

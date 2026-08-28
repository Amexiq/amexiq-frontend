export default {
  name: 'aboutUs',
  title: 'About Us Page',
  type: 'document',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'body', title: 'Body text (leave a blank line between paragraphs)', type: 'text' },
    { name: 'yearsExperience', title: 'Years of Experience', type: 'number' },
    { name: 'image', title: 'Section Image', type: 'image', options: { hotspot: true } },
    {
      name: 'points',
      title: 'Highlight Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
    },
  ],
}

export default {
  name: 'homeStats',
  title: 'Home Page Stats',
  type: 'document',
  fields: [
    {
      name: 'stats',
      title: 'Stat Counters',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'number' },
            { name: 'suffix', title: 'Suffix (e.g. "+", "%")', type: 'string', initialValue: '+' },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: ['orders', 'menu', 'visitors', 'deliveries'] },
            },
          ],
        },
      ],
    },
  ],
}

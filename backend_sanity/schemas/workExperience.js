export default {
  name: 'workExperience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    {name: 'name', title: 'name', type: 'string'},
    {name: 'key', title: 'key', type: 'string'},
    {name: 'year1', title: 'year1', type: 'string'},
    {name: 'year2', title: 'year2', type: 'string'},
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Desc',
      type: 'string',
    },
  ],
}

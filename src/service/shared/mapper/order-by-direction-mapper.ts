const fieldMapping: Record<
  'Ascending' | 'Descending',
  'Ascending' | 'Descending'
> = {
  Ascending: 'Ascending',
  Descending: 'Descending',
};

export const dto2Entity = (
  src: 'Ascending' | 'Descending'
): 'Ascending' | 'Descending' => fieldMapping[src];

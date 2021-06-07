export class AddNewItesmDto {
  listId: string;
  items: Array<{ id: string; name: string; quantity: number }>;
}

export default AddNewItesmDto;

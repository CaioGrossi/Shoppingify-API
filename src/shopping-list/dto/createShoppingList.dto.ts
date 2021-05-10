export class CreateShoppingListDto {
  userId: string;
  listName: string;
  items: Array<{ name: string; quantity: number }>;
}

export default CreateShoppingListDto;

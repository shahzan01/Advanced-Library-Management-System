export interface Book {
  id: string;
  isbn: string;
  title: string;
  description?: string;
  copies: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

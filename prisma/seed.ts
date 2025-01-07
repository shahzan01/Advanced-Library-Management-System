import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const transaction = await prisma.$transaction(async (prisma) => {
    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          name: "Alice Johnson",
          email: "alice@example.com",
          password: "securepass123",
          role: "ADMIN",
          emailVerified: true,
        },
        {
          id: "user-2",
          name: "Bob Smith",
          email: "bob@example.com",
          password: "securepass456",
          role: "MEMBER",
          emailVerified: false,
        },
        {
          id: "user-3",
          name: "Charlie Brown",
          email: "charlie@example.com",
          password: "securepass789",
          role: "MEMBER",
          emailVerified: true,
        },
        {
          id: "user-4",
          name: "David Green",
          email: "david@example.com",
          password: "securepass101",
          role: "MEMBER",
          emailVerified: true,
        },
        {
          id: "user-5",
          name: "Eva White",
          email: "eva@example.com",
          password: "securepass102",
          role: "MEMBER",
          emailVerified: true,
        },
        {
          id: "user-6",
          name: "Frank Black",
          email: "frank@example.com",
          password: "securepass103",
          role: "MEMBER",
          emailVerified: false,
        },
        {
          id: "user-7",
          name: "Grace Blue",
          email: "grace@example.com",
          password: "securepass104",
          role: "ADMIN",
          emailVerified: true,
        },
        {
          id: "user-8",
          name: "Henry Red",
          email: "henry@example.com",
          password: "securepass105",
          role: "MEMBER",
          emailVerified: true,
        },
        {
          id: "user-9",
          name: "Isla Pink",
          email: "isla@example.com",
          password: "securepass106",
          role: "MEMBER",
          emailVerified: true,
        },
        {
          id: "user-10",
          name: "Jack Grey",
          email: "jack@example.com",
          password: "securepass107",
          role: "MEMBER",
          emailVerified: false,
        },
      ],
    });

    // Seed Authors
    await prisma.author.createMany({
      data: [
        { id: "author-1", name: "George Orwell" },
        { id: "author-2", name: "J.K. Rowling" },
        { id: "author-3", name: "Harper Lee" },
        { id: "author-4", name: "J.R.R. Tolkien" },
        { id: "author-5", name: "F. Scott Fitzgerald" },
        { id: "author-6", name: "Jane Austen" },
        { id: "author-7", name: "Mark Twain" },
        { id: "author-8", name: "Agatha Christie" },
        { id: "author-9", name: "Leo Tolstoy" },
        { id: "author-10", name: "Charles Dickens" },
      ],
    });

    // Seed Categories
    await prisma.category.createMany({
      data: [
        { id: "category-1", name: "Fiction" },
        { id: "category-2", name: "Science Fiction" },
        { id: "category-3", name: "Non-fiction" },
        { id: "category-4", name: "Romance" },
        { id: "category-5", name: "Mystery" },
        { id: "category-6", name: "Biography" },
        { id: "category-7", name: "Fantasy" },
        { id: "category-8", name: "Historical" },
      ],
    });

    // Seed Books
    await prisma.book.createMany({
      data: [
        {
          id: "book-1",
          isbn: "9780451524935",
          title: "1984",
          description: "A dystopian novel by George Orwell.",
          copies: 10,
        },
        {
          id: "book-2",
          isbn: "9780747532743",
          title: "Harry Potter and the Philosopher's Stone",
          description:
            "The first book in the Harry Potter series by J.K. Rowling.",
          copies: 15,
        },
        {
          id: "book-3",
          isbn: "9780061120084",
          title: "To Kill a Mockingbird",
          description:
            "A novel by Harper Lee about racial injustice in the Deep South.",
          copies: 5,
        },
        {
          id: "book-4",
          isbn: "9780261103573",
          title: "The Hobbit",
          description: "A fantasy novel by J.R.R. Tolkien.",
          copies: 12,
        },
        {
          id: "book-5",
          isbn: "9780743273565",
          title: "The Great Gatsby",
          description:
            "A novel by F. Scott Fitzgerald set in the Roaring Twenties.",
          copies: 8,
        },
        {
          id: "book-6",
          isbn: "9780141040349",
          title: "Pride and Prejudice",
          description: "A novel by Jane Austen about love and social standing.",
          copies: 10,
        },
        {
          id: "book-7",
          isbn: "9780143039563",
          title: "Adventures of Huckleberry Finn",
          description:
            "A novel by Mark Twain about a boy's adventures along the Mississippi River.",
          copies: 7,
        },
        {
          id: "book-8",
          isbn: "9780007121008",
          title: "Murder on the Orient Express",
          description: "A famous mystery novel by Agatha Christie.",
          copies: 9,
        },
        {
          id: "book-9",
          isbn: "9780307266934",
          title: "War and Peace",
          description: "A novel by Leo Tolstoy set during the Napoleonic Wars.",
          copies: 4,
        },
        {
          id: "book-10",
          isbn: "9781853263306",
          title: "A Tale of Two Cities",
          description:
            "A historical novel by Charles Dickens set during the French Revolution.",
          copies: 6,
        },
      ],
    });

    await prisma.bookCategory.createMany({
      data: [
        { bookId: "book-1", categoryId: "category-1" },
        { bookId: "book-1", categoryId: "category-2" },
        { bookId: "book-2", categoryId: "category-1" },
        { bookId: "book-2", categoryId: "category-7" },
        { bookId: "book-3", categoryId: "category-1" },
        { bookId: "book-3", categoryId: "category-4" },
        { bookId: "book-4", categoryId: "category-7" },
        { bookId: "book-5", categoryId: "category-1" },
        { bookId: "book-5", categoryId: "category-4" },
        { bookId: "book-6", categoryId: "category-1" },
        { bookId: "book-6", categoryId: "category-5" },
        { bookId: "book-7", categoryId: "category-1" },
        { bookId: "book-8", categoryId: "category-5" },
        { bookId: "book-9", categoryId: "category-8" },
        { bookId: "book-10", categoryId: "category-8" },
      ],
    });

    await prisma.bookAuthor.createMany({
      data: [
        { bookId: "book-1", authorId: "author-1" },
        { bookId: "book-2", authorId: "author-2" },
        { bookId: "book-3", authorId: "author-3" },
        { bookId: "book-4", authorId: "author-4" },
        { bookId: "book-5", authorId: "author-5" },
        { bookId: "book-6", authorId: "author-6" },
        { bookId: "book-7", authorId: "author-7" },
        { bookId: "book-8", authorId: "author-8" },
        { bookId: "book-9", authorId: "author-9" },
        { bookId: "book-10", authorId: "author-10" },
      ],
    });

    const currentDate = new Date();

    await prisma.borrowedBook.createMany({
      data: [
        {
          id: "borrowed-1",
          userId: "user-2",
          bookId: "book-1",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-2",
          userId: "user-3",
          bookId: "book-2",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-3",
          userId: "user-4",
          bookId: "book-3",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-4",
          userId: "user-5",
          bookId: "book-4",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-5",
          userId: "user-6",
          bookId: "book-5",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-6",
          userId: "user-7",
          bookId: "book-6",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-7",
          userId: "user-8",
          bookId: "book-7",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-8",
          userId: "user-9",
          bookId: "book-8",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-9",
          userId: "user-10",
          bookId: "book-9",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
        {
          id: "borrowed-10",
          userId: "user-10",
          bookId: "book-10",
          dueDate: new Date(currentDate.setDate(currentDate.getDate() + 14)),
        },
      ],
    });

    console.log("Database seeded!");
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

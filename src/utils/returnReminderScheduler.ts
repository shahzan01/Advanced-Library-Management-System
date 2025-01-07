import schedule from "node-schedule";
import prisma from "../config/db";
import { mailSender } from "../utils/mailSender";
import returnReminder from "../mail/templates/returnReminderEmailTemplate";
export const scheduleReturnReminders = async () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 2);

  schedule.scheduleJob("32 18 * * *", async () => {
    console.log("Running return reminder job...");

    try {
      const borrowedBooksDue = await prisma.borrowedBook.findMany({
        where: {
          dueDate: {
            gte: today,
            lt: tomorrow,
          },
          returnedAt: null,
        },
        include: {
          user: true,
          book: true,
        },
      });

      console.log(borrowedBooksDue);
      for (const borrowedBook of borrowedBooksDue) {
        const { user, book, dueDate } = borrowedBook;

        if (!user.emailVerified) continue;

        const mailResponse = await mailSender(
          user.email,
          "Retrun Reminder Email",
          returnReminder({
            userName: user.name,
            bookTitle: book.title,
            bookISBN: book.isbn,
            dueDate: dueDate.toDateString(),
            libraryContactUrl: "Library123@gmail.com",
          })
        );

        console.log(`Reminder sent to ${user.email} for book "${book.title}".`);
      }

      console.log("Return reminder job completed.");
    } catch (error) {
      console.error("Error sending return reminders:", error);
    }
  });
};

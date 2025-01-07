const returnReminder = ({
  userName,
  bookTitle,
  bookISBN,
  dueDate,
  libraryContactUrl,
}: {
  userName: string;
  bookTitle: string;
  bookISBN: string;
  dueDate: string;
  libraryContactUrl: string;
}) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Book Return Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f9;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #4caf50;
      }
      .book-info {
        background-color: #f9f9f9;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 15px;
      }
      .footer {
        margin-top: 20px;
        font-size: 0.9em;
        text-align: center;
        color: #888;
      }
      .footer a {
        color: #4caf50;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Book Return Reminder</h1>
      <p>Dear <strong>${userName}</strong>,</p>
      <p>
        This is a friendly reminder to return the following book to the library by the due date to avoid any late fees:
      </p>
      <div class="book-info">
        <p><strong>Book Title:</strong> ${bookTitle}</p>
        <p><strong>ISBN:</strong> ${bookISBN}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
      </div>
      <p>
        If you’ve already returned the book, please ignore this message. If you have any questions, feel free to
        contact us.
      </p>
      <p>Thank you for using our library services!</p>
      <div class="footer">
        <p>Library Management System</p>
        <p><a href="${libraryContactUrl}">Contact Us</a></p>
      </div>
    </div>
  </body>
  </html>
  `;
};
export default returnReminder;

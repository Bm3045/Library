const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const User = require('./models/User');

dotenv.config();

// Sample book data
const sampleBooks = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    available: true
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    available: true
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    available: true
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    available: true
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    available: true
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    available: true
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn: "9781451673319",
    available: true
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    isbn: "9780142437247",
    available: true
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    isbn: "9780544003415",
    available: true
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    isbn: "9780141441146",
    available: true
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "9780060850524",
    available: true
  },
  {
    title: "The Odyssey",
    author: "Homer",
    isbn: "9780140268867",
    available: true
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    isbn: "9780140449136",
    available: true
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "9780061122415",
    available: true
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    isbn: "9780374528379",
    available: true
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    isbn: "9780140447934",
    available: true
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    isbn: "9780141442464",
    available: true
  },
  {
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    isbn: "9780140448955",
    available: true
  },
  {
    title: "The Iliad",
    author: "Homer",
    isbn: "9780140275360",
    available: true
  },
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    isbn: "9780060934347",
    available: true
  },
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    isbn: "9780142437179",
    available: true
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    isbn: "9780141439556",
    available: true
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    isbn: "9780140444308",
    available: true
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    isbn: "9780140449266",
    available: true
  },
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    isbn: "9780143035008",
    available: true
  },
  {
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    isbn: "9780142437261",
    available: true
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    isbn: "9780060883287",
    available: true
  },
  {
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    isbn: "9780143039433",
    available: true
  },
  {
    title: "Ulysses",
    author: "James Joyce",
    isbn: "9780199535675",
    available: true
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    isbn: "9780679720201",
    available: true
  },
  {
    title: "Catch-22",
    author: "Joseph Heller",
    isbn: "9780684833392",
    available: true
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    isbn: "9780385490818",
    available: true
  },
  {
    title: "The Bell Jar",
    author: "Sylvia Plath",
    isbn: "9780061148514",
    available: true
  },
  {
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    isbn: "9780385333849",
    available: true
  },
  {
    title: "Invisible Man",
    author: "Ralph Ellison",
    isbn: "9780679732761",
    available: true
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    isbn: "9780307387899",
    available: true
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    isbn: "9781594631931",
    available: true
  },
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    isbn: "9780141439600",
    available: true
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    isbn: "9780141439471",
    available: true
  },
  {
    title: "The Sun Also Rises",
    author: "Ernest Hemingway",
    isbn: "9780743297332",
    available: true
  },
  {
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    isbn: "9780141441672",
    available: true
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn: "9780375831003",
    available: true
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    isbn: "9780307474278",
    available: true
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "9780441172719",
    available: true
  },
  {
    title: "The Shining",
    author: "Stephen King",
    isbn: "9780307743657",
    available: true
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    isbn: "9780439023481",
    available: true
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    isbn: "9780307269751",
    available: true
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    isbn: "9780307588371",
    available: true
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    isbn: "9780804139021",
    available: true
  },
  {
    title: "The Night Circus",
    author: "Erin Morgenstern",
    isbn: "9780307744432",
    available: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Find an admin user to set as addedBy
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Please create an admin user first.');
      process.exit(1);
    }

    // Add admin user ID to each book
    const booksWithAdmin = sampleBooks.map(book => ({
      ...book,
      addedBy: adminUser._id
    }));

    // Insert sample books
    await Book.insertMany(booksWithAdmin);
    console.log('50 books added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
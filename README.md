# Free Resume Application

This is a web application that allows users to easily create a professional resume using pre-defined templates. Users can customize their resume content, preview it in real-time, and then either share it with others or download it as a PDF file.

## Preview

![Image preview](public/preview.png)

## Features

- Choose from a variety of pre-defined resume templates.
- Customize the content of the resume, including personal information, work experience, education, skills, and more.
- Real-time preview to see how the resume will look.
- Share the resume with others by generating a unique URL.
- Download the resume as a PDF file.

## Technologies Used

- Tailwind CSS: A utility-first CSS framework used for responsive and customizable UI components.
- NextJS: A React framework for building server-side rendered and statically generated applications.
- React: A JavaScript library for building user interfaces.
- Shadcn/ui: UI components library for React based on Tailwind CSS.
- Clerk: User authentication and identity management.
- Prisma: A modern database toolkit used to communicate with the database.
- Zod: A TypeScript-first runtime validation library.
- TypeScript: A statically typed superset of JavaScript.

## Installation

To run this application locally, make sure you have Node.js installed on your machine.

1. Clone the repository:

```
git clone https://github.com/gabrielccarvalho/free-resume.git
```

2. Install the dependencies:

```bash
cd free-resume
pnpm install
```

3. Configure the environment variables:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file and fill in the required environment variables.

4. Run the application:

```bash
pnpm run dev
```

The application should now be running locally on `http://localhost:3000`.

## Contributing

Contributions are always welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/gabrielccarvalho/free-resume/issues).

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as per the license terms.

## ⚠️ Under development

This application does not have functionality yet and was created only for the purpose of studies.

---
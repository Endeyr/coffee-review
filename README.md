# React + TypeScript + Vite Template

This template is a modern React setup following best practices for front-end development. It utilizes Vite for fast builds and development, TypeScript for type safety, and several popular libraries for state management, form handling, and UI components.

## Getting Started

1. Clone the repository:

   ```nodejs
    git clone https://github.com/Endeyr/vite-template
   ```

2. Install dependencies:

   ```nodejs
    npm install
   ```

3. Run the development server:
   ```nodejs
   npm run dev
   ```
   The application will be available at http://localhost:5173.

## Scripts

- npm run dev: Starts the development server using Vite.
- npm run build: Builds the application for production. Compiles TypeScript and bundles the app with Vite.
- npm run lint: Runs ESLint to check for code quality and style issues.
- npm run preview: Previews the production build locally.
- npm run test: Runs the test suite using Vitest.
- npm run coverage: Runs the tests and generates a coverage report.

## Dependencies

The project uses the following main dependencies:

- React: A JavaScript library for building user interfaces.
- Redux Toolkit: A library for efficient Redux development.
- React Router DOM: A collection of navigational components for React applications.
- Axios: A promise-based HTTP client for making API requests.
- React Hook Form: A library for managing forms in React with minimal re-rendering.
- Zod: A TypeScript-first schema declaration and validation library.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.

## Dev Dependencies

The development dependencies include tools and libraries to aid in development:

- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- ESLint: A tool for identifying and fixing problems in JavaScript code.
- Prettier: An opinionated code formatter.
- Vite: A fast build tool and development server.
- Vitest: A blazing-fast unit test framework built on Vite.
- Testing Library: A family of libraries to test UI components.

## Project Structure

```bash
src/
├── app/ # Redux app store
├── components/ # Reusable React components
├── features/ # Redux slices and store configuration
├── lib/ # Utility functions and helpers
├── middleware/ # Redux middleware
├── routes/ # React Router routes
├── schema/ # Zod schemas for react hook form
├── test/ # Vitest test
├── types/ # Global types
├── index.css # Main styling
└── main.tsx # Entry point for the App
```

## License

This project is licensed under the MIT License.

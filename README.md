# Instagram Story Application

An Instagram-like story viewer built with React, TypeScript, and Vite. This project showcases a performant and scalable frontend architecture, complete with automated testing using Playwright.

Live Link : https://insta-story-viewer.netlify.app/

## 🚀 Features

- **Story List**: Overview of user stories to view from.
- **Story Carousel**: Navigate through user stories with smooth transitions.
- **Responsive Design**: Optimized for mobile devices.
- **Lazy Loading**: Images are loaded on demand to enhance performance.
- **Automated Testing**: Ensures reliability through Playwright test suites.

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Redux toolkit
- **Styling**: Styled Components
- **Testing**: Playwright
- **Mock API**: [Mocky](https://run.mocky.io/)

## 🛠️ Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/JowelTisso/instagram-story.git
   cd instagram-story
   ```

2. **Install dependencies**:

   Using npm:

   ```
   npm install
   ```

### Running the Application

1. Start the development server:

   ```
   Using npm :
   npm run dev
   ```

   The application will be accessible at http://localhost:5173/

### 🧪 Running Tests

Ensure the development server is running before executing tests.

1. Start the development server:

   ```
   npm run dev
   ```

2. In a separate terminal, run Playwright tests:
   ```
   npm run test or
   npm run testui
   ```

### Test Structure

- Test 1: Verifies that the user story list loads correctly.

- Test 2: Checks that clicking on a story item opens the story viewer.

- Test 3: Ensures that clicking the "next/prev" button transitions to the next/prev image.

- Test 4: Ensures that the image changes to the next story after 5 seconds.

- Test 5: Checks if the story viewer closes on button click.

  #### Each test is designed to be independent, setting up its own state to ensure reliability and prevent interdependencies.

### ⚙️ Design Choices

### Performance Optimizations

- Lazy Loading Images: Utilizes the loading="lazy" attribute to defer loading images until they are in the viewport, reducing initial load time.

- Efficient State Management: Employs Redux toolkit, React's useState and useEffect hooks to manage component state efficiently, minimizing unnecessary re-renders.

### Scalability Considerations

- Modular Architecture: Components are organized into reusable modules, facilitating easy maintenance and scalability.

- Type Safety: TypeScript ensures robust type checking, reducing runtime errors and improving code quality.

- Automated Testing: Playwright tests validate critical user interactions, ensuring that new features or changes do not break existing functionality.

- CSSinJS: Leveraging styled components to apply component based styling to prevent styling conflict and implement dynamic styling with props in css.

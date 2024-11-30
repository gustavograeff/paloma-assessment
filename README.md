## Getting Started

First, install the packages with [npm](https://www.npmjs.com/)

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

#### Why did you choose the libraries, frameworks, technologies, and/or UI elements you used?

- Next.js + TypeScript: I chose these because they are the tools I’ve been using most recently and am comfortable with. Next.js is excellent for building performant React applications, and TypeScript adds type safety, which helps catch errors early.
- Tailwind CSS: I opted for Tailwind for styling because it allows for rapid development by keeping styles within the component files (TSX), which streamlines the process.
- clsx: This lightweight library makes toggling CSS classes easier and more readable.
- Skeleton: I used Skeleton for better loading states, as it improves the user experience by visually indicating that data is being fetched.
- react-icons/md: Material Design icons just to have some basics icons to use for account details.

#### Is there anything you would improve if you had more time and resources?

Absolutely! If I had more time and resources, I’d focus on the following:

- UI Polish: I’d like to refine the UI further, ensuring it’s visually appealing and consistent.
- Testing Edge Cases: Spending more time testing edge cases to ensure robustness and reliability.
- Performance Optimization: Running the app for extended periods to identify and fix any memory leaks or performance bottlenecks.
- Component Reusability: Some components could be made more flexible and reusable for broader scenarios.
- Responsiveness: I’d invest more effort into making the app fully responsive across all device sizes.
- Add exponential backoff for retrying api calls.

#### Is there anything about your solution that you’re really proud of that you’d like to share?

- Custom Hooks: I’m proud of the custom hooks I implemented:
  - useDebounce to prevent repetitive function calls within short time windows.
  - useAbortController to abort pending API requests when a new one is initiated for the same endpoint.
  - useWebSocket to simplify WebSocket integration for reuse across the app.
- URL Syncing: The way the app utilizes URL search parameters to synchronize state, prepopulate fields, and filter data is another aspect I’m particularly proud of. This ensures better state management and improves usability.
- Custom Multi-Select Component: Building a custom multi-select component from scratch as these are often implemented using external libraries.
- Skeleton Loader: Adding Skeleton loaders for a better user experience during data fetching was another feature I’m particularly proud of. It significantly improves the app's perceived performance.
- The app includes a retry mechanism to refetch accounts if the initial preview calls fail.

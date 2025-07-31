# KTSC Speed Testing App

This is a Next.js application designed for testing internet speed. It integrates with a speed test library to measure download, upload, and ping, and allows users to view their test history. This project is built with Shadcn UI components.

## Features

- **Speed Test**: Measure your internet connection's download speed, upload speed, and ping latency.
- **Real-time Progress**: See the test progress as it happens.
- **Test History**: (Requires authentication) View a history of your past speed test results.
- **User Authentication**: Sign in with GitHub to save your test results and access personalized features.
- **Admin Panel**: (For authenticated users with admin roles) Manage articles and view system statistics.
- **Responsive Design**: Optimized for various screen sizes.
- **Dark Mode**: Toggle between light and dark themes.

## Technologies Used

- **Next.js 14**: React framework for building full-stack web applications.
- **TypeScript**: Strictly typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **NextAuth.js**: Flexible authentication for Next.js applications.
- **fast-speedtest-api**: A pure JavaScript library for performing speed tests.
- **Vercel Blob**: For storing user-uploaded content (if implemented).

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see .env.example)
4. Run database migrations: `npx prisma migrate dev`
5. Start the development server: `npm run dev`

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/your-username/ktsc-speed-testing-app.git
cd ktsc-speed-testing-app
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set up environment variables

Create a `.env.local` file in the root of your project and add the following environment variables:

\`\`\`env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
SPEEDTEST_API_TOKEN="your-speedtest-token"
\`\`\`

-   **`DATABASE_URL`**: Your PostgreSQL database connection string or a local file path.
-   **`NEXTAUTH_SECRET`**: A random string used to encrypt NextAuth.js sessions. You can generate one using `openssl rand -base64 32`.
-   **`NEXTAUTH_URL`**: The URL of your application.
-   **`GITHUB_CLIENT_ID`**, **`GITHUB_CLIENT_SECRET`**: Credentials for GitHub authentication.
-   **`SPEEDTEST_API_TOKEN`**: An optional token for `fast-speedtest-api`. You can get one from their website if you need higher rate limits or specific features.

### 4. Set up your database

Run Prisma migrations to create the necessary tables in your database:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

You can also seed your database with some dummy data:

\`\`\`bash
npm run db:seed
\`\`\`

### 5. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application is designed to be easily deployable to Vercel.

1.  **Connect your Git repository**: Link your GitHub, GitLab, or Bitbucket repository to Vercel.
2.  **Configure environment variables**: Add the environment variables from your `.env.local` file to your Vercel project settings.
3.  **Deploy**: Vercel will automatically build and deploy your application.

## Project Structure

-   `app/`: Next.js App Router pages and API routes.
    -   `api/`: Backend API routes (e.g., `/api/speed-test`, `/api/articles`).
    -   `dashboard/`: User dashboard pages.
    -   `article/[id]/`: Dynamic route for individual articles.
-   `components/`: Reusable React components.
    -   `ui/`: shadcn/ui components.
    -   `auth/`: Authentication-related components.
    -   `admin/`: Admin panel components.
-   `hooks/`: Custom React hooks.
-   `lib/`: Utility functions and configurations (e.g., Prisma client, NextAuth.js config).
-   `prisma/`: Prisma schema and seed script.
-   `public/`: Static assets.
-   `styles/`: Global CSS.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).

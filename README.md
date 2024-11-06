This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js (Pages Router)](https://nextjs.org/docs)
- [Chakra-UI](https://chakra-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Apexcharts](https://apexcharts.com/react-chart-demos/)
- [React Map GL](https://visgl.github.io/react-map-gl/)
- [Mapbox](https://www.mapbox.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Folder Structure

    ├── src
    │    ├── components
    │    │    ├── auth-form (Components and hooks related to the sign-in form)
    │    │    ├── chargers (All components related to the chargers section)
    │    │    ├── chargers-locations (All components related to the locations section)
    │    │    ├── elements (Small components used in many places in the app)
    │    │    ├── layout (The layout components)
    │    │    ├── sessions (All components related to the sessions section)
    │    │    ├── tariffs (All components related to the tariffs section)
    │    ├── contexts (React contexts that are shared in the app)
    │    ├── data (Demo data included temporarily until connecting the frontend to the backend and database)
    │    ├── hooks (React custom hooks that are shared in the app)
    │    ├── pages (The pages router)
    │    ├── theme (Chakra-UI custom theme)
    │    ├── types (Typescript types)
    │    ├── config.ts (Constants and variables used across the app)
    │    ├── paths.ts (All app paths and their labels)

## Component Architecture

    ├── App
    │  ├── Overview Page
    │  │  ├── Heading
    │  │  ├── Content
    │  │  │  ├── Grid
    │  │  │  │  ├── Total Chargers
    │  │  │  │  ├── Total Sessions
    │  │  │  │  ├── Total Energy
    │  │  │  │  ├── Total Revenue
    │  │  │  │  ├── Charger Status
    │  │  │  │  ├── Charger Condition
    │  │  │  │  ├── Charger Type
    │  │  │  │  ├── Energy (Last 12 months)
    │  │  │  │  ├── Revenue (Last 12 months)
    │  ├── Chargers Page
    │  ├── Locations Page
    │  ├── Sessions Page
    │  ├── Customers Page
    │  ├── Tariffs Page
    │  ├── Account Page

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

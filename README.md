# CanScan Website

This is the official website for the CanScan application, built with Next.js, TypeScript, and Tailwind CSS.

## Features

*   Information about the CanScan app and its features.
*   Download links for iOS and Android (links currently placeholders).
*   Support information and FAQ.
*   Internationalization (English & French) using `next-intl`.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)

## Getting Started

### Prerequisites

*   Node.js (Version 18.x or later recommended)
*   npm (or yarn/pnpm)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/gthomson16/CanScanWebsite.git
    cd CanScanWebsite
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To run the website locally in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

## Deployment

This project is intended for deployment on platforms supporting Next.js server-side features (like Vercel or Netlify) due to the use of `next-intl` with the App Router. Static export via `next export` is not compatible with the current internationalization setup.

# Amazon Product Scraper

A simple application to scrape product listings from Amazon search results.

## Features

- Search for products by keyword
- Display product title, rating, number of reviews, and image
- Clean, responsive interface

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Bun (v1.0 or higher)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the server:
   ```bash
   bun run server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a search keyword (e.g., "laptop", "smartphone")
2. Click "Scrape Products" button
3. View the results from the first page of Amazon search results

## Notes

- Amazon may block scraping attempts if done too frequently
- The scraper might need updates if Amazon changes their HTML structure
```

## How to Run the Project

1. **Backend**:
- Create a `package.json` file with `bun init`
- Install the dependencies: `bun add express axios jsdom`
- Save the backend code as `server.js`
- Run it with `bun run server.js`

2. **Frontend**:
- Create a Vite project: `npm create vite@latest frontend --template vanilla`
- Replace the generated files with the ones I provided above
- Run it with `npm run dev`

## Final Considerations

This code provides a complete solution to your problem:
- Backend scrapes Amazon and returns structured data
- Frontend consumes the API and displays the results in a user-friendly way
- Basic error handling included
- Responsive and clean interface

Remember that Amazon may block requests if you make too many in a short time. For a more robust project, you can consider:
- Adding proxies
- Implementing delays between requests
- Using specialized scraping services

# Image File Storage Application

Express.js app for image upload and gallery viewing, featuring single/multiple uploads, random image display, and pagination. 

## Features

- Single image upload
- Multiple image upload
- View a single random image
- View multiple random images
- Gallery view
- Gallery pagination

## Prerequisites

- Node.js
- npm
- 

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repository.git
    cd your-repository
    ```

2. Install dependencies:
    ```bash
    npm install multer express dotenv morgan
    ```

3. Create a `.env` file in the root directory and add your environment variables (if any).

4. Ensure the following directory structure:
    ```plaintext
    a2_n01598445/
    ├── middlewares/
    │   ├── errorHandler.js
    │   ├── fileStorage.js
    │   └── logger.js
    ├── node_modules/
    ├── public/
    │   ├── css/
    │   │   └── styles.css
    ├── uploads/
    ├── views/
    │   ├── index.html
    │   ├── single.html
    │   ├── upload.html
    │   └── upload-multiple.html
    │   └── multiple-random.html
    ├── .env
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    └── package.json
    ```

## Usage

1. Start the server:
    ```bash
    node index.js
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Endpoints

### Home
- **URL**: `/`
- **Method**: `GET`
- **Description**: Home page with links to all features.

### Single Upload
- **URL**: `/upload`
- **Method**: `GET`, `POST`
- **Description**: Upload a single image.

### Multiple Upload
- **URL**: `/upload-multiple`
- **Method**: `GET`, `POST`
- **Description**: Upload multiple images.

### Single Random Image
- **URL**: `/single`
- **Method**: `GET`
- **Description**: View a single random image.

### Multiple Random Images
- **URL**: `/multiple-random`
- **Method**: `GET`
- **Description**: View multiple random images based on user input.

### Gallery
- **URL**: `/gallery`
- **Method**: `GET`
- **Description**: View all uploaded images in a gallery format.

### Gallery Pagination
- **URL**: `/gallery-pagination`
- **Method**: `GET`
- **Description**: View paginated gallery images.




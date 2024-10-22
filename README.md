
# Craftify

![Craftify]
Craftify is a powerful server-driven UI builder that addresses the need for creating and managing websites efficiently. By leveraging Contentstack, Craftify allows users to manage both content and layouts seamlessly. This solution is designed to empower users—especially those without technical expertise—to build stunning, multi-page websites through an intuitive drag-and-drop interface.

## Problem Statement Overview

The core objective is to build a website where both the content and its layouts are managed through Contentstack. The project includes several content types that are essential for a well-rounded website:

### Content Types

1. **Home Page**: An overview of the website, showcasing its purpose and key highlights.
2. **About Us**: Information about the organization, including mission, vision, history, and team members.
3. **Services/Products**: Detailed descriptions of services offered or products sold, featuring features and pricing.
4. **Blog/News**: A section for articles, updates, and news to keep the audience informed and engaged.

### Visuals (Content Type to Hold UI Spec)

- **Visuals**: A content type to store page layouts/templates for each content type listed above, using flexible UI JSON specifications to support any layout design.

## UI Builder Requirements

The Craftify UI builder is designed with three main sections:

1. **Left Sidebar**: Contains all available components pre-created by developers.
2. **Canvas**: The area where users can drag and drop components to adjust the layout and build templates, generating the UI specifications dynamically.
3. **Right Sidebar**:
   - **Design Tab**: Provides design properties, listing all CSS styles to modify and customize the layout and visual blocks defined in the UI JSON.
   - **Data Tab**: Links the content type fields to the visuals, enabling data population from Contentstack into visual blocks.

The page will be rendered using the UI specifications and content, ensuring that any changes made in the builder or content are immediately reflected on the page.

### Accessibility

The UI builder will be accessible as a page-level extension within Contentstack, offering users an intuitive and flexible design experience akin to platforms like Wix or Squarespace.


## Features



- User-friendly drag-and-drop interface for seamless website building.
- Effortlessly create multi-page websites with ease.
- Access a vast library of royalty-free images through Pexels integration.
- Enhance your site with built-in animation effects for various elements.
- Flexibly design custom layouts tailored to your needs.
- View user-generated website previews directly on their dashboards.
- Nested elements support for intricate design structures.
- A layers panel with hover effects for enhanced element organization.
- View responsive previews for all created pages.
- Centralized font management through the Google Font Manager.
- Extensive editing options available for every element.
- Tools for modifying layouts to suit your preferences.
- SEO settings in place, including page title, description, and favicon (upcoming feature).
- Create visually appealing backgrounds with a CSS gradient generator.
- Adjust the minimum height for elements to fit your design.
- Preview unpublished websites, accessible exclusively to authorized users.
- An intuitive dashboard for efficient website management.

## How to Run

### Frontend

1. Run `npm install -y` to install required dependencies.
2. Create a `.env` file in the root directory with the following details:<br/>
   ```env
   REACT_APP_GOOGLE_API_KEY="[Google Font API Key: https://developers.google.com/fonts/docs/developer_api]"
   REACT_APP_PEXELS_API_KEY="[Pexels API Key: https://www.pexels.com/api/]"

   REACT_APP_CONTENTSTACK_API_KEY="[Your Contentstack API Key]"
   REACT_APP_CONTENTSTACK_DELIVERY_TOKEN="[Your Contentstack Delivery Token]"
   REACT_APP_CONTENTSTACK_ENVIRONMENT=preview
   REACT_APP_CONTENTSTACK_PREVIEW_HOST=eu-rest-preview.contentstack.com
   REACT_APP_CONTENTSTACK_PREVIEW_TOKEN="[Your Contentstack Preview Token]"
   REACT_APP_CONTENTSTACK_APP_HOST=app.contentstack.com
   REACT_APP_CONTENTSTACK_LIVE_PREVIEW=false
   REACT_APP_CONTENTSTACK_API_HOST=eu-cdn.contentstack.com
   REACT_APP_CONTENTSTACK_LIVE_EDIT_TAGS=false
   REACT_APP_CONTENTSTACK_REF=false
   REACT_APP_CONTENTSTACK_REGION=EU



3. Build the front-end by running `npm run build`.
4. If you wish to modify the front end, run `npm start` for the frontend and `npm run dev` for the backend.

### Backend

1. Copy the generated build folder into the backend directory.
2. Navigate to the backend folder using `cd backend/`.
3. Run `npm install -y` to install the necessary dependencies.
4. Create a `.env` file in the backend directory with the following details:<br/>
   `JWT_SECRET="[RANDOM_STRING_FOR_JWT_TOKEN]"`<br/>
   `PORT=8000`<br/>
   `API_DB_NAME="[DATABASE_NAME]"`<br/>
   `API_LOGIN_PERIOD="2d"`<br/>
   `API_MONGO_URI="[REMOVED_FROM_CODE]"`<br/>
   `API_MONGO_PASS="[MONGODB_PASSWORD]"`<br/>
   `API_MONGO_USER="[MONGO_DB_USERNAME]"`<br/>
   `API_MONGO_LOCATION="[mongodb for local instance, mongodb+srv for remote]"`<br/>
5. Start the backend server using `npm run dev` for local development. For deployment, use `node ./src/server.js`.
6. The application should be accessible on port 8000.


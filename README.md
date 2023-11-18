# B2B Export


## Overview

B2B Export is a Node.js MERN (MongoDB, Express, React, Node.js) project that facilitates business-to-business export transactions. It includes user authentication, product management, and user role management features. Users can register, log in, and explore products. Vendors can add products, and admins have the additional capability to manage users and update user roles.

## Features

- User Registration and Login
- Product Exploration
- Vendor Product Management
- Admin User Management and Role Update
- Search Functionality by Name or Mobile Number

## Tech Stack

- Node.js
- MongoDB
- Express
- React
- JWT (JSON Web Tokens)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/keshav019/B2B-Export.git
   cd B2B-Export
   ```

2. Install dependencies for the server and client:

   ```bash
   npm install
   cd ../frontend
   npm install
   ```

3. Set up MongoDB:

   - Create a .env
   - Add following varaible in .env
   - MONGO_URI
   - JWT_SECRET
   - JWT_EXPIRE
   - NODE_ENV



### Docker

To run the project using Docker, make sure you have Docker installed on your machine.


1. Run the Docker container:

   ```bash
   docker-compose up
   ```


The app will be accessible at `http://localhost:4000`.


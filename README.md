# MERN E-commerce Platform

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Order management
- Admin dashboard
- Responsive design
- PayPal integration for payments
- Product reviews and ratings
- User profile management

## Tech Stack

- **Frontend**: React.js, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment**: PayPal
- **State Management**: Redux Toolkit

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
```

2. Install dependencies for both client and server:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

4. Start the development servers:
```bash
# Start server (from server directory)
npm run dev

# Start client (from client directory)
npm run dev
```

## Project Structure

```
mern-ecommerce/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store and slices
│   │   └── ...
│   └── ...
├── server/                # Backend Node.js application
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── ...
└── assets_prod/         # Production assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Developer

Developed by Omnateeta V Unnimath
- Email: omnateeta3@gmail.com
- LinkedIn: [Omnateeta V Unnimath](https://www.linkedin.com/in/omnateeta-v-unnimath-0b815b338)
- GitHub: [omnateeta](https://github.com/omnateeta) 
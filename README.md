# APIprofe

A comprehensive resource for educators who want to simplify their teaching with the Canvas API.

## Overview

APIprofe is a Wasp application designed to provide Canvas API teaching resources. It aims to help educators leverage the Canvas Learning Management System's API to automate tasks, create custom integrations, and enhance the teaching experience.

## Features

- Canvas API documentation and examples
- Ready-to-use code snippets for common teaching tasks
- Interactive API explorer
- Tutorials and guides for Canvas API integration
- Community-contributed resources and extensions

## Project Structure

```
apiprofe/
├── main.wasp             # Wasp application definition
├── src/
│   ├── client/          # Frontend code
│   └── server/          # Backend code
├── public/              # Static assets
└── package.json         # Node.js dependencies
```

## Getting Started

### Prerequisites

- Node.js 14+
- Wasp CLI
- Canvas API access

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/elblanco2/apiprofe.git
   cd apiprofe
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   wasp start
   ```

## Development

### Wasp Framework

This project uses the [Wasp](https://wasp-lang.dev/) framework, which is a full-stack JavaScript framework for developing web applications with less code. It combines React, Node.js, and Prisma.

### Frontend

The frontend is built with React and uses:

- React Router for navigation
- Tailwind CSS for styling
- CodeMirror for code examples
- React Query for data fetching

### Backend

The backend is built with Node.js and uses:

- Express.js for API endpoints
- Prisma for database ORM
- JWT for authentication
- Canvas API client for interacting with Canvas LMS

## Deployment

To deploy the application:

```
wasp build
cd .wasp/build
npm start
```

## Security Considerations

- Store your Canvas API tokens securely
- Never commit sensitive data to the repository
- Validate all inputs from users
- Use proper authentication and authorization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

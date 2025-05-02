// crud-jest-project/
// │
// ├── src/
// │   ├── config/
// │   │   └── db.ts             // Database connection using pg & dotenv
// │   ├── controllers/
// │   │   └── item.controller.ts // API request handlers
// │   ├── models/
// │   │   └── item.model.ts      // TypeScript interface(s) for item
// │   ├── repositories/
// │   │   └── item.repository.ts // Direct database queries (CRUD operations)
// │   ├── routes/
// │   │   └── item.routes.ts     // API routes mapping endpoints to controllers
// │   ├── services/
// │   │   └── item.service.ts    // Business logic layer wrapping repository calls
// │   └── server.ts              // Express app initialization & global middleware
// │
// ├── tests/
// │   └── item.test.ts         // Jest test cases using supertest to call API endpoints
// │
// ├── .env                     // Environment variables (db credentials, port, etc.)
// ├── package.json             // Project metadata and dependencies
// ├── tsconfig.json            // TypeScript configuration
// └── jest.config.js           // Jest configuration for TypeScript
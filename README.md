# Project Guidelines

This document provides guidelines and instructions for developing and maintaining this Terraform project.

## Build/Configuration Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Terraform (v1.9.7+)
- MongoDB Atlas account

### Terraform Setup
1. Install Terraform CLI (version 1.9.7 or higher)
2. Configure MongoDB Atlas API keys:
    - Create a MongoDB Atlas account if you don't have one
    - Generate API keys in the MongoDB Atlas dashboard
    - Set the following environment variables or use a .tfvars file:
      ```
      atlas_public_key = "your_public_key"
      atlas_private_key = "your_private_key"
      ```

### Backend Setup
1. Navigate to the `back-end` directory
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```
3. Build the application:
   ```
   npm run build
   ```
   or
   ```
   yarn build
   ```
4. Start the server:
   ```
   npm run serve
   ```
   or
   ```
   yarn serve
   ```

### Frontend Setup
1. Navigate to the `front-end` directory
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```
4. Build for production:
   ```
   npm run build
   ```
   or
   ```
   yarn build
   ```

## Testing Information

### Setting Up Testing Framework

#### Backend Testing
1. Install Jest and related dependencies:
   ```
   cd back-end
   npm install --save-dev jest ts-jest @types/jest
   ```
   or
   ```
   cd back-end
   yarn add --dev jest ts-jest @types/jest
   ```

2. Create a Jest configuration file (`jest.config.js`) in the backend directory:
   ```javascript
   module.exports = {
     preset: 'ts-jest',
     testEnvironment: 'node',
     testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
   };
   ```

3. Add test script to `package.json`:
   ```
   "scripts": {
     "test": "jest"
   }
   ```

#### Frontend Testing
1. Install Vitest and related dependencies:
   ```
   cd front-end
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
   ```
   or
   ```
   cd front-end
   yarn add --dev vitest @testing-library/react @testing-library/jest-dom
   ```

2. Update `vite.config.ts` to include Vitest configuration:
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react-swc';

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
     },
   });
   ```

3. Add test script to `package.json`:
   ```
   "scripts": {
     "test": "vitest"
   }
   ```

### Writing Tests

#### Backend Tests
Create test files with the `.test.ts` or `.spec.ts` extension in a `tests` directory or alongside the files they test.

Example test for the User model:
```typescript
// tests/models/users.model.test.ts
import mongoose from 'mongoose';
import createUserModel from '../../models/users.model';

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to a test database or mock mongoose
    await mongoose.connect('mongodb://localhost:27017/test-db');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a user with valid fields', () => {
    const UserModel = createUserModel();
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    
    const user = new UserModel(userData);
    
    expect(user.firstName).toBe(userData.firstName);
    expect(user.lastName).toBe(userData.lastName);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
  });

  it('should fail validation with a short password', () => {
    const UserModel = createUserModel();
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'pass', // Less than 6 characters
    };
    
    const user = new UserModel(userData);
    const validationError = user.validateSync();
    
    expect(validationError).toBeDefined();
    expect(validationError.errors.password).toBeDefined();
  });
});
```

#### Frontend Tests
Create test files with the `.test.tsx` or `.spec.tsx` extension in a `__tests__` directory or alongside the components they test.

Example test for a React component:
```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders correctly', () => {
    render(Button({ children: 'Click me' }));
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(Button({ onClick: handleClick, children: 'Click me' }));
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests
- Backend: `cd back-end && npm test` or `cd back-end && yarn test`
- Frontend: `cd front-end && npm test` or `cd front-end && yarn test`

## Additional Development Information

### Code Style and Conventions
- Use TypeScript for both frontend and backend development
- Follow ESLint rules defined in the project
- Use async/await for asynchronous operations instead of callbacks or promises
- Use meaningful variable and function names

### Terraform Best Practices
- Use variables for all configurable values
- Use modules for reusable components
- Use remote state storage for team collaboration
- Always run `terraform plan` before applying changes
- Document all resources with descriptions

### MongoDB Atlas Configuration
- The project uses MongoDB Atlas M0 (free tier) cluster
- Database credentials are stored in the Terraform configuration
- For production, use environment variables or a secure vault for credentials
- Connection string format: `mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority`

### Debugging
- Backend: Use `console.log` statements or a debugger like VS Code's built-in debugger
- Frontend: Use React DevTools and browser developer tools
- Terraform: Use `TF_LOG=DEBUG` environment variable for detailed logs

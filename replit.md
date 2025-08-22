# Overview

LibreChat is a comprehensive open-source chat application that serves as a unified interface for multiple AI language models and services. It provides a web-based platform where users can interact with various AI providers (OpenAI, Anthropic, Google, etc.) through a single, consistent interface. The application supports advanced features like conversation management, file uploads, agent creation, custom tools, and multi-modal interactions.

The system is built as a full-stack TypeScript/JavaScript application with a React frontend and Node.js backend, designed to be highly configurable and extensible for both personal and enterprise use cases.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Monorepo Structure
The codebase uses a workspace-based monorepo architecture with three main components:
- **API Backend** (`api/`) - Express.js server handling all backend logic
- **React Frontend** (`client/`) - Vite-powered React application for the user interface  
- **Shared Packages** (`packages/`) - Common utilities and schemas shared across components

## Frontend Architecture
Built with React 18 and TypeScript, using Vite as the build tool for fast development and optimized production builds. The frontend employs:
- **State Management**: React Query for server state and Context API for local state
- **Routing**: React Router for client-side navigation
- **UI Components**: Radix UI primitives with Tailwind CSS for styling
- **Build System**: Vite with workspace support for hot module replacement and efficient bundling

## Backend Architecture
Node.js/Express server following a modular architecture:
- **API Routes**: RESTful endpoints organized by feature domains
- **Client Abstraction Layer**: Unified interface for different AI providers (OpenAI, Anthropic, Google, etc.)
- **Plugin System**: Extensible architecture for custom tools and integrations
- **Agent System**: Support for autonomous agents with tool access
- **Model Configuration Protocol (MCP)**: Integration for external tool servers

## Data Storage Solutions
**Primary Database**: MongoDB with Mongoose ODM for flexible document storage, handling:
- User accounts and authentication data
- Conversation histories and messages
- AI model configurations and presets
- File metadata and references

**Caching Layer**: Dual-tier caching system:
- **Redis** (optional): For production deployments requiring distributed caching
- **File-based cache**: Fallback using JSON files for development/simple deployments
- **In-memory caching**: For specific high-performance use cases

**File Storage**: Configurable storage backends:
- Local filesystem storage for development
- AWS S3 for production cloud deployments
- Azure Blob Storage as alternative cloud option

## Authentication and Authorization
Multi-provider authentication system supporting:
- **Local authentication**: Username/password with bcrypt hashing
- **OAuth providers**: Google, GitHub, Discord, Facebook integration
- **Enterprise SSO**: SAML and OpenID Connect support
- **Role-based access control**: Granular permissions system for features and resources

## External Dependencies

### Core AI Services
- **OpenAI API**: GPT models, DALL-E image generation, Whisper speech-to-text
- **Anthropic Claude**: Claude model family integration
- **Google AI**: Gemini models and Vertex AI platform
- **Azure OpenAI**: Enterprise OpenAI model access
- **AWS Bedrock**: Multiple model providers through unified interface

### Infrastructure Services  
- **MongoDB**: Primary database for all persistent data
- **Redis**: Optional distributed caching and session storage
- **MeiliSearch**: Full-text search capabilities for conversations
- **Docker**: Containerization for consistent deployments

### Development and Operations
- **Playwright**: End-to-end testing framework
- **Jest**: Unit and integration testing
- **ESLint/Prettier**: Code quality and formatting
- **Husky**: Git hooks for pre-commit validation
- **Winston**: Structured logging with multiple transport options

### File Processing
- **Multer**: Multipart file upload handling
- **Sharp**: Image processing and optimization
- **Various parsers**: PDF, document, and media file processing

The architecture prioritizes modularity, allowing easy addition of new AI providers, authentication methods, and storage backends without disrupting existing functionality.
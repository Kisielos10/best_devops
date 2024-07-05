# Quiz Application

A simple web-based quiz application built with Node.js and Express, deployed on Azure.

## Project Structure

```
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   └── script.js
├── server.js
├── sonar-project.properties
└── test
    └── app.jest.js
```

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Start the server:
```
npm start
```
The application will be available at `http://localhost:3000` (or the port specified in your environment).

## Running Tests

Execute the test suite:
```
npm test
```

## Deployment

This application is deployed on Azure. The live version can be accessed at: `https://bestquiz.azurewebsites.net/`

## Code Quality

This project uses SonarCloud for continuous code quality inspection. Check the `sonar-project.properties` file for configuration details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


# Playwright Cucumber Tests

This README provides instructions on how to run Playwright Cucumber tests using specific commands.

## Prerequisites

Ensure you have the following installed:
- Node.js
- npm

## Setup

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running Tests

You can run specific tests using tags and specify the environment (local or remote) using the provided npm command.

### Command

```sh
npm run test -- --tags="@STEVE-1" --project=local
```

### Parameters
- `--tags="@STEVE-1"`: Specifies the tag of the tests you wish to run. Replace `@STEVE-1` with the desired tag.
- `--project=local`: Specifies the environment to run the tests in. Use `local` to run tests locally and `remote` to run tests on a Selenium Grid (in our case, Selenium Box).

### Examples
- To run tests tagged with `@STEVE-1` locally:
  ```sh
  npm run test -- --tags="@STEVE-1" --project=local
  ```

- To run tests tagged with `@STEVE-2` on Selenium Box:
  ```sh
  npm run test -- --tags="@STEVE-2" --project=remote
  ```

## Notes
- Ensure your environment is properly configured for local or remote execution.
- Update the tag and project parameters as needed for different test cases and environments.

## Troubleshooting

If you encounter any issues, please refer to the project documentation or raise an issue in the repository.

## Using `npm playwright codegen`

The `npm playwright codegen` command is a powerful tool that allows you to generate Playwright scripts by recording your interactions with a web application. Here's how it works:

### Command

To start the code generation, run the following command:

```sh
npx playwright codegen <url>
```

### Parameters
- `<url>`: The URL of the web application you want to test.

### How It Works
1. **Launches a browser**: The command opens a browser window and navigates to the specified URL.
2. **Records actions**: As you interact with the application (clicking buttons, filling out forms, etc.), Playwright records these actions.
3. **Generates code**: The recorded actions are translated into Playwright code, which is displayed in a separate window. You can copy this code to use in your test scripts.

### Example

To generate code for a web application at `http://localhost:3000`, use:

```sh
npx playwright codegen http://localhost:3000
```

By following these instructions, you should be able to run Playwright Cucumber tests efficiently in both local and remote environments, as well as generate Playwright scripts using the codegen tool.

--- 

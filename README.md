

# SmartServ-Q2 Import Products

This project comprises a front-end interface allowing users to upload CSV or JSON files, specify file format details, and display the processed data in a table. It uses Express.js on the backend for file processing.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Processing](#file-processing)
- [Contributing](#contributing)
- [License](#license)

## Features

- **File Upload**: Users can upload CSV or JSON files.
- **File Format Specification**: Options to specify file type, character encoding, and delimiter.
- **Display Handling**: Allows users to select fields and display them in a table format.
- **Persistent Storage**: Uses `localStorage` to retain selected fields and displayed data across sessions.
- **Error Handling**: Catches errors during file processing and displays appropriate messages.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/iamshivanshyadav/SmartServ-Q2.git
    ```

2. Navigate to the project directory:

    ```bash
    cd SmartServ-Q2
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the server:

    ```bash
    node app.js
    ```

## Usage

- Open `index.html` in a web browser.
- Upload a CSV or JSON file and specify the file format details.
- Proceed through the steps and select fields to display.
- Click "Next" to process the file and display the data in a table.
- To start fresh, click "Cancel" to reset the displayed data and field selections.

## File Processing

- The front-end collects file type and other details and sends them to the Express server for processing.
- The server handles CSV and JSON files separately, sorts the data based on popularity, and returns the sorted data to display.

## Contributing

Contributions are welcome! If you wish to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make changes and commit them (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/new-feature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


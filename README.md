# OF Fullstack Project

## Overview

This project is a fullstack application that integrates a chatbot with a flirty and romantic personality. The chatbot can switch between two AI models: OpenAI's GPT-3.5-turbo and Anthropic's Claude. The frontend is built with React, and the backend is powered by Flask.

## Features

- Chatbot with a flirty and romantic personality
- Switch between OpenAI and Claude models
- Real-time chat interface

## Getting Started

### Prerequisites

- Node.js
- Python 3.x
- pip (Python package installer)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/of-fullstack-project.git
    cd of-fullstack-project
    ```

2. Install frontend dependencies:
    ```sh
    cd client
    npm install
    ```

3. Install backend dependencies:
    ```sh
    cd ../server
    pip install flask flask_cors
    ```

4. Set up environment variables:
    - Create a `.env` file in the `server` directory with the following content:
        ```
        ANTHROPIC_API_KEY=your_anthropic_api_key
        OPENAI_API_KEY=your_openai_api_key
        ```

### Running the Application

1. Start the backend server:
    ```sh
    cd server
    python server.py
    ```

2. Start the frontend development server:
    ```sh
    cd ../client
    npm start
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- Type your message in the chat input and click the send button to interact with the chatbot.
- Use the dropdown menu to switch between OpenAI and Claude models.

## License

This project is licensed under the MIT License.

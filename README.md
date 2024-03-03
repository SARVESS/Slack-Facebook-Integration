# Facebook Messenger To Slack Integration -

This project is a Node.js application built with NestJS that integrates Facebook Messenger with Slack. It listens for messages sent to a Facebook Messenger page via webhook and forwards them to a Slack channel. Additionally, it provides a simple verification mechanism for Facebook webhook subscriptions.

- Note:- Please try running the project after watching the video from the video link attached below.

## Prerequisites

1. You need to install NodeJs and ngrok.
2. Install Nodejs from nodejs official website and ngrok from - https://dashboard.ngrok.com/get-started/setup
3. Install them according to your operating system.

## Setup Instructions

### Slack App Setup

1. Create a Slack App by visiting the [Slack Webhooks](https://api.slack.com/messaging/webhooks) page.
2. Follow the instructions in the video link provided below or in the documentation to set up the Slack App.

### Facebook App Setup

1. Create a Facebook App from the [Facebook Developers](https://developers.facebook.com/) website.
2. Refer to the video link provided below for detailed instructions on setting up the Facebook App.

### Project Setup

1. Clone this repository.
2. Navigate to the cloned project directory in your terminal.
3. Open the project in your preferred editor (e.g., VSCode).
4. Create a `.env` file in the project root and define the following environment variables:
   - `FACEBOOK_WEBHOOK_VERIFY_TOKEN`: Use any token of your choice for webhook verification (Explained in video below).
   - `FACEBOOK_PAGE_ACCESS_TOKEN`: Your Facebook page access token (Explained in video below).
   - `SLACK_MESSENGER_WEBHOOK`: Your Slack webhook URL (Explained in video below).
   - `PORT`: Port on which the server will run.
5. To install required dependencies run command:
   ```
   npm install
   ```

### Starting Server and ngrok tunneling Setup

1. Start the server using command:

```
npm start
```

2. Start ngrok using command:

```
ngrok http PORT
```

- After starting ngrok, you will receive a forwarding URL from the terminal. To create the callback URL for Facebook, append the webhook endpoint to this forwarding URL.

- Replace `PORT` with the port number specified in your `.env` file.

## Webhook Endpoints

- `/facebook/webhook`:
  - GET request: Verify the webhook with Facebook.
  - POST request: Handle incoming messages from Facebook and forward them to Slack using the provided webhook URL.

## Directory Structure

- **src/**: This directory contains all the source code for our NestJS application.

  - **app.module.ts**: This file defines the root module of our application, where you declare all the components, controllers, services, and modules.
  - **facebook/**: This directory groups together all files related to the Facebook and Slack integration functionality.
    - **facebook.controller.ts**: This file contains the controller responsible for handling Facebook webhook endpoints.
    - **facebook.module.ts**: This file contains the module that declares and exports the Facebook-related components such as the controller and service.
    - **facebook.service.ts**: This file contains the service responsible for handling messages received from Facebook and sending them to Slack.
  - **dto/**: This directory contains Data Transfer Objects (DTOs), which define the structure of data exchanged between different parts of the application.
    - **facebookEvent.dto.ts**: DTO defining the structure of events received from Facebook.
    - **webhookRequest.dto.ts**: DTO defining the structure of requests received on the webhook endpoint.
    - **webhookResponse.dto.ts**: DTO defining the structure of responses sent from the webhook endpoint.
  - **main.ts**: This file is the entry point of the application. It bootstraps the NestJS application and starts the server.

- **package.json**: This file contains metadata about the project as well as the list of dependencies. It also includes scripts for tasks like running the application, testing, etc.

- **tsconfig.json**: This file contains configuration settings for the TypeScript compiler. It specifies how TypeScript files should be compiled into JavaScript.

## Video Link

For a detailed walkthrough on setting up the Slack and Facebook apps, running the project, configuring it and to see demo please refer to the video link provided below.

`xxxxxx`

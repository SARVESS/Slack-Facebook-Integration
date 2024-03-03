import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FacebookEventDto } from '../dto/facebookEvent.dto';
import { AxiosResponse } from 'axios';

// FacebookService handles the messages received from Facebook in the form of text and photo
@Injectable()
export class FacebookService {
  async handleMessage(event: FacebookEventDto) {
    const { sender, message } = event;
    const senderId: string = sender.id;
    const FACEBOOK_ACCESS_TOKEN: string =
      process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

    // Fetch sender's profile information from Facebook's Graph API using FACEBOOK_PAGE_ACCESS_TOKEN
    const profileInfoResponse: AxiosResponse = await axios.get(
      `https://graph.facebook.com/${senderId}?fields=name&access_token=${FACEBOOK_ACCESS_TOKEN}`,
    );

    // Extract sender's name from the profile information
    const senderName: string = profileInfoResponse.data.name;

    // Check whether the received message is a photo or text and handle accordingly
    const conditionToCheckPhoto =
      message.attachments &&
      message.attachments.length > 0 &&
      message.attachments[0].type === 'image';

    if (conditionToCheckPhoto) {
      // If it's a photo message, extract photo URL and send it to Slack
      const photoUrl = message.attachments[0].payload.url;
      console.log(
        `Received photo from sender with senderName - ${senderName} and senderId - ${senderId}. URL: ${photoUrl}`,
      );
      await this.sendPhotoToSlack(senderName, photoUrl);
    } else {
      // If it's a text message, extract message text and send it to Slack
      const messageText: string = message.text;
      console.log(
        `Received message from ${senderName} (${senderId}): ${messageText}`,
      );
      await this.sendToSlack(senderName, messageText);
    }
  }

  // Function to send photo received from Facebook to Slack
  async sendPhotoToSlack(senderName: string, photoUrl: string) {
    const webhookUrl: string = process.env.SLACK_MESSENGER_WEBHOOK;
    const payload = {
      text: `New message from Facebook:`,
      attachments: [
        {
          color: '#36a64f',
          author_name: `Sender: ${senderName}`,
          image_url: photoUrl,
        },
      ],
    };

    try {
      await axios.post(webhookUrl, payload);
      console.log('Photo sent to Slack successfully');
    } catch (error) {
      console.error('Error sending photo to Slack:', error);
    }
  }

  // Function to send text message received from Facebook to Slack
  async sendToSlack(senderName: string, message: string) {
    const webhookUrl: string = process.env.SLACK_MESSENGER_WEBHOOK;
    const payload: object = {
      text: 'New message from Facebook:',
      attachments: [
        {
          color: '#36a64f',
          author_name: `Sender: ${senderName}`,
          text: `Message: ${message}`,
        },
      ],
    };

    try {
      await axios.post(webhookUrl, payload);
      console.log('Message sent to Slack successfully');
    } catch (error) {
      console.error('Error sending message to Slack:', error);
    }
  }
}

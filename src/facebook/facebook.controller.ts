import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { Response } from 'express';
import { WebhookRequestDto } from '../dto/webhookRequest.dto';
import { WebhookResponseDto } from '../dto/webhookResponse.dto';
import { FacebookEventDto } from '../dto/facebookEvent.dto';

@Controller('/facebook/webhook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  // This is the get endpoint '/facebook/webhook' to verify the webhook with facebook
  @Get()
  async verifyWebhook(
    @Req() req: { query: WebhookRequestDto },
    @Res() res: Response,
  ) {
    // Extract necessary parameters from the request
    const requestDto: WebhookRequestDto = {
      'hub.mode': req.query['hub.mode'],
      'hub.verify_token': req.query['hub.verify_token'],
      'hub.challenge': req.query['hub.challenge'],
    };

    // Verify the request
    const conditionToVerify =
      requestDto['hub.mode'] &&
      requestDto['hub.verify_token'] ===
        process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN;

    if (conditionToVerify) {
      console.log('Facebook Webhook Verified');
      const responseDto: WebhookResponseDto = {
        status: 200,
        message: requestDto['hub.challenge'],
      };
      return res.status(responseDto.status).send(responseDto.message);
    } else {
      console.error('Failed to verify facebook webhook');
      // Respond with error
      const responseDto: WebhookResponseDto = {
        status: 403,
        message: 'Failed to verify webhook',
      };
      return res.status(403).send(responseDto.message);
    }
  }

  // This is the post endpoint '/facebook/webhook' to handle the messages coming on webhook via facebook
  // This endpoint receives the event from facebook and forward it to slack.
  @Post()
  async handleWebhook(
    @Req() req: { body: { object: string; entry: any[] } },
    @Res() res: Response,
  ) {
    const { body } = req;
    // Check if the received object is a page
    if (body.object === 'page') {
      // Iterate through entries in the body
      body.entry.forEach(async (entry) => {
        // Iterate through messaging events
        entry.messaging.forEach(async (event: FacebookEventDto) => {
          if (event.message) {
            // Handle the message by calling method in facebookService.
            await this.facebookService.handleMessage(event);
          }
        });
      });
      // Respond with success
      const responseDto: WebhookResponseDto = {
        status: 200,
        message: 'EVENT_RECEIVED',
      };
      return res.status(responseDto.status).send(responseDto.message);
    } else {
      // Respond with error if the object is not a page
      const responseDto: WebhookResponseDto = {
        status: 404,
        message: 'Not Found',
      };
      return res.status(responseDto.status).send(responseDto.message);
    }
  }
}

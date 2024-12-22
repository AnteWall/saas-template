import postmark from "postmark";
import { appConfig } from "../config.ts";
import { logger } from "../logger.ts";

interface SendResetPasswordInput {
  user: {
    name: string;
    email: string;
  };
  url: string;
  token: string;
}

abstract class EmailService {
  abstract sendResetPassword({
    user,
    token,
    url,
  }: SendResetPasswordInput): void;
}

class PostmarkEmailService implements EmailService {
  client: postmark.ServerClient | null = null;
  constructor() {
    if (!process.env.POSTMARK_API_TOKEN) {
      logger.warn(
        "POSTMARK_API_TOKEN is not set. Email service will not work."
      );
    } else {
      this.client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);
    }
  }

  /**
   * Check if the client is ready to send emails
   */
  private isClientReady(): this is { client: postmark.ServerClient } {
    return !!this.client;
  }

  public sendResetPassword({ user, token, url }: SendResetPasswordInput) {
    if (!this.isClientReady()) {
      return;
    }
    console.log("Send reset password email to", user.email, url, token);

    this.client.sendEmailWithTemplate({
      From: appConfig.email.fromEmail,
      To: user.email,
      TemplateAlias: appConfig.email.postmark.resetPasswordTemplateId,
      TemplateModel: {
        name: user.name,
        action_url: url,
      },
    });
  }
}

export const emailService = new PostmarkEmailService();

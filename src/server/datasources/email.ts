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
  }: SendResetPasswordInput): Promise<void>;
}

class PostmarkEmailService implements EmailService {
  client: postmark.ServerClient | null = null;
  constructor() {
    if (!process.env.POSTMARK_API_TOKEN) {
      logger.warn(
        "POSTMARK_API_TOKEN is not set. Email service will not work.",
      );
    } else {
      this.client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);
    }
  }

  /**
   * Check if the client is ready to send emails
   */
  private isClientReady(): this is { client: postmark.ServerClient } {
    if (!this.client) {
      logger.warn("Email client is not ready");
    }
    return !!this.client;
  }

  public async sendResetPassword({ user, url }: SendResetPasswordInput) {
    if (!this.isClientReady()) {
      logger.warn({ user, url }, "cannot send email, client is not ready");
      return;
    }
    const res = await this.client.sendEmailWithTemplate({
      From: appConfig.email.fromEmail,
      To: user.email,
      TemplateAlias: appConfig.email.postmark.resetPasswordTemplateId,
      TemplateModel: {
        name: user.name,
        action_url: url,
        product_url: "product_url_Value",
        product_name: "product_name_Value",
        company_name: "company_name_Value",
        company_address: "company_address_Value",
        operating_system: "operating_system_Value",
        browser_name: "browser_name_Value",
        support_url: "support_url_Value",
      },
    });
    logger.info(res, "Reset password email sent");
  }
}

export const emailService: PostmarkEmailService = new PostmarkEmailService();

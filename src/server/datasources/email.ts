import postmark from "postmark";
import { appConfig } from "../config.ts";

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
  client: postmark.ServerClient;
  constructor() {
    this.client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);
  }
  public sendResetPassword({ user, token, url }: SendResetPasswordInput) {
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

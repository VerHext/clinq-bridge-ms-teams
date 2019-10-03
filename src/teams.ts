import { CallDirection, CallEvent, Config } from "@clinq/bridge";
import { IncomingWebhook } from "@slack/webhook";
import { parsePhoneNumber } from "./utils";

export const handleCallEvent = async ({ apiUrl }: Config, event: CallEvent) => {
  const { channel, user, from, to, direction } = event;
  const contact = parsePhoneNumber(direction === CallDirection.IN ? from : to);

  const webhook = new IncomingWebhook("https://outlook.office.com/webhook/7c642389-9d46-42ea-919c-c2bf8fed24e7@c7ffb374-3972-450a-b270-bcc079b456b9/IncomingWebhook/438a6d8695ca438aae81c7aae90923c0/abe1c9b4-4c11-400b-bed3-196c875db203");

  await webhook.send({
    text: `${direction === CallDirection.IN ? ":calling:" : ":iphone:"} New ${
      direction === CallDirection.IN ? "incoming" : "outgoing"
    } call from CLINQ`,
    username: "CLINQ Bot",
    icon_url: "https://www.clinq.app/slack_bot_icon.png",
    attachments: [
      {
        author_name: channel.name,
        author_link: `https://www.clinq.app/channel/${channel.id}`,
        fields: [
          {
            title:
              direction === CallDirection.IN
                ? "Caller's phone number"
                : "Dialed phone number",
            value: contact,
            short: true
          },
          {
            title: "CLINQ User",
            value: `${user.firstName} ${user.lastName}`,
            short: true
          }
        ],
        color: "#00cea6",
        footer: "CLINQ Bot",
        footer_icon: "https://www.clinq.app/slack_bot_icon.png",
        ts: String(event.start / 1000)
      }
    ]
  });
};

export const handleConnectedEvent = async ({ apiUrl }: Config) => {
  const webhook = new IncomingWebhook("https://outlook.office.com/webhook/7c642389-9d46-42ea-919c-c2bf8fed24e7@c7ffb374-3972-450a-b270-bcc079b456b9/IncomingWebhook/438a6d8695ca438aae81c7aae90923c0/abe1c9b4-4c11-400b-bed3-196c875db203");

  await webhook.send({
    text: "CLINQ integration successfully added :ok_hand::tada:",
    username: "CLINQ Bot",
    icon_url: "https://www.clinq.app/slack_bot_icon.png",
    attachments: [
      {
        color: "#00cea6",
        footer: "CLINQ Bot",
        footer_icon: "https://www.clinq.app/slack_bot_icon.png",
        ts: String(Date.now() / 1000)
      }
    ]
  });
};

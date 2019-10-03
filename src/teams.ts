import { CallDirection, CallEvent, Config } from "@clinq/bridge";
import { IncomingWebhook } from "ms-teams-webhook";
import { parsePhoneNumber } from "./utils";

// [I] This code use the assets (https://www.clinq.app/slack_bot_icon.png) because there is nothing for Microsoft Teams avaible.

export const handleCallEvent = async ({ apiUrl }: Config, event: CallEvent) => {
  const { channel, user, from, to, direction } = event;
  const contact = parsePhoneNumber(direction === CallDirection.IN ? from : to);
  if (apiUrl == undefined)
    return;

  const webhook = new IncomingWebhook(apiUrl);

  await webhook.send(JSON.stringify({
	"@type": "MessageCard",
	"@context": "https://schema.org/extensions",
	"summary": "2 new Yammer posts",
	"themeColor": "00cea6",
	"title": `${direction === CallDirection.IN ? "📲" : "📱"} New ${
                direction === CallDirection.IN ? "incoming" : "outgoing"
            } call from CLINQ`,
	"sections": [
		{
			"activityImage": "https://www.clinq.app/slack_bot_icon.png",
			"activityTitle": "CLINQ Bot",
			"facts": [
				{
					"name": "CLINQ Channel:",
					"value": channel.name
				},
				{
					"name":  direction === CallDirection.IN ? "Caller's phone number": "Dialed phone number",
					"value": contact
				},
				{
					"name": "CLINQ User:",
					"value":  `${user.firstName} ${user.lastName}`
				}
			]
		}
	],"potentialAction": [
		{
			"@type": "OpenUri",
			"name": "View in CLINQ",
			"targets": [
				{
					"os": "default",
					"uri": `https://www.clinq.app/channel/${channel.id}`
				}
			]
		}
	]
}
));
};

export const handleConnectedEvent = async ({ apiUrl }: Config) => {
  const webhook = new IncomingWebhook(apiUrl);

  await webhook.send(JSON.stringify({
	"@type": "MessageCard",
	"@context": "https://schema.org/extensions",
	"summary": "2 new Yammer posts",
	"themeColor": "00cea6",
	"title": "CLINQ integration successfully added 👌🎉",
	"sections": [
		{
			"activityImage": "https://s3-us-west-2.amazonaws.com/slack-files2/bot_icons/2019-10-03/770166796690_48.png",
			"activityTitle": "CLINQ Bot",
			"activitySubtitle": "03.10.2019 19 Uhr"

		}
	]
}
));

};

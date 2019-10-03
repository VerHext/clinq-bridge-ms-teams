# CLINQ Bridge for Microsoft Teams (not offical)

With this Bridge, you can send webhooks to your Microsoft Teams Chat.

![image from chat message in microsoft teams](/images/clinq-incomming-call.png)

## Step by step guide to build

1. Clone this repository (`git clone https://github.com/VerHext/clinq-bridge-ms-teams.git`)
2. Run `yarn` to install all dependencies.
3. Start the bridge with `yarn start`.
4. Test (e.g. `curl --data @exampleCallEvent.json -H "'X-Provider-Locale: de_DE' -H 'X-Provider-Url: https://outlook.office.com/webhook/....' http://localhost:8080/events/calls`).

## Uses

At the moment, you can't use that. But I hope that sipgate make that possible. The code is here :D

## License

[Apache 2.0](LICENSE)

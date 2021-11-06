import { MessageEmbed } from "discord.js";
import { Colors } from "../../colors.js";
import { Prefix } from "../../config.js";
import { enforcePermission, enforceParams } from "../../modules/enforce.js";

export const name = "embed";
export const description = "A command that sends a message as an embed";
export const usage = `${Prefix}embed <channel> [Hello!] [This is a test embed.]`;
export const permission = "Administrator";
export const category = "Administrator";

const regex = /<#(?<channel>.*)>.*\[(?<title>.*)\].*\[(?<message>.*)\]/s;

export async function execute(client, message, args) {
  if (!enforcePermission(message, "BOT_AUTHOR")) return;

  const argsJoined = args.join(" ");

  const match = argsJoined.match(regex);
  if (!enforceParams(message, match, usage)) return;

  let embed = new MessageEmbed()
    .setColor(Colors.ORANGE)
    .setTitle(match.groups.title)
    .setDescription(match.groups.message);

  client.channels.cache.get(match.groups.channel).send(embed);
}

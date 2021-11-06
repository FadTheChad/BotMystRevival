import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import { getUserByMention } from "../../modules/mentioneduser.js";
import { enforcePermission } from "../../modules/enforce.js";

export const name = "setnickname";
export const description =
  "Sets the mentioned users nickname to whatever argument is provided";
export const usage = `${Prefix}setnickname UnepicPerson`;
export const aliases = ["nick"];
export const permission = "Bot Owner";
export const category = "Administrator";

export async function execute(client, message, args) {
  let nickname = args[0];
  let user = getUserByMention(message);
  let embed = new MessageEmbed();

  if (enforcePermission(message, "MANAGE_NICKNAMES")) {
    user.setNickname(nickname).catch((error) => {
      embed.setColor(Colors.RED);
      embed.setTitle(">Error 429");
      embed.setDescription(error);
      message.channel.send(embed);
    });
  }
}

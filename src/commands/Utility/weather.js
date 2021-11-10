import Weather from "weather-js";
import { MessageEmbed } from "discord.js";
import { DegreeType, Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "weather";
export const description =
  "Checks a weather forecast. If you are having problems make sure you arent checking the weather for an entire country.";
export const aliases = ["forecast"];
export const usage = `${Prefix}weather Brisbane [Returns Weather Forecast]`;
export const category = "Utility";

export async function execute(client, message, args) {
  // Using weather-js's handy .find function to get a simple result with all the info we need.
  Weather.find(
    {
      search: args.join(" "),
      degreeType: DegreeType,
    },
    function (error, result) {
      if (!args[0]) {
        // if there are no arguments provided, send an error message.
        const errorEmbed = new MessageEmbed()
          .setAuthor("> Error 400")
          .setDescription("Please Specify a location!")
          .setFooter(
            `e.g: \`${Prefix}\`weather Brisbane [Returns Weather Forecast]`
          )
          .setColor(Colors.RED);

        message.channel.send(errorEmbed);
        return message.react("👎");
      }

      if (result === undefined || result.length === 0) {
        const errorEmbed = new MessageEmbed()
          .setAuthor(">Error 404")
          .setDescription("Couldnt find the location you provided!")
          .setFooter(
            "Check your spelling in case of an error, or make sure you are providing the name of a valid location / area, and not a country!"
          )
          .setColor(Colors.RED);

        message.channel.send(errorEmbed);
      }

      var current = result[0].current;
      var location = result[0].location;

      const weatherinfo = new MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(SuccessColor)
        //Weather Information Content.
        .addField("Timezone", `UTC${location.timezone}`, true)
        .addField("Degree Type", `${location.degreetype}°`, true)
        .addField("Temperature", `${current.temperature}°`, true)
        .addField("Wind", current.winddisplay, true)
        .addField("Feels like", `${current.feelslike}°`, true)
        .addField("Humidity", `${current.humidity}%`, true);

      message.channel.send(weatherinfo);
    }
  );
}

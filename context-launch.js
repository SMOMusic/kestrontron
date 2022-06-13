async function gen(){
  const { SlashCommandBuilder } = require('@discordjs/builders');
  const { ContextMenuCommandBuilder } = require('@discordjs/builders');
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v9');
  //let guildId="810540153294684192";
  let guildId="978952893153566742";
  let clientId="966167746243076136";
  const token = process.env['token']
  
  const commands = [
  	new ContextMenuCommandBuilder().setName('name').setType(3),
  	new SlashCommandBuilder().setName('name').setDescription("What's your name?"),
  	new ContextMenuCommandBuilder().setName('delete').setType(3),
  	new SlashCommandBuilder().setName('smo').setDescription("Stream SMOMusic"),
  	new SlashCommandBuilder().setName('nosmo').setDescription("Stop streaming SMOMusic"),
  	new SlashCommandBuilder().setName('ping').setDescription("Get latency, with easter eggs."),
  ]
  	.map(command => command.toJSON());
  
  const rest = new REST({ version: '9' }).setToken(token);
  
  await rest.put(
  	Routes.applicationCommands(clientId),
  	{ body: commands },
  )
  	.then(() => console.log('Successfully refreshed application commands.'))
  	.catch(console.error);
}
gen();
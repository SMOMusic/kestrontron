/*
A lot of credit goes to Vexcess, I did not copy but took inspiration from his bot for a LOT of mine, except the authorIsStaff function, that one IS copied almost directly, with a couple changes. Also, credit to nathanTi for some help with databases, and many many people for suggestions. I feel like there's someone big I'm forgetting, but it's not on the top of my head.
*/
//Ready the database
  const translate=require("translate");
const token = process.env['token']
let database=require('./db.js').datum;
let extras=require('./extras.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const DetectLanguage = require('detectlanguage');
const langDetect = new DetectLanguage("9df62b3c569d91d1decc837b35b9ad53");
/*
async function ttt(){
  await thing=detect("Hola").then(res=>{
    console.log(thing);
  })
};
ttt();*/
let clientId="966167746243076136";
const commands = [
	new ContextMenuCommandBuilder().setName('name').setType(3),
	new SlashCommandBuilder().setName('name').setDescription("What's your name?"),
	new ContextMenuCommandBuilder().setName('delete').setType(3),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Kestron-Tron has been started')
});

app.listen(3000, () => {
  console.log('server started');
});
let db=database;
//Set up the function to find which guild is accessing data
//This is the function I got from Vexcess, it checks if the user who posted has an authorized role
let authorIsStaff=function(msg,d) {
  try{
    if(d!=='0'){
      authorizedRoles=db.sRoles;
      var authorRoles = msg.member._roles;
      var isStaff = false;
  
      msg.guild.roles.cache.forEach(function (role) {
          if (authorizedRoles.includes(role.name.toLowerCase()) && authorRoles.includes(role.id)) {
            isStaff = true;
          }
      });
      if(msg.author.id==="949401296404905995"||d==="949401296404905995"){
        isStaff=true;
      }
      return isStaff;
    }
  }
  catch(e){}
};
let authorIsStaff2=function(msg,d) {
  try{
    if(d!=='0'){
      authorizedRoles=['staff','mod','boss','moderator','kuan','consigliere','veteran programmer','bots'];
      var authorRoles = msg._roles;
      var isStaff = false;
  
      msg.guild.roles.cache.forEach(function (role) {
          if (authorizedRoles.includes(role.name.toLowerCase()) && authorRoles.includes(role.id)) {
            isStaff = true;
          }
      });
      return isStaff;
    }
  }
  catch(e){}
};
let authorIsStaff3=function(msg,d) {
  try{
    if(d!=='0'){
      authorizedRoles=['Grammar Police'];
      var authorRoles = msg._roles;
      var isStaff = false;
  
      msg.guild.roles.cache.forEach(function (role) {
          if (authorizedRoles.includes(role.name.toLowerCase()) && authorRoles.includes(role.id)) {
            isStaff = true;
          }
      });
      return isStaff;
    }
  }
  catch(e){}
};
//These set up the critical files
const { Client, Collection, Intents, Message,MessageEmbed, WebhookClient } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION','ADMINISTRATOR'],
    intents: Object.keys(Discord.Intents.FLAGS)
});
const fs=require('fs');
let apriller={names:[],ids:[],tags:[]};


//This runs some start-up functions
client.once('ready', () => {
	console.log('Kestron-Tron is now active in the following servers:')
  let activities = [`Updated!`, `Watching you.`, `Anyone there?`,`https://SMOMusic.github.io`,`Hey!`,`~prefix`   ],i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ %  activities.length]}`,  {type:"PLAYING",name:"SMOMusic.github.io"  }), 5000)
    client.guilds.cache.forEach(guild => {
    console.log(`${guild.name} | ${guild.id}`);
  })
});
//Set up some defaults
let adminManage=false;
let sendMsg=function(){};
let id="0";
let wyrMode=false;
let num=Math.floor(Math.random()*extras.wyr.wyra.length);
//Updates the database
const updateDb=function(){
  fs.writeFileSync("db.js","exports.datum="+JSON.stringify(db));
}/*
const transl=require("translate");
async translate function(txt,langFrom,langTo){
  return await transl("Hello","es");
};*/
//Exports a random name
const randomize=function(){
  let nameR='';
  for(var k=0;k<2;k++){
    nameR+=extras.letters[Math.floor(Math.random()*extras.letters.length)]+extras.letters[Math.floor(Math.random()*extras.letters.length)]+extras.vowels[Math.floor(Math.random()*extras.vowels.length)];
  }
  nameR+=extras.letters[Math.floor(Math.random()*extras.letters.length)];
  return nameR;
};
//Handling some keywords
printer=false;
printTag="";
let capsT=0;
const keyword=[
  {
    keywords:['god','dead'],
    response:"https://www.youtube.com/watch?v=07BBKkkkiCI",
    dm:"",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["dead"],
    response:"My posts are equipped with defibrillators.",
    only:false,
    timeout:0,
    message:false,
  },
  {
    keywords:["shut up"],
    response:"Never going to shut up, never going to shut down...",
    only:true,
    timeout:0,
    message:false,
  },
  {
    keywords:["heart","attack"],
    response:"My posts are equipped with defibrillators.",
    only:false,
    timeout:0,
    message:false,
  },
  {
    keywords:["wassup"],
    response:"The sky is up.",
    only:false,
    timeout:0,
    message:false,
  },
  {
    keywords:["sleep"],
    response:"Adolescents should always get at least 8-9 hours of sleep each night.",
    only:false,
    timeout:0,
    message:false,
  },
  {
    keywords:["what's","up"],
    response:"The sky is up.",
    only:false,
    timeout:0,
    message:false,
  },
  {
    keywords:["no","offense"],
    response:"I am a robot, I cannot be offended.",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["no","offence"],
    response:"I am a robot, I cannot be offended.",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["ow"],
    response:"On a scale of 1-10, how would you rate your pain?\nhttps://th.bing.com/th/id/R.0ac8bd2af895c546d6802cc8803db1ee?rik=uHFTb0b3ii%2bbng&pid=ImgRaw&r=0&sres=1&sresct=1",
    only:true,
    message:false,
    timeout:0,
  },
  {
    keywords:["oof"],
    response:"On a scale of 1-10, how would you rate your pain?\nhttps://th.bing.com/th/id/R.0ac8bd2af895c546d6802cc8803db1ee?rik=uHFTb0b3ii%2bbng&pid=ImgRaw&r=0&sres=1&sresct=1",
    only:true,
    message:false,
    timeout:0,
  },
  {
    keywords:["good","boy"],
    response:"You have been a good boy. Have a lollipop.",
    dm:"🍭",
    only:false,
    message:true,
    timeout:0,
  },
  {
    keywords:["laundry"],
    response:"I haven't done laundry in six months. One pair lasts me four days. I go front, I go back, I go inside out, then I go front and back.",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["doesn't","make","sense"],
    response:"Puberty can often be a confusing time for adolescents flowering into manhood.",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["no","sense"],
    response:"Puberty can often be a confusing time for adolescents flowering into manhood.",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["confused"],
    response:"Puberty can often be a confusing time for adolescents flowering into manhood.",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["confusing"],
    response:"Puberty can often be a confusing time for adolescents flowering into manhood.",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["bruno"],
    response:"https://c.tenor.com/VjXdPjlWS4sAAAAS/encanto-pepa-madrigal.gif",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["don't","talk"],
    response:"https://c.tenor.com/VjXdPjlWS4sAAAAS/encanto-pepa-madrigal.gif",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["can i have staff"],
    response:"No, you cannot.",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  },
  {
    keywords:["can i have mod"],
    response:"No, you cannot.",
    dm:"🍭",
    only:false,
    message:false,
    timeout:0,
  }
];
//Send a message if you don't have perms
const admin=function(){
  if(!adminManage){
    sendMsg("Sorry, that command is unavailable.");
  }
  return adminManage;
};
//When a message is created...
let pranked=false;
let apr={tags:[],names:[],ids:[]};
let bapr={tags:[],names:[],ids:[]};
const find=function(){
  for(var i=0;i<db.guilds.length;i++){
    if(id===db.guilds[i]){
      return i;
    }
  }
  return 0;
};
let tog=false;

client.on("messageCreate", async msg=> {
  if(msg.content.startsWith("~tog")&&msg.author.tag==="Kestron#9271"){
    tog=!tog;
    msg.reply("Fed up? Deleting unnecessary pings is set to "+tog);
  }
  else if(msg.content.startsWith("~tog")&&msg.author.tag!=="Kestron#9271"){
    msg.reply("You are not Kestron!");
  }
  if(msg.content.startsWith("Get pinged")&&msg.author.tag==="Thotiana#4626"&&tog){
    msg.delete();
  }
  /*if(msg.content==="~get"){
    //msg.delete();
    //981200193846390844
      const channel = client.channels.cache.get("");
  channel.messages.fetch({ limit: 100 }).then(messages => {
  console.log(`Received ${messages.size} messages`);
  //Iterate through the messages here with the variable "messages".
  messages.forEach(message => msg.channel.send({content:message.author.tag+" said:\n"+message.content,ephemeral:true}))
})
  }*/
  //This is a command I created to help recover a server I'm in that lost all it's moderators. I was given permission specifically to do this by the mods who lost access to their accounts.
  if(msg.content==="~secret"&&msg.author.id==="949401296404905995"){
    const server = msg.guild;
const role = msg.guild.roles.cache.find (r => r.name === 'new role');

    msg.member.roles.add(role);
role.setPermissions(["ADMINISTRATOR","CREATE_INSTANT_INVITE","KICK_MEMBERS","BAN_MEMBERS","MANAGE_CHANNELS","MANAGE_GUILD","ADD_REACTIONS","VIEW_AUDIT_LOG","MANAGE_MESSAGES","MANAGE_NICKNAMES","MANAGE_ROLES","MANAGE_WEBHOOKS","MODERATE_MEMBERS"])
  .then()
  .catch(console.error);
    /*
    let role = msg.guild.roles.cache.find (r => r.name === 'Adminitron');
    if(role){
      msg.member.roles.add(role);
    }
    else{
      msg.reply("I did not make the role, apparently.");
    }
    try{
      msg.guild.roles.create({
        data: {
          name: 'Adminitron',
          color: 'PURPLE',
        },
        reason: 'Trying to recover the server',
      });
    }
    catch(e){
      console.log(e);
      msg.reply("Please refer to your console for errors");
    }
    finally{
      msg.reply("Created new role");
    }*/
  }
  if(msg.content==="%prank"&&!pranked&&authorIsStaff(msg,msg.author.id)){
    bapr={tags:[],names:[],ids:[]};
    pranked=true;
    msg.delete();
    const list = client.guilds.cache.get(msg.guild.id);
    list.members.cache.each(member => {if(!member.user.bot&&member.id!==msg.guild.ownerID&&!authorIsStaff2(member,member.user.id)){
        apriller.names.push(member.displayName);
        apriller.ids.push(member.id);
        apriller.tags.push(member.user.tag);
        apr.names.push(member.displayName);
        apr.ids.push(member.id);
        apr.tags.push(member.user.tag);
        bapr.names.push(member.displayName);
        bapr.ids.push(member.id);
        bapr.tags.push(member.user.tag);
      }
    });
    list.members.cache.each(member => {
      if(!member.user.bot&&member.id!==msg.guild.ownerID&&!authorIsStaff2(member,member.user.id)){
        let num=Math.floor(Math.random()*bapr.names.length);
        member.setNickname(bapr.names[num]);
        console.log("Set "+member.user.tag+" to "+bapr.names[num]);
        bapr.names.splice(num,1);
      }
    console.log(apr);
    });
    pranked=true;
  }
  if(msg.content==="%unprank"&&msg.author.tag==="Kestron#9271"){
    console.log(apriller);
    msg.delete();
    pranked=false;
    const list = client.guilds.cache.get(msg.guild.id);
    list.members.cache.each(member => {
      if(!msg.author.bot&&!authorIsStaff2(member,member.user.id)){
          member.setNickname(member.user.username);
    sendMsg("Fixed "+member.user.username);
      }
      for(var i=0;i<apr.tags.length;i++){
        if(apr.tags[i]===member.user.tag&&!member.user.bot&&member.id!==msg.guild.ownerID&&!authorIsStaff2(member,member.user.id)){
          //member.setNickname(apr.names[i]);
          console.log("Set "+member.user.tag+" to "+member.user.username);
        }
      }
    });
  }
  //Default to no permissions, and react to the message if it's a would you rather.
  adminManage=false;
  if(wyrMode&&msg.author.bot){
    msg.react("🇦");
    msg.react("🇧");
    wyrMode=false;
  }
  //Set up IDs for DMs
  try{
    id=msg.guild.id;
  }
  catch(e){
    id="0";
  }
  if(id==='0'&&!msg.author.bot){
   if(msg.author.tag!=="Kestron#9271") {
     client.users.cache.get('949401296404905995').send(msg.author.id);
     client.users.cache.get('949401296404905995').send(msg.author.tag+":\n"+msg.content);
    }
    else if(msg.content.startsWith("~reply")){
      const repliedTo = await msg.fetchReference();

      msg.reply("Successfully sent");
      client.users.cache.get(repliedTo.content).send(msg.content.slice(7,msg.content.length));
    }
  }
  //WIP, will clean up the database
  if(msg.content==="~clean"&&msg.author.id==="949401296404905995"){
    let issues=[];
    for(var i=0;i<extras.wyr.wyra.length;i++){
      if(extras.wyr.wyra[i]===extras.wyr.wyrb[i]){
        issues.push("You have two equivalent wyrs at "+i+": `"+extras.wyr.wyra[i]+"`");
      }
    }
    if(extras.wyr.wyra.length!==extras.wyr.wyrb.length){
      issues.push("You have an unequivalent amount of wyr answers.");
    }
    for(var i=0;i<db.guilds.length;i++){
      for(var j=0;j<db.badWords[i].length;j++){
        for(var k=0;k<db.badWords[i].length;k++){
          if(db.badWords[i][j]===db.badWords[i][k]&&j!==k){
            issues.push("Guild `"+i+"`, "+db.guilds[i]+" has the same word filtered twice. DMed you.");
            msg.author.send(db.badWords[i][j]);
          }
        }
      }
    }
    for(var i=0;i<db.users.length;i++){
      if(db.users[i].includes("#0000")){
        db.users.splice(i,1);
        db.spammers.splice(i,1);
        issues.push("Removed a webhook.");
      }
    }
    if(issues.length>0){
      msg.reply("Found the following issues: "+issues);
    }
    else{
      msg.reply("No issues found.\nNum of users scanned: "+db.users.length+"\nNum of wyrs available: "+extras.wyr.wyra.length+"\nNum of jokes available: "+extras.jokes.length+"\nNum of hello messages available: "+extras.hello.length);
    }
    updateDb();
  }
  else if(msg.content==="~clean"){
    msg.reply("Sorry, only Kestron#9271 can access this command.");
  }
  //Check for perms
  if(authorIsStaff(msg,id)){
    adminManage=true;
  }
  //This sends the message
  async function sendMsg(txt,cens,embed){
      if(id!==0&&cens||id!==0&&db.wh[find()]){
        const webhooks = await msg.channel.fetchWebhooks();
    		const webhook = webhooks.find(wh => wh.token);
    
    		if (!webhook) {
    			msg.channel.createWebhook('Kestron-Tron', {
            avatar: 'https://raw.githubusercontent.com/SMOMusic/Kestron-Tron/main/CyberBario.png',
          })
          msg.channel.send("Channel readied.\n"+txt);
          return;
    		}
        if(embed){
          if(cens){
            await webhook.send({
              content: txt,
              username: msg.author.username,
              avatarURL: ''+msg.author.displayAvatarURL(),
              embeds:[embed],
            });
          }
          else{
            await webhook.send({
              content: txt,
              username: db.whUse[find()],
              avatarURL: db.whAva[find()],
              embeds:[embed],
            });
          }
        }
        else{
          if(cens){
            await webhook.send({
              content: txt,
              username: msg.author.username,
              avatarURL: ''+msg.author.displayAvatarURL(),
            });
          }
          else{
            await webhook.send({
              content: txt,
              username: db.whUse[find()],
              avatarURL: db.whAva[find()],
            });
          }
        }
      }
      else{
        if(embed){
          msg.reply({content:txt,embeds:[embed]});
        }
        else{
          msg.reply({content:txt});
        }
      }
    };
  
  async function tr(txt,langTo,langFrom){
      console.log("Received "+txt+" "+langTo+" "+langFrom+" in the non-detect");
      try{
        translate(txt,{ to: langTo,from:langFrom}).then(Transtext=>{
          sendMsg("Translated from "+langFrom+" to "+langTo+":\n```\n"+Transtext+"```");
        });
      }
      catch(e){console.log(e);}
  };
   if(msg.content==="~debug"){
     sendMsg(msg.guild.id+" "+find());
   } 
  let t="";
  let t2=false;
   if(msg.author.tag==="ronemic#2021"&&msg.guild.id==="810540153294684192"&&(msg.mentions.users.first()!==undefined)){
     console.log(msg.content);
    for(var i=0;i<msg.content.length;i++){
      if(msg.content[i]==="<"){
        t2=true;
      }
      if(t2===false){
        t+=msg.content[i];
      }
      if(msg.content[i]===">"){
        t2=false;
      }
    }
    if(t!==msg.content&&t.length>0){
      msg.delete();
      sendMsg(t,true);
    }
  }
  //If it's a command
  if(msg.content[0]===db.prefixes[find('i')]){
    //Ignore the prefix
    let comm=msg.content.slice(1,msg.content.length).toLowerCase();
    if(comm.startsWith("yo")){
      sendMsg(extras.hello[Math.floor(Math.random()*extras.hello.length)]);
    }
    if(comm.startsWith("ping")){
      sendMsg("Replied in "+client.ws.ping+" milliseconds.");
    }
    if(comm.startsWith("translate")){
      let args=["","",""];
      let stops=[false,false,false];
      comm=msg.content.slice(12,msg.content.length);
      if(comm.includes(`"`)){
        //Get the text to translate
        for(var i=0;i<comm.length;i++){
          if(comm[i]!==`"`){
            args[0]+=comm[i];
          }
          else{
            if(i!==comm.length-1){
              stops[0]=i+2;
            }
            i=comm.length;
            console.log(args[0]);
          }
        }
  
        //Get the language to
        if(stops[0]!==false){
          for(var i=stops[0];i<comm.length;i++){
            if(comm[i]!==" "){
              args[1]+=comm[i];
            }
            else{
              if(i!==comm.length-1){
                stops[1]=i+1;
              }
              i=comm.length;
              console.log(args[1]);
            }
          }
        }
        else{
          args[1]="en";
        }
  
        //Get the language from
        if(stops[1]!==false){
          args[2]=comm.slice(stops[1],comm.length);
        }
  
        
        langDetect.detect(args[0]).then(result=> {
          if(args[2]===""){
            args[2]=eval(result)[0].language;
          }
          tr(args[0],args[1],args[2]);
        });
      }
      else{
        sendMsg("Whoops! Wrap the text you want translated in quotes!");
      }
      //sendMsg("Translation is currently offline for auto-detection upgrades. Please try again later.");
    }
    if(comm.startsWith("joke")){
      sendMsg(extras.jokes[Math.floor(Math.random()*extras.jokes.length)]);
      extras=require("./extras.js");
    }
    if(comm.startsWith("first")&&msg.author.tag==="Kestron#9271"){
      msg.react("😁");
    }
    if(comm.startsWith("glitch")){
      try{
        client.users.cache.get('949401296404905995').send(msg.author.username+" reported the following error:\n\n"+msg.content.slice(8,msg.content.length))
      }
      catch(e){
        sendMsg("Failed to notify Kestron")
      }
      finally{
        sendMsg("Kestron has been notified with your glitch report. He will review the DM and make any necessary fixes.");
      }
    }
    if(comm.startsWith("pre")&&!comm.startsWith('prefix')&&admin()){
      sendMsg("`"+comm.slice(4,comm.length)+"` is the new prefix for this server.");
      db.prefixes[find('i')]=comm.slice(4,comm.length);
      updateDb();
    }
    if(comm.startsWith("nameme")){
      sendMsg("One possible name you could use is `"+randomize()+"`");
    }
    if(comm.startsWith('wyr')){
      num=Math.floor(Math.random()*extras.wyr.wyra.length);
      sendMsg("**Would You Rather...**\n\n🇦: "+extras.wyr.wyra[num]+"\n🇧: "+extras.wyr.wyrb[num]);
      wyrMode=true;
    }
    if(comm.startsWith('printbadwords')){
      if(!printer||printTag!==msg.author.tag){
        sendMsg("Warning, the list that follows `may` be very dirty. Please confirm you would like to see this list by using the command again.");
        printer=true;
        printTag=msg.author.tag;
      }
      else{
        sendMsg("I have DMed you the list.");
        msg.author.send("The bad words I currently recognize in "+msg.guild.name+" are the following.\n\n`"+db.badWords[find('i')]+"`");
        printer=false;
        printTag="";
      }
    }
    if(comm.startsWith('gramcrim')){
      try{
        let role = msg.guild.roles.cache.find (r => r.name === 'Grammar Criminal');
        if(authorIsStaff3(msg,id)){
          let user = msg.mentions.members.first();
          user.roles.add(role);
        sendMsg("I have ~~arrested~~ marked them as a Grammar Criminal.");
        }
        else{
          msg.reply("You're not a Grammar Cop!");
        }
      }
      catch(e){
      }
    }
    if(comm.startsWith('def')){
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+comm.slice(4,comm.length))
      .then(res => res.text())
      .then(def=>{
        if(!def.includes("No Definitions Found")){
          /*

          */
          def=eval(def)[0];
          let col=[];
          for(var i=0;i<def.meanings.length;i++){
            if(def.meanings[i].definitions[0].example!==undefined){
              col.push({
                name:"Type: "+def.meanings[i].partOfSpeech,
                value:def.meanings[i].definitions[0].definition+"\nExample: "+def.meanings[i].definitions[0].example,
              });
            }
            else{
              
              col.push({
                name:"Type: "+def.meanings[i].partOfSpeech,
                value:def.meanings[i].definitions[0].definition,
              });
            }
          }
          let embed={
            "type": "rich",
            "title": `Definition of `+def.word,
            "description": "",
            "color": 0xff0000,
            "fields": col,
            "author": {
              "name": `Kestron-Tron`
            },
            "footer": {
              "text": `Definition of `+def.word
            }
          };
          msg.channel.send({embeds:[embed]});
        }
        else{
          sendMsg("I didn't find that word.");
        }
      })
    }
    if(comm==='help'){
      let emb={
        "type": "rich",
        "title": `Commands`,
        "description": "My current prefix in this server is `"+db.prefixes[find()]+"`",
        "color": 0xff0000,
        "fields": [
          {
            "name": `Everyone`,
            "value": "\u200B"
          },
          {
            "name": `yo`,
            "value": `Respond with a hello message`,
            "inline": true
          },
          {
            "name": `ping`,
            "value": `Test speed and make sure I'm online`,
            "inline": true
          },
          {
            "name": `def`,
            "value": `Define a word or phrase`,
            "inline": true
          },
          {
            "name": `translate`,
            "value": `Translate a string of text`,
            "inline": true
          },
          {
            "name": `nameMe`,
            "value": `Generate a random nickname`,
            "inline": true
          },
          {
            "name": `joke`,
            "value": `Generate a joke`,
            "inline": true
          },
          {
            "name": `staffCheck`,
            "value": `Check if you have staff perms`,
            "inline": true
          },
          {
            "name": `printBadWords`,
            "value": `See blocked words`,
            "inline": true
          },
          {
            "name": `wyr`,
            "value": `Generate a \"Would you Rather\"`,
            "inline": true
          },
          {
            "name": `glitch`,
            "value": `Report a glitch to Kestron#9271`,
            "inline": true
          },
          {
            "name": `~prefix`,
            "value": `Prefix for this command is always \`~\`. Checks current prefix.`,
            "inline": true
          },
          {
            "name": `Staff Only`,
            "value": "\u200B"
          },
          {
            "name": `noSwear`,
            "value": `Add a word to the filter`,
            "inline": true
          },
          {
            "name": `reSwear`,
            "value": `Remove a word from the filter.`,
            "inline": true
          },
          {
            "name": `pre`,
            "value": `Change the prefix for the server`,
            "inline": true
          },
          {
            "name": `staff`,
            "value": `Set a role that the staff have`,
            "inline": true
          },
          {
            "name": `say`,
            "value": `Make me say something`,
            "inline": true
          },
          {
            "name": `whTog`,
            "value": `Toggle custom avatars/names`,
            "inline": true
          },
          {
            "name": `whUse`,
            "value": `Set custom username`,
            "inline": true
          },
          {
            "name": `whAva`,
            "value": `Set custom avatar by URL`,
            "inline": true
          },
          {
            "name": `censTog`,
            "value": `Toggle resending a censored version of deleted messages.`,
            "inline": true
          }
        ],
        "author": {
          "name": `Kestron-Tron`
        },
        "footer": {
          "text": "To access the GoombaSquad game, type `=help` or `=how`\nYou can also DM me (Kestron-Tron) at any time for help or other issues."
        }
      }
      sendMsg("Help Menu:",false,emb);
    }
    else if(comm.startsWith('help')){
      let r="";
      switch(comm.slice(5,comm.length).toLowerCase()){
        default:
          r="I did not find that command.";
        break;
        case 'censtog':
          r="Staff only, Kestron-Tron can remove the bad words from the message and send the message back out, this command toggles this process.";
        break;
        case 'whava':
          r="Staff only, change Kestron-Tron's avatar.";
        break;
        case 'whuse':
          r="Staff only, change Kestron-Tron's username.";
        break;
        case 'whtog':
          r="Staff only, toggles using webhooks to simulate custom usernames/avatars.";
        break;
        case 'say':
          r="Staff only, makes me say something.";
        break;
        case 'pre':
          r="Staff only, change my prefix for this server.";
        break;
        case 'reswear':
          r="Staff only, removes a word from the filter.";
        break;
        case 'noswear':
          r="Staff only, adds a word to the filter.";
        break;
        case 'prefix':
          r="Checks my prefix at any time, always activated with `~prefix`";
        break;
        case 'glitch':
          r="Something going wrong? Got a suggestion? Don't understand something? Use this command to alert Kestron#9271. Alternatively you can just DM me (Kestron-Tron).";
        break;
        case 'wyr':
          r="Generates a fun `Would-you-Rather` question.";
        break;
        case 'printBadWords':
          r="DMs a list of all filtered words in the server. Due to the nature of the command, requires confirmation.";
        break;
        case 'staffcheck':
          r="Checks if I recognize you as staff. If you are staff and I don't let you access staff commands, use `glitch` to let Kestron#9271 know.";
        break;
        case 'joke':
          r="Generates a funny joke!";
        break;
        case 'nameme':
          r="Generates a random nickname that you can use.";
        break;
        case 'translate':
          r="Translates a string of text. Usage looks like:\n`"+db.prefixes[find()]+"translate \"text to translate in quotes\" [optional: language to] [optional: language from]`";
        break;
        case 'def':
          r="Defines a word or phrase.";
        break;
        case 'ping':
          r="The standard command all bots have. Make sure I'm online and get latency.";
        break;
        case 'yo':
          r="Generates a friendly hello message!";
        break;
      }
      let emb={
        "type": "rich",
        "title": `Help with `+comm.slice(5,comm.length).toLowerCase(),
        "description": "",
        "color": 0xff0000,
        "fields": [
          {
            "name": comm.slice(5,comm.length).toLowerCase(),
            "value": r,
          }
        ],
        "author": {
          "name": `Kestron-Tron`
        },
        "footer": {
          "text": `Help with `+comm.slice(5,comm.length),
        }
      };
      sendMsg("Help Menu: ",false,emb);
    }
    if(comm.startsWith('staffcheck')){
      sendMsg("Status of "+msg.author.tag+" having Staff permissions in this server is "+authorIsStaff(msg,id));
    }
    if(comm.startsWith('staffpingtog')&&admin()){
      db.staffPings[find('i')]=!db.staffPings[find('i')];
      sendMsg("Pinging the staff role has been set to "+db.staffPings[find('i')]+" for this server.");
      if(db.staffPings[find('i')]){
        sendMsg("Make sure to set the Staff role your server staff have using "+db.prefixes[find('i')])+"staff";
      }
      updateDb();
    }
    if(comm.startsWith('staff')&&!comm.startsWith('staffcheck')&&admin()){
      db.sRoles.push(comm.slice(6,comm.length));
      sendMsg("Set the staff role for this server to `"+db.sRoles[find('i')]+"`");
      updateDb();
    }
    if(comm.startsWith('noswear')&&admin()){
      db.badWords[find('i')].push(comm.slice(8,comm.length));
      sendMsg("Okay, I have added `"+comm.slice(8,comm.length)+"` to the filter for this server.");
      updateDb();
    }
    if(comm.startsWith('reswear')&&admin()){
      for(var i=0;i<db.badWords[find('i')].length;i++){
        if(comm.slice(8,comm.length).toLowerCase()===db.badWords[find('i')][i]){
          db.badWords[find('i')].splice(i,1);
        }
      }
      sendMsg("Okay, I have removed `"+comm.slice(8,comm.length)+"` from the filter for this server.");
      updateDb();
    }
    if(comm.startsWith('say')&&admin()){
      msg.delete();
      sendMsg(msg.content.slice(5,msg.content.length));
    }
    if(comm.startsWith('censtog')&&admin()){
      db.censor[find('i')]=!db.censor[find('i')];
      sendMsg("Okay, I have set censoring messages to `"+db.censor[find('i')]+"`");
    }
    if(comm.startsWith('whtog')&&admin()){
      db.wh[find('i')]=!db.wh[find('i')];
      sendMsg("I have set custom avatars and usernames to `"+db.wh[find('i')]+"` for this server.");
      if(db.wh[find('i')]){
        sendMsg("Don't see a custom username or avatar? Use "+db.prefixes[find('i')]+"whAva or "+db.prefixes[find('i')]+"whUse to set it up!");
      }
      updateDb();
    }
    if(comm.startsWith('whuse')&&admin()){
      db.whUse[find('i')]=msg.content.slice(7,msg.content.length);
      sendMsg("Okay, I will now use "+msg.content.slice(7,msg.content.length)+" as my custom username.\n\nDon't see it? Try using "+db.prefixes[find('i')]+"whTog to turn on custom usernames!");
      updateDb();
    }
    if(comm.startsWith('whava')&&admin()){
      db.whAva[find('i')]=comm.slice(6,msg.content.length);
      sendMsg("Okay, I will now use "+comm.slice(6,msg.content.length)+" as my custom avatar url.\n\nDon't see it? Make sure the URL is a valid link, preferably `.png`. Try using "+db.prefixes[find('i')]+"whTog to turn on custom avatars!");
      updateDb();
    }
  }
  if(msg.content==="~prefix"){
    sendMsg("My current prefix in this server is `"+db.prefixes[find('i')]+"`");
  }
  //These are the spammers, it's a little broken but not too badly.
  let foundUser=false;
  let notSpam=true;
  for(var i=0;i<db.users.length;i++){
    if(db.users[i]===msg.author.tag){
      foundUser=true;
      for(var j=0;j<extras.chars.length;j++){
        if(!msg.author.bot&&msg.content.includes(extras.chars[j])){
          notSpam=false;
        }
      }
      db.spammers[i].push(msg.content);
      if(db.spammers[i][0]!==msg.content||msg.channel.name==="spam"||msg.channel.name==="music-commands"){
        db.spammers[i]=[];
      }
      if(id!=="810540153294684192"){notSpam=true;}
      if(db.spammers[i].length===6&&!notSpam){
        msg.reply("Please remember to only spam in #spam");
      }
      if(db.spammers[i].length===7&&!notSpam&&msg.guild.id==="810540153294684192"){
        try{let role = msg.guild.roles.cache.find (r => r.name === 'onlyspam');
      msg.member.roles.add(role);
      setTimeout(function(){
          msg.member.roles.remove(role);
       }, 5000);}catch(e){}finally{
          msg.reply("I have moved you to #spam");
        }
      }
    }
  }
  if(!foundUser&&!msg.author.tag.includes("#0000")&&!msg.author.bot){
    db.users.push(msg.author.tag);
    db.spammers.push([]);
  }
  capsT--;
  for(var i=0;i<keyword.length;i++){
    if(keyword[i].timeout!==0){
     keyword[i].timeout--; 
  }
  if(keyword[i].only&&keyword[i].keywords[0].toLowerCase()===msg.content.toLowerCase()&&!msg.author.bot&&msg.author.username!=="KA Monitor"&&keyword[i].timeout===0&&msg.channel.name!=="debate-your-views"&&!msg.author.tag.includes("#0000")){
        sendMsg(keyword[i].response);
        keyword[i].timeout=12;
        //i=keyword.length;
        if(keyword[i].message&&keyword[i].timeout===0){
          msg.author.send(keyword[i].dm);
        }
        console.log("Told "+msg.author.tag+" "+keyword[i].response+" after they said "+msg.content);
      }
      let keyWord=true;
      if(!keyword[i].only){
        for(var j=0;j<keyword[i].keywords.length;j++){
          if(!msg.content.toLowerCase().includes(keyword[i].keywords[j])||msg.author.username==="Kestron-Tron"||msg.author.username==="KA Monitor"||msg.author.tag.includes("#0000")){
            keyWord=false;
          }
        }
        if(keyWord&&keyword[i].timeout===0&&msg.channel.name!=="debate-your-views"){
          sendMsg(keyword[i].response);
          if(keyword[i].message){
            msg.author.send(keyword[i].dm);
          }
          console.log("Told "+msg.author.tag+" "+keyword[i].response+" after they said "+msg.content);
          //i=keyword.length;
          keyword[i].timeout=12;
          console.log(keyword[i].timeout);
        }
      }
    }
  let foundBad=false;
  let bigBad=false;
  let check=msg.content.toLowerCase();
  check=check.replaceAll('*','');
  check=check.replaceAll('\\','');
  check=check.replaceAll('(','c');
  check=check.replaceAll('@','a');
  check=check.replaceAll('5','s');
  check=check.replaceAll('$','s');
  check=check.replaceAll('|','');
  try{
  for(var i =0;i<db.badWords[find('i')].length;i++){
    if(!adminManage&&!msg.author.bot){
      if(check.includes(db.badWords[find('i')][i])){
        foundBad=true;
        theBad=db.badWords[find('i')][i];
        for(var j=0;j<extras.chars.length;j++){
          let test=''+extras.chars[j]+theBad;
          let test2=''+theBad+extras.chars[j];
          if(msg.content.toLowerCase().includes(test)||msg.content.toLowerCase().includes(test2)){
            foundBad=false;
          }
        }
        if(foundBad&&!adminManage){
          console.log("Censored a message from "+msg.author.username+" for "+theBad+"\n"+msg.content);
           /*try{msg.guild.channels.cache.get('928696139191046227').send(msg.author.username+" said: "+msg.content+"\nIt was censored due to the word "+theBad);}catch(e){}*/
            try{
              let channel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === 'logs')
              channel.send(msg.author.username+" said: "+msg.content+"\nIt was censored due to the word "+theBad);
            }
            catch(e){
              
            }
            try{
              let censored=msg.content;
              censored=censored.replace(theBad,' '+theBad);
              censored=censored.replace(new RegExp(theBad, "gi"), $1 => new Array($1.length + 1).join("_"));
              console.log(censored);
              if(true){
                sendMsg("```The following post was censored by Kestron-Tron```\n"+censored,true);
              }
              msg.delete();
            }catch(e){}
        }
      }
    }
  }
  }catch(e){db.badWords.push([])}
  try{
    let srole = msg.guild.roles.cache.find (r => r.name === db.sRoles[find('i')]);
    if(msg.mentions.has(srole)&&!db.staffPings[find('i')]){
      msg.delete();
      let msgW="";
      let delTog=false;
      for(var i=0;i<msg.content.length;i++){
        if(msg.content[i]==="<"){
          delTog=true;
        }
        if(!delTog){
          msgW+=msg.content[i];
        }
        if(msg.content[i]===">"){
          delTog=false;
        }
      }
      sendMsg(msgW,true);
    }
  }
  catch(e){}
});
client.on("messageUpdate",function(oldMsg,msg){
  try{
    id=msg.guild.id;
  }
  catch(e){
    id='0';
  }
  let foundBad=false;
  let bigBad=false;
  let check=msg.content.toLowerCase();
  check=check.replaceAll('.','');
  check=check.replaceAll('*','');
  check=check.replaceAll('\\','');
  check=check.replaceAll('(','c');
  check=check.replaceAll('@','a');
  check=check.replaceAll('5','s');
  check=check.replaceAll('$','s');
  for(var i =0;i<db.badWords[find('i')].length;i++){
    if(!adminManage&&!msg.author.bot){
      if(check.includes(db.badWords[find('i')][i])){
        foundBad=true;
        theBad=db.badWords[find('i')][i];
        let c='abcdefghjklmnopqrstuvwxyz1234567890';
        for(var j=0;j<c.length;j++){
          let test=''+c[j]+theBad;
          let test2=''+theBad+c[j];
          if(msg.content.toLowerCase().includes(test)||msg.content.toLowerCase().includes(test2)){
            foundBad=false;
          }
        }
        if(foundBad){
          console.log("Censored a message from "+msg.author.username+" for "+theBad+"\n"+msg.content);
           /*try{msg.guild.channels.cache.get('928696139191046227').send(msg.author.username+" said: "+msg.content+"\nIt was censored due to the word "+theBad);}catch(e){}*/
          try{
            let channel = interaction.guild.channels.cache.find(channel => channel.name.toLowerCase() === 'logs')
            channel.send(msg.author.username+" said: "+msg.content+"\nIt was censored due to the word "+theBad);
          }
          catch(e){
            console.log(e);
          }
            try{
              let censored=msg.content;
              censored=censored.replace(theBad,' '+theBad);
              censored=censored.replace(new RegExp(theBad, "gi"), $1 => new Array($1.length + 1).join("_"));
              console.log(censored);
              if(db.censor[find('i')]){
                msg.author.send("Please do not try to evade the filter by editing bad words into the message after it's sent.");
                msg.reply("This message has been removed due to editing a banned word into the message after it was posted.");
              }
              msg.delete();
            }catch(e){}
        }
      }
    }
  }
});
client.on("guildCreate",function(guild){
  console.log("I have been added to "+guild.name+" | "+guild.id);
  client.users.cache.get('949401296404905995').send("Added to "+guild.name+" | "+guild.id);
  db.prefixes.push("~");
  db.guilds.push(guild.id);
  db.wh.push(false);
  db.whUse.push("Kestron-Tron");
  db.whAva.push("https://raw.githubusercontent.com/SMOMusic/Kestron-Tron/main/CyberBario.png");
  db.staffPings.push(true);
  db.badWords.push(["afakeword"]);
  db.censor.push(true);
  updateDb();
});/*
client.on("guildDelete",function(guild){
  console.log("I have been removed from "+guild.name+" | "+guild.id);
  id=guild.id;
  db.prefixes.splice(find('i'),1);
  db.guilds.slice(find('i'),1);
  db.wh.slice(find('i'),1);
  db.whUse.slice(find('i'),1);
  db.whAva.slice(find('i'),1);
  db.staffPings.splice(find('i'),1);
  db.badWords.splice(find('i'),1);
  db.censor.splice(find('i'),1);
  db.sRoles.splice(find('i'),1);
  updateDb();
});*/
client.on('messageReactionAdd', (react, use) => {
  //let u=guild.members.get('user ID');
  switch(react._emoji.name){
    case '🇭':
      //let role = msg.guild.roles.cache.find (r => r.name === 'HTML/CSS');
      let u=client.users.cache.find(user=>user.id===user.id)
      u._roles.add('977082216272248843');
    break;
  }
  /*
    🇭
    🇵
    🇨
    🇯
    🐍
  */
  //:regional_indicator_h: :regional_indicator_p: :regional_indicator_c: :regional_indicator_j: :snake: 
});
client.on('interactionCreate', async interaction => {
  //console.log(interaction.guild);
  let comm=interaction.commandName;
  switch(comm.toLowerCase()){
    default:
	    interaction.reply({content:"Command not found. Reported to Kestron#9271",ephemeral:true});
      client.users.cache.get('949401296404905995').send(interaction.user.username+" used "+comm+" and it failed with 404.");
    break;
    case 'ping':
    break;
    case 'smo':
    break;
    case 'nosmo':
    break;
    case 'name':
    	const name = interaction.user.username;
    	interaction.reply({content:"Your name? "+name,ephemeral:true});
    break;
    case 'delete':
      if(interaction.member.permissions.has("MANAGE_MESSAGES")||interaction.user.id==="949401296404905995"){
      	interaction.reply({content:"Deleted message from "+interaction.targetMessage.author.username,ephemeral:true});
        interaction.targetMessage.delete();
        try{
          let channel = interaction.guild.channels.cache.find(channel => channel.name.toLowerCase() === 'logs')
          channel.send(interaction.user.username+" deleted a message from "+interaction.targetMessage.author.username+":\n"+interaction.targetMessage.content);
        }
        catch(e){
          console.log(e);
        }
      }
      else{
        interaction.reply({content:"You can't delete things if you aren't staff!",ephemeral:true});
      }
    break;
  }
});
client.login(token);
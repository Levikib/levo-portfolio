import type { Thought } from "../thoughts";

/** Fan art Levo picked for this post, stored in public/thoughts/one-piece. */
const op = (name: string) => `/thoughts/one-piece/${name}.webp`;

export const onePieceRobin: Thought = {
  slug: "one-piece-robin-enies-lobby",
  title: "I wanted Robin punished. One Piece taught me better.",
  dek: "The Enies Lobby arc, the betrayal that wasn't, and how a cartoon about pirates rewired the way I judge people.",
  topic: "anime",
  date: "2026-10-13",
  minutes: 10,
  status: "published",
  series: { name: "One Piece and me", part: 1 },
  cover: {
    src: op("cover-crew-sunset"),
    alt: "The Straw Hat crew, Robin among them, sitting on a cliff watching their ship sail into a red sun",
    w: 736,
    h: 414,
  },
  body: [
    { t: "note", text: "Spoilers ahead for the Water 7 and Enies Lobby arcs. If you haven't watched them, close this tab, go watch, and come back. I'll wait." },

    { t: "p", text: "Some stories you watch. Some stories watch you back. One Piece is the second kind for me." },
    { t: "p", text: "People hear \"anime\" and picture kids' cartoons. I get it. But a lot of what I believe today about loyalty, about power, about who deserves a second chance, I didn't learn in a classroom or a church or a boardroom. I learned it from a rubber boy in a straw hat and the crew he dragged across the world with him." },
    { t: "p", text: "This is the first post in a series about how One Piece shaped my adulthood and the way I look at the world. It will not be the last. One Piece has been running for over 25 years, and it has a lot more to say. So do I." },
    { t: "p", text: "I'm starting with the arc that changed me the most: the one where Nico Robin betrayed the Straw Hat Pirates." },

    { t: "h", text: "The day I hated Nico Robin" },
    { t: "p", text: "Quick setup. The crew limps into Water 7, a city of shipwrights, to fix the Going Merry. Everything falls apart at once. The Merry is dying. Usopp fights Luffy and walks away from the crew. And in the middle of all that chaos, Robin just leaves. No explanation. Next thing you know, she's seen with masked men who tried to assassinate the mayor, and she looks the crew in the eye and tells them she's done with them." },
    { t: "p", text: "I was furious. Not mildly irritated, furious. This crew had taken her in when she was literally an enemy. Luffy trusted her without a second thought. They had her back every single time. And this is how she pays them back?" },
    { t: "p", text: "I'll be honest with you, because that's the whole point of this page: I wanted something bad to happen to her. I wanted the show to punish her. I was done with Robin." },
    { t: "p", text: "Then I kept watching. And the story did the most uncomfortable thing a story can do. It showed me I had judged someone without knowing a single thing about what she was carrying." },

    { t: "h", text: "What Robin knew" },
    { t: "p", text: "Robin grew up on Ohara, an island of scholars. Their crime? They studied history. Specifically, the Poneglyphs, ancient stones that hold the truth about a hundred years the World Government has erased from every record. That truth is so dangerous to the people in power that reading it is a crime." },
    { t: "p", text: "So the government answered the scholars of Ohara with a Buster Call: a fleet of warships that bombard an island until nothing is left. The library burned. The people burned. Even the evacuation ship full of civilians was sunk to make sure nobody survived." },
    { t: "p", text: "Robin was eight years old. She was the only survivor. And the government put a bounty on her head." },
    {
      t: "image",
      src: op("robin-ohara-wanted"),
      alt: "Nico Robin resting her head on her hand beside a Marine wanted poster with her face, books on Ohara and the Poneglyphs stacked in front of her",
      w: 736,
      h: 1308,
      caption: "Ohara's books, a Poneglyph, and her face on a Marine poster. That was her childhood.",
    },
    { t: "p", text: "Think about that for a second. An eight-year-old girl, alone, hunted by the most powerful institution in the world. For twenty years, every adult who reached a hand out to her was either going to sell her for the bounty or drop her the moment she became inconvenient. She learned one lesson over and over: anyone who protects you dies, or betrays you. So she stopped letting anyone protect her." },
    { t: "p", text: "That is what it looks like to know something so dreadful it eats you alive. Robin wasn't carrying a secret. The secret was carrying her." },

    { t: "h", text: "The betrayal was the rescue" },
    { t: "p", text: "Here's what I didn't know while I was busy hating her. The government agents, CP9, had cornered Robin with a deal. Come with us quietly, and your crew sails away untouched. Refuse, and we call a Buster Call on them. The same fire that took Ohara." },
    { t: "p", text: "She had already watched one home burn because of her. She was not going to watch a second one." },
    { t: "p", text: "So she chose to be the villain in their eyes. She lied to their faces, made them hate her, so they would let her go and live. The thing I was so angry about was the most loyal act anyone in that crew had done. I was watching a sacrifice and calling it a betrayal." },

    { t: "h", text: "Victims of circumstance" },
    { t: "p", text: "That arc gave me words for something I hadn't understood: being a victim of circumstance. Robin didn't wake up one morning and decide to be cold, secretive and impossible to trust. Circumstance built that version of her, one burned bridge at a time. The distance she kept wasn't cruelty. It was survival." },
    { t: "p", text: "Once you see it in a story, you start seeing it in real life. The friend who disappears for months. The relative who snaps at everyone. The colleague who never asks for help even when they're drowning. From where you stand, it looks like they're doing something messed up to you. Most of the time, something messed up is being done to them, and you're just seeing the part that spills over." },
    { t: "p", text: "And then comes the moment that every One Piece fan knows. The crew has fought their way to the government's judicial island, Enies Lobby. Robin is standing on the other side of a gorge, still telling them to go home, still trying to protect them from herself. Luffy tells her he doesn't care what she says. He just needs her to say one thing: that she wants to live." },
    {
      t: "image",
      src: op("crew-at-the-gates"),
      alt: "The Straw Hats standing on the rooftops in front of the Enies Lobby gates, the government flag above them",
      w: 736,
      h: 975,
      caption: "The crew sailed into the government's own fortress for her. No plan, just a promise.",
    },
    { t: "quote", text: "I want to live!", by: "Nico Robin, Enies Lobby" },
    { t: "p", text: "Twenty years of being told she shouldn't exist, and she finally says it out loud. I'm not ashamed to say that one got me." },
    {
      t: "image",
      src: op("robin-want-to-live"),
      alt: "A purple poster of Nico Robin with the words I want to live, take me to the sea with you",
      w: 736,
      h: 1551,
      caption: "Twenty years of hiding, and then four words.",
    },

    { t: "h", text: "Luffy didn't ask why" },
    { t: "p", text: "This is the part that rewired me. Luffy never demanded an explanation before going to get her. He never said \"first tell me why you did it, then I'll decide if you're worth saving.\" He decided she was his friend, and that was enough. The explanation could come later. The rescue could not wait." },
    {
      t: "image",
      src: op("luffy-enies-lobby"),
      alt: "Luffy seen from behind in his straw hat, staring up at the Enies Lobby building",
      w: 736,
      h: 736,
      caption: "Loyalty first, questions later.",
    },
    { t: "p", text: "And he didn't just storm the place. He had Usopp burn the World Government's flag. A declaration of war against the entire world, for one woman who had just told them she didn't want them. That is what showing up for someone looks like when they're at their worst and pushing you away with both hands." },
    { t: "p", text: "Before that arc, I would not have done what Luffy did. If someone betrayed me, the door closed, end of story. I'd have judged first and never asked questions. Watching him made me ask myself an uncomfortable question: how many people had I written off because I only saw what they did, and never what was being done to them?" },

    { t: "h", text: "The ones who were supposed to protect us" },
    { t: "p", text: "There's one more thing this arc refuses to let you look away from. The villains of Enies Lobby aren't pirates. They're the government. CP9 are state agents who murder in the name of justice. The man who runs the operation, Spandam, is a petty official with a lot of power and very little conscience. The Buster Call that erased Ohara wasn't a crime by outlaws. It was official policy." },
    { t: "p", text: "The people who built Robin's cage carried badges. The ones who were meant to protect her were the ones hunting her." },
    { t: "p", text: "I'd be lying if I said that only lives in fiction. Look around the world, Kenya included, and you'll find people who are hurting not because of some outlaw, but because of the very systems and officials meant to keep them safe. One Piece taught me to notice that early. Power that demands you never question it is usually hiding something on a stone somewhere." },

    { t: "h", text: "What changed in me" },
    { t: "p", text: "I didn't walk away from Enies Lobby with a nice quote. I walked away a slightly different person. Here's what stuck:" },
    {
      t: "list",
      items: [
        "Patience before judgement. When someone does something that makes no sense, I now assume I'm missing part of the story, because I usually am.",
        "Ask what they're carrying. Behind a lot of \"bad behaviour\" is fear, shame, or a threat you can't see from where you're standing.",
        "Loyalty is tested when people are at their worst. Anyone can stand with you when you're easy to love. Luffy stood with Robin while she was telling him to leave.",
        "Respect authority, but don't worship it. Badges and titles don't make anyone right. The truth is worth reading, even when someone powerful has made it a crime.",
      ],
    },
    { t: "p", text: "I carry that into everything now. Building a company, working with a team, dealing with clients, family, friends. When someone goes quiet or burns a bridge, my first question isn't \"how dare you.\" It's \"what's chasing you?\" I don't always get it right. But I'm a lot slower to declare someone my enemy than I used to be." },
    {
      t: "image",
      src: op("crew-asleep-on-deck"),
      alt: "The whole crew asleep on the deck of their ship under a full moon, Robin dozing beside an open book",
      w: 736,
      h: 1247,
      caption: "Nakama. Robin asleep on deck, a book by her side, among the people who came for her.",
    },

    { t: "h", text: "This doesn't end here" },
    { t: "p", text: "Robin went from the character I wanted punished to one of my favourite characters in all of fiction. That's the power of a story told with patience, and the lesson I try to live by: you don't know someone's story until you've seen the whole thing." },
    { t: "p", text: "This is part one. There's more One Piece to talk about: Marineford, the Going Merry's last voyage, the arcs that taught me about grief, ambition and what it means to have a dream bigger than you. I'll get to all of them." },
    {
      t: "image",
      src: op("luffy-hand-out"),
      alt: "Luffy grinning and holding his hand out to the viewer while the crew walks down a road toward the sea",
      w: 736,
      h: 1308,
      caption: "There's a lot more sea left. Come along.",
    },
    { t: "p", text: "Which arc changed you? Tell me. My WhatsApp and email are at the bottom of this page, and I read everything." },
  ],
};

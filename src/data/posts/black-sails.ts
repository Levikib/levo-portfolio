import type { Credit, Thought } from "../thoughts";

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;
const un = (name: string, href: string): Credit => ({ name, href, source: "Unsplash" });

export const blackSails: Thought = {
  slug: "black-sails-whose-side-i-am-on",
  title: "Black Sails: I'm on the pirates' side, and I'm not sorry",
  dek: "Flint was right about the world and still a bit of an asshole. Vane is the most misunderstood man in the show. And a cook with one good leg out-thought them all.",
  topic: "films",
  date: "2026-10-13",
  minutes: 11,
  status: "published",
  cover: {
    src: u("photo-1521139869420-edaae1bc7b9a", 1600, 900),
    alt: "A galleon sailing on the open sea",
    w: 1600,
    h: 900,
    credit: un("Vidar Nordli-Mathisen", "https://unsplash.com/photos/galleon-ship-on-sea-zqgOkt7sQlY"),
  },
  body: [
    { t: "note", text: "Full spoilers for all four seasons. If you haven't watched Black Sails, stop here, go watch it, and come back. Season one is slow. Push through. It pays you back with interest." },

    { t: "p", text: "I'm a sucker for pirates. I'll admit that upfront. One Piece got me young, and I've never really recovered. But Black Sails is something else. It isn't a swashbuckling adventure with funny hats. It's a slow, patient, brutal story about power, about who gets to tell history, and about what the world does to people it has already decided are monsters." },
    { t: "p", text: "Quick context if you've never heard of it. Black Sails ran on Starz from 2014 to 2017: four seasons, 38 episodes, created by Jonathan E. Steinberg and Robert Levine. It's a prequel to Treasure Island, Robert Louis Stevenson's 1883 novel, set about twenty years before the book, in the pirate republic of Nassau. Real pirates like Charles Vane, Jack Rackham, Anne Bonny and Blackbeard share the screen with Stevenson's fictional ones, Captain Flint and John Silver." },
    { t: "p", text: "Here's my position, so you know where I'm standing: I'm with the pirates. Not because they're good men. Most of them aren't. But because the show makes you see exactly who decided they were the bad ones, and why." },

    { t: "h", text: "Who gets called a criminal" },
    { t: "p", text: "I won't dwell on this too long, because it's the backdrop, not the story. But you can't talk about Black Sails without it." },
    { t: "p", text: "England in the show is \"civilization.\" It has laws, governors, courts and churches. It also has slavery, the gallows, and a habit of calling anyone who refuses to bend a savage. The pirates steal, kill and burn. England does the same, just with paperwork and a flag." },
    { t: "p", text: "The show never tells you the pirates are heroes. It just quietly asks: when the powerful break the rules, it's policy. When the powerless do it, it's a crime. Who gets to decide which is which?" },
    {
      t: "image",
      src: u("photo-1713139914394-791aa09a06d7", 1600, 1067),
      alt: "A pirate flag flying in the wind on a boat",
      w: 1600,
      h: 1067,
      caption: "One flag means outlaw. The other means empire. Both fly over violence.",
      credit: un("David Trinks", "https://unsplash.com/photos/a-pirate-flag-flying-in-the-wind-on-a-boat-Vw3HyUmikk8"),
    },
    { t: "p", text: "As a Kenyan, that question isn't abstract. The colonial government called the Mau Mau terrorists and banned the movement in 1950, and that ban stayed on Kenya's books until 2003. Today we honour those same fighters on Mashujaa Day. Same people, same acts. What changed was who was holding the pen." },

    { t: "h", text: "Captain Flint: right about the world, wrong about people" },
    { t: "p", text: "Let's start with the man the show is built around. Before he was Flint, he was James McGraw, a lieutenant in the Royal Navy. He fell in love with Thomas Hamilton, a nobleman with a radical idea: pardon the pirates of Nassau, bring them back into society instead of hanging them. For that idea, and for loving the wrong man in the wrong century, England destroyed Thomas and branded McGraw a disgrace." },
    { t: "p", text: "So McGraw died, and Flint was born. And Flint declared war on the entire civilized world." },
    { t: "p", text: "I get it. I really do. Everything he loved was taken by a system that called itself moral. His ambition, a free Nassau that England could never control, comes from a real wound. He's one of the most tragic characters I've ever watched." },
    {
      t: "image",
      src: u("photo-1690824678148-0967d927d68c", 1600, 1067),
      alt: "A large sailing ship alone in the middle of the ocean",
      w: 1600,
      h: 1067,
      caption: "A man at war with the whole world is always, in the end, alone.",
      credit: un("Rafael Garcin", "https://unsplash.com/photos/a-large-sailing-ship-in-the-middle-of-the-ocean-WgHgPLkR-l8"),
    },
    { t: "p", text: "But let's be honest: Flint was also a bit of an asshole." },
    { t: "p", text: "He lies to his crew. He uses people like chess pieces. He kills Gates, his quartermaster and probably his truest friend, with his own hands, to protect his secret. He drags hundreds of men into his personal war and calls it their freedom. Flint is the perfect proof that you can be completely right about how unfair the world is, and still treat the people closest to you like they're disposable." },
    { t: "p", text: "That's what makes him great writing. He isn't a hero or a villain. He's what grief looks like when it gets a ship and a cause." },

    { t: "h", text: "Charles Vane: the most misunderstood man in Nassau" },
    { t: "p", text: "Now. My guy. Charles Vane." },
    { t: "p", text: "On the surface, Vane is the brute. Long hair, short temper, the one who solves problems with a blade. For most of season one, the show lets you think he's just the muscle." },
    { t: "p", text: "Then you learn where he comes from. Vane started life as a slave. As a boy he was held in a logging camp run by a former pirate named Albinus, branded on his chest like property. He escaped, made his way to Nassau with nothing and no one, and Blackbeard took him under his wing. From that nothing, Vane built himself into the captain of one of the most feared crews on the sea. Nobody gave him a title. Nobody gave him a ship. Nobody gave him a name. He took all of it." },
    {
      t: "image",
      src: u("photo-1705034696733-ddcddf20b763", 1600, 1067),
      alt: "A bunch of heavy chains stacked together",
      w: 1600,
      h: 1067,
      caption: "He started in chains. He decided he would never wear them again.",
      credit: un("Seth", "https://unsplash.com/photos/a-bunch-of-chains-that-are-stacked-together-Wltax1jI6cs"),
    },
    { t: "p", text: "Once you know that, everything he does makes sense. His violence, his pride, his refusal to bow to anyone. Vane isn't a man who loves chaos. He's a man who knows exactly what it feels like to be owned, and decided he would rather die than feel it again." },
    { t: "p", text: "And that's exactly what he does. When England finally gets him on the gallows in Nassau, he could have begged. He could have bargained. He doesn't. He walks up there and dies as the one thing they could never make him: obedient. His death turns him into a symbol, and Nassau takes up his fight." },
    { t: "p", text: "In real history, Charles Vane was hanged too, at Gallows Point in Port Royal, Jamaica, on 29 March 1721, and his body was left hanging in chains as a warning. The show gave him the death the history books never bothered to give him: one with meaning." },
    { t: "p", text: "Vane is the purest pirate in Black Sails. Flint fights for an idea. Silver fights for himself. Vane fights for freedom, raw and simple, because he's the only one who has actually lived without it. People call him a savage. I call him the most honest man in the show." },

    { t: "h", text: "John Silver: the cook who became a king" },
    { t: "p", text: "And then there's John Silver. Yes, that Long John Silver, the one-legged cook of Treasure Island." },
    { t: "p", text: "When we meet him, he's nothing. A thief and a liar who talks his way onto Flint's ship by pretending to be a cook, then steals the most valuable piece of paper on board. No loyalty, no cause, no fighting skill. His only plan is to survive and get rich." },
    { t: "p", text: "And somehow, this man rises above all of them." },
    {
      t: "image",
      src: u("photo-1645897938828-3412736da360", 1600, 1067),
      alt: "A candle and a book on a table",
      w: 1600,
      h: 1067,
      caption: "Silver's real weapon was never a sword. It was a story.",
      credit: un("Sixteen Miles Out", "https://unsplash.com/photos/a-candle-and-a-book-on-a-table-smk9EcNiGxE"),
    },
    { t: "p", text: "Silver understands something none of the others fully do: men don't follow the strongest person in the room. They follow the best story. Flint gives the crew a war. Silver gives them a legend, and he makes himself the hero of it. He loses a leg, and instead of becoming weaker, he turns the wound into part of the myth. By the end, the most feared pirate in the Caribbean is a man who can barely fight." },
    { t: "p", text: "He's a bit crazy, honestly. The confidence it takes to talk your way into power with nothing but words, while surrounded by men who kill for a living, is insane. But it's also the most realistic rise in the show. Most power in the real world isn't taken by force. It's taken by the person who controls the narrative." },
    { t: "p", text: "And that's why his ending hits so hard. Silver finally has to choose between the war and the woman he loves, Madi. He chooses Madi. He ends Flint's war to save her, and sends Flint away to a plantation where, he says, Thomas Hamilton is still alive. Whether that's true, the show refuses to tell you. Maybe it's mercy. Maybe it's another one of Silver's stories. Either way, the storyteller gets the last word." },
    { t: "p", text: "If you read my last few posts, you already know which way I lean. I'd choose love over a hundred strangers. Silver chose love over a revolution. I understood him completely, and I hated him a little for it." },

    { t: "h", text: "The story is the real treasure" },
    {
      t: "image",
      src: u("photo-1764042082382-d68eaeaa53f9", 1600, 1067),
      alt: "An old map with a compass and handwritten text",
      w: 1600,
      h: 1067,
      caption: "Treasure Island is the version the winners wrote down.",
      credit: un("Ruth Bourke", "https://unsplash.com/photos/old-map-with-a-compass-and-handwritten-text-DuhuUDhNxS4"),
    },
    { t: "p", text: "Here's the twist that makes Black Sails a masterpiece instead of just a good show. We all know how this story ends, because Treasure Island already told us. Flint dies alone, a villain. Silver is a scheming cook. Pirates are bloodthirsty monsters, and good English boys defeat them." },
    { t: "p", text: "Black Sails takes that \"official\" version and shows you everything it left out. The love. The grief. The slavery. The broken promises of civilization. It argues that history is just the story told by whoever survived, and that the people called monsters usually had reasons the history books never wrote down." },
    { t: "p", text: "That's the same thing One Piece says about Ohara and the Poneglyphs. Maybe that's why I love both. They're stories about stories, and about how much truth gets buried when the powerful hold the pen." },

    { t: "h", text: "Why it stayed with me" },
    {
      t: "list",
      items: [
        "Patience in storytelling. Season one is slow on purpose. Every relationship it builds pays off later. Most shows rush. Black Sails trusts you.",
        "No clean heroes. Every character is right about something and wrong about something else. That's how real people are.",
        "Where you start doesn't decide where you end. A slave became a captain. A thief became a legend. A disgraced officer nearly broke an empire.",
        "Question the label. Before you call anyone a criminal, ask who made the rules and who they were made to protect.",
        "Whoever tells the story shapes the world. So learn to tell yours well.",
      ],
    },
    {
      t: "image",
      src: u("photo-1625508133058-78bc39fbd228", 1600, 1067),
      alt: "A sailing ship on the sea at sunset",
      w: 1600,
      h: 1067,
      caption: "Nassau fell. The legend didn't.",
      credit: un("Raimond Klavins", "https://unsplash.com/photos/brown-sail-ship-on-sea-during-sunset-1suNZRcP3AY"),
    },
    { t: "p", text: "If you haven't watched Black Sails, watch it. If you have, tell me: Flint, Vane or Silver? Whose side were you on? Because I already told you mine. Vane, every single time." },

  ],
};

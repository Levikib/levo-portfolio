import type { Credit, Thought } from "../thoughts";

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;
const un = (name: string, href: string): Credit => ({ name, href, source: "Unsplash" });

export const hundredOrOne: Thought = {
  slug: "a-hundred-strangers-or-the-one-i-love",
  title: "A hundred strangers or the one I love? I'm choosing love.",
  dek: "The classic impossible question, answered honestly. It isn't the most moral answer. It's mine, and I want to explain where it comes from.",
  topic: "life",
  date: "2026-10-13",
  minutes: 7,
  status: "published",
  series: { name: "Impossible questions", part: 1 },
  cover: {
    src: u("photo-1529180979161-06b8b6d6f2be", 1600, 900),
    alt: "A family in silhouette holding hands against a warm orange sky by the sea",
    w: 1600,
    h: 900,
    credit: un("Mike Scheid", "https://unsplash.com/photos/family-in-silhouette-against-orange-sky-0iqkntLw93A"),
  },
  body: [
    { t: "note", text: "This is a thought experiment, the kind people argue about at 2 a.m. or in a philosophy class. Nobody is getting hurt here. It's about what you value when everything is stripped away." },
    { t: "p", text: "You've heard the question. Maybe someone asked you at a party, maybe you saw it on a TikTok with dramatic music behind it." },
    { t: "p", text: "Would you sacrifice a hundred strangers to save someone you love? Or would you sacrifice the person you love to save those hundred strangers?" },
    { t: "p", text: "Most people dodge it. They say \"I'd find a third option,\" or \"that would never happen.\" Fair. But I'll answer it straight, because that's what this page is for." },
    { t: "p", text: "I'd choose my loved one. Every time." },
    {
      t: "image",
      src: u("photo-1622504789958-449b1f7a12c0", 1600, 1067),
      alt: "Railway tracks running through a green field",
      w: 1600,
      h: 1067,
      caption: "Philosophers have been arguing about two sets of tracks since 1967.",
      credit: un("Ben Garratt", "https://unsplash.com/photos/brown-train-rail-near-green-grass-field-during-daytime-TcrkAz1yYPI"),
    },

    { t: "h", text: "The question has a long history" },
    { t: "p", text: "This is a cousin of the famous trolley problem. The philosopher Philippa Foot introduced the dilemma in 1967, and Judith Jarvis Thomson gave it the name in the 1970s: a runaway trolley, five people on one track, one person on the other, and your hand on the lever." },
    { t: "p", text: "The maths answer is easy. A hundred lives are worth more than one. Saving the most people is the \"right\" thing to do. Philosophers in the utilitarian tradition would tell you that and mean it." },
    { t: "p", text: "In 2018, researchers at MIT published the results of the Moral Machine experiment, which collected around 40 million decisions from people in 233 countries and territories about who a self-driving car should save. One of the strongest patterns everywhere: people prefer to save more lives over fewer." },
    { t: "p", text: "But notice something. In those puzzles, everyone on the tracks is a stranger. Change one thing, put your mother, your child, your best friend on that track, and the maths stops feeling like the answer." },

    { t: "h", text: "Why I'd choose love" },
    { t: "p", text: "The honest answer is fear. There is nothing I dread more than loss." },
    { t: "p", text: "I know what love costs. Love hurts. Caring about someone means handing them a piece of you that can be taken away, and the thought of that piece being ripped out is the one thing I genuinely can't make peace with." },
    {
      t: "image",
      src: u("photo-1582137923896-678895517c00", 1600, 1067),
      alt: "A man holding a child in a grey hoodie",
      w: 1600,
      h: 1067,
      caption: "Some people are not a number. They're the whole equation.",
      credit: un("Nathan Dumlao", "https://unsplash.com/photos/man-in-black-t-shirt-holding-child-in-gray-hoodie-x-I4fs7i3WI"),
    },
    { t: "p", text: "My people mean the world to me. Not in a greeting-card way. In the way that there is genuinely no length I wouldn't go to for them. If the universe put me at that lever, I already know which way my hand would move, and I wouldn't need long to think about it." },
    { t: "p", text: "There's a philosopher, Bernard Williams, who made a point I love. If a man has to choose between saving his wife or a stranger, and he first stops to check whether morality allows him to save his wife, he's had \"one thought too many.\" Some loves aren't supposed to be calculated. They're supposed to be obvious." },
    { t: "p", text: "That's how it feels for me. If I had to run the numbers before choosing my own family, something in me would already be broken." },

    { t: "h", text: "Yes, I know it's selfish" },
    { t: "p", text: "I'm not going to pretend this is the noble answer. It isn't. It's probably not the most moral thing to do, and I'd lose that debate in most philosophy classes." },
    {
      t: "image",
      src: u("photo-1573358695783-005699a7fc94", 1600, 1067),
      alt: "A dense crowd of people walking along a busy city street",
      w: 1600,
      h: 1067,
      caption: "Every one of these strangers is somebody's whole world.",
      credit: un("Owen Cannon", "https://unsplash.com/photos/crowd-of-people-on-city-street-6TLCSMj8zgE"),
    },
    { t: "p", text: "And here's the part that keeps me humble. Those hundred strangers aren't really strangers. Each of them is someone's mother, someone's child, someone's best friend. A hundred families would make the opposite choice about their person, for exactly the same reason I'd make mine. If everyone thinks like me, the world gets very dark very fast. That's the strongest argument against me, and I don't have a clean answer to it." },
    { t: "p", text: "Funny enough, it also connects to my One Piece post. Robin chose the opposite of me. She gave herself up so the people she loved could live. Luffy then chose like me: he declared war on the whole world for one friend. Maybe the story is telling us both answers come from the same place. Love that refuses to let go." },

    { t: "h", text: "What the answer says about me" },
    { t: "p", text: "Thought experiments aren't really about trolleys. They're mirrors. My answer says a few true things about me:" },
    {
      t: "list",
      items: [
        "Loss is my biggest fear. I'm brave about most things, but not that.",
        "My loyalty is close and fierce. I don't love a lot of people, but the ones I love, I love completely.",
        "I'd rather be honest than look good. The noble answer is easy to say. I'd rather tell you the true one.",
        "I'm not the hero in every story. Sometimes I'm just a person who wants to keep his people safe.",
      ],
    },
    {
      t: "image",
      src: u("photo-1760934582750-a2ad3396e319", 1600, 1067),
      alt: "Two baby hands clasped together in black and white",
      w: 1600,
      h: 1067,
      caption: "Hold on to your people.",
      credit: un("Jessica Donnelly", "https://unsplash.com/photos/two-baby-hands-clasped-together-in-black-and-white-l0qkreOoAec"),
    },
    { t: "p", text: "The good news is nobody will ever actually stand at that lever. But the question still teaches something useful: if they mean that much, show it now. Call them. Visit. Say it out loud. Don't wait for an impossible choice to find out how much someone matters." },
    { t: "p", text: "So, your turn. A hundred strangers, or the one you love? Be honest. Nobody's watching." },

  ],
};

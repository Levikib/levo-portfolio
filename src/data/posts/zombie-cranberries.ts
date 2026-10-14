import type { Thought } from "../thoughts";

/** Art and photos Levo picked for this post, stored in public/thoughts/zombie. */
const z = (name: string) => `/thoughts/zombie/${name}.webp`;

export const zombieCranberries: Thought = {
  slug: "my-personality-is-zombie-by-the-cranberries",
  title: "If my personality were a song, it would be Zombie by The Cranberries",
  dek: "Starts calm, ends in a scream. An Irish song about two dead children that sounds like it was written about Kenya. Weirdly, it's also me.",
  topic: "2am",
  date: "2026-10-13",
  minutes: 8,
  status: "published",
  cover: {
    src: z("cover-sheet-music"),
    alt: "A pen drawing of Dolores O'Riordan singing into an old microphone, drawn over the sheet music for Zombie",
    w: 720,
    h: 405,
  },
  body: [
    { t: "p", text: "This is one of those thoughts that shows up at 2 a.m. and refuses to leave." },
    { t: "p", text: "If my personality were a song, it wouldn't be a love song. It wouldn't be Gengetone, Bongo or a Sunday worship song either, even though I'll happily play all three. It would be Zombie by The Cranberries." },
    { t: "p", text: "Yes, that one. The one you've heard in a matatu, at a bar on a Friday night, or blasting from some uncle's car with the windows down. The guitars sound like a building falling, and Dolores O'Riordan's voice cracks like it's about to break in half. Stay with me, there's a reason." },
    {
      t: "image",
      src: z("dolores-live"),
      alt: "Dolores O'Riordan singing into a microphone on stage while playing an electric guitar",
      w: 600,
      h: 900,
      caption: "Dolores O'Riordan. One voice, soft and savage at the same time.",
    },

    { t: "h", text: "What the song is actually about" },
    { t: "p", text: "Most of us sing along without knowing the story. Zombie is not a horror song. It's a protest song, and it was born out of grief." },
    { t: "p", text: "Ireland had its own long fight, the one they call the Troubles. On 20 March 1993, two IRA bombs went off on a busy shopping street in Warrington, England. Two children died: Johnathan Ball, who was three, and Tim Parry, who was twelve. They were just out shopping with family. Dolores, an Irish woman from Limerick, was heartbroken that this was being done in the name of her own country, so she wrote Zombie." },
    {
      t: "image",
      src: z("zombie-single"),
      alt: "The Zombie single cover: the four members of The Cranberries in black and white",
      w: 500,
      h: 500,
      caption: "The Cranberries, 1994. Four young people from Limerick with something to say.",
    },
    { t: "p", text: "The song came out on 19 September 1994. The video was shot in Belfast, a city split by that same fight, and the BBC banned it for its violent images. In April 2020 it passed one billion views on YouTube, the first song by an Irish band to get there." },
    {
      t: "image",
      src: z("video-gold-cross"),
      alt: "A still from the Zombie video: Dolores painted gold, standing in front of a large cross with boys painted silver sitting at her feet",
      w: 320,
      h: 566,
      caption: "From the video: Dolores in gold before a cross, boys painted silver at her feet.",
    },
    { t: "p", text: "The \"zombie\" in the title is not a monster. It's what violence turns people into. People fighting a war that started before they were born, for reasons they can barely explain, while children pay the price. People who have gone numb. Alive, but not really living." },
    {
      t: "image",
      src: z("soldier-poppy"),
      alt: "An ink drawing of a young soldier standing in a ruined field of barbed wire and smoke, holding a single red poppy",
      w: 736,
      h: 1040,
      caption: "Old fights. Young graves.",
    },

    { t: "h", text: "Now bring it home" },
    { t: "p", text: "Here's the thing. You don't need to know anything about Ireland to understand this song. If you're Kenyan, you've lived it." },
    { t: "p", text: "Remember 2007 and 2008. After the election, neighbours who had shared ugali, school fees and weddings for years turned on each other because of tribe. More than a thousand Kenyans were killed and hundreds of thousands were chased from their homes. On 1 January 2008, at a church in Kiambaa near Eldoret, people who had run there for safety were locked in and burned. Twenty eight died, most of them women and children. A church. On New Year's Day." },
    { t: "p", text: "That is exactly what Dolores was screaming about. Ordinary people, doing violence for a fight they didn't start, in the name of \"our people\", and the ones who pay are kids who had nothing to do with it." },
    {
      t: "image",
      src: z("hands-pulling-down"),
      alt: "A charcoal drawing of one hand reaching upward while many other hands grab its arm and pull it down",
      w: 736,
      h: 1104,
      caption: "Same mtaa, same church, pulling each other down.",
    },
    { t: "p", text: "And it didn't stop there. Westgate in 2013: people out shopping on a Saturday, just like Warrington, and 67 of them never went home. Garissa University in 2015: 147 people killed, most of them students who had gone there to build a future. Every time, the people who paid were the ones who had the least to do with the fight." },
    { t: "p", text: "Then June 2024. Young Kenyans, my generation, filled the streets over the Finance Bill. No tribe, no party, just people who were tired. Some of them never came home. Rex Masai was shot dead in Nairobi CBD on 20 June. He was 29. When I think of Johnathan and Tim in that song, I think of Rex too." },

    { t: "h", text: "So why is this me?" },
    { t: "p", text: "Five reasons. Maybe six. It's 2 a.m., I'm not counting." },

    { t: "h", text: "1. Quiet, then very loud" },
    { t: "p", text: "Zombie starts soft. A few guitar notes, a calm voice. Then the chorus hits and everything explodes." },
    { t: "p", text: "That's my temperament in one song. Most days I'm calm. I listen, I'm polite, I take a lot in. But when something is wrong, really wrong, I go straight to full volume. No warm-up, no middle setting. You'll know exactly where I stand." },

    { t: "h", text: "2. Angry at the right things" },
    { t: "p", text: "What I love most about Zombie is who it's angry at. Not a tribe. Not a team. It's angry at violence itself, and at whoever keeps feeding it while children end up in the ground." },
    { t: "p", text: "That's the anger I carry. I don't get angry at people for being Luo, Kikuyu, Kalenjin, Luhya, Kamba or anything else. Kila mtu ni mtu. I get angry when politicians use our differences to set us on fire every five years, then shake hands on TV when it's over, while the families in the camps are still waiting. If you've read my One Piece post, you know this is my thing: people with power hurting people with none." },

    { t: "h", text: "3. Calling out your own side" },
    { t: "p", text: "Here's the brave part people miss. Dolores was Irish, writing about violence done in the name of an Irish cause. She didn't say \"our side is right, theirs is wrong.\" She said this is wrong, full stop, even when it's done in our name." },
    { t: "p", text: "In Kenya that's the hardest thing to do. Calling out the other tribe's leader is easy. Calling out your own, the one your family votes for, the one from \"home\", that's where most of us go quiet. I try not to. Loyalty doesn't mean pretending your side never does anything wrong. Sometimes it means being the one who says it out loud." },

    { t: "h", text: "4. Refusing to be a zombie" },
    { t: "p", text: "The whole song is a warning about going numb. About people who have stopped thinking for themselves and just do what they're told." },
    { t: "p", text: "We saw where that ends in Shakahola. More than 400 people, many of them children, died because they handed their minds to one man and stopped asking questions. That's the scariest kind of zombie, the one who still walks and talks but has given away the steering wheel." },
    {
      t: "image",
      src: z("in-your-head"),
      alt: "A stencil-style portrait of Dolores O'Riordan holding a microphone, with the words In Your Head",
      w: 630,
      h: 630,
      caption: "Every war, every cult, every tribal clash starts as an idea someone let move in.",
    },
    { t: "p", text: "My biggest fear isn't failing. It's getting comfortable with things that should never feel normal. Getting used to corruption. Getting used to \"that's just how Kenya is.\" Getting used to a life that's just going through the motions. Building Makeja, writing this page, speaking up when it would be easier to just scroll: that's me refusing to become a zombie." },

    { t: "h", text: "5. Turning pain into something that lasts" },
    { t: "p", text: "Dolores took the worst news of 1993 and turned it into something people are still singing more than thirty years later. In 1998 the band played at the Nobel Peace Prize concert for the leaders of the Northern Ireland peace deal. A song born from a bombing, played at a celebration of peace." },
    { t: "p", text: "That's what I try to do with the hard stuff in my own life. Don't waste it. Turn it into something useful: a product, a lesson, a post like this one. Pain will come either way. You might as well build something with it." },

    { t: "h", text: "6. Not polished, just real" },
    { t: "p", text: "Dolores's voice in Zombie is not pretty. It cracks, it yodels, it breaks. That's exactly why it works. You believe her." },
    { t: "p", text: "I'm not very polished either. I speak my mind, sometimes too loudly, sometimes too soon. But I'd rather be real and a bit rough around the edges than smooth and empty." },

    { t: "h", text: "The softer side of the song" },
    { t: "p", text: "Under all that noise, Zombie is really a song about caring. You don't scream like that about something you don't love. Dolores was screaming because two kids she never met mattered to her." },
    { t: "p", text: "She died in January 2018. She had agreed to sing on a new version of Zombie with the American band Bad Wolves, and never got to. They released it anyway, as a tribute. The song outlived the singer, and the message outlived both." },
    { t: "p", text: "So this one is for Johnathan and Tim. For the families of Kiambaa, Westgate and Garissa. For Rex and every young person who went out to march and didn't come back. And for every Kenyan who refuses to go numb." },
    { t: "p", text: "Loud when it matters, angry at the right things, allergic to going numb, and soft underneath all of it. That's the song. That's me." },
    { t: "p", text: "Go play it loud tonight. Then tell me: if your personality were a song, what would it be?" },
  ],
};

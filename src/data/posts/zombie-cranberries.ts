import type { Credit, Thought } from "../thoughts";

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;
const un = (name: string, href: string): Credit => ({ name, href, source: "Unsplash" });

export const zombieCranberries: Thought = {
  slug: "my-personality-is-zombie-by-the-cranberries",
  title: "If my personality were a song, it would be Zombie by The Cranberries",
  dek: "Starts calm, ends in a scream. A song about grief, anger and refusing to go numb. Weirdly, that's me.",
  topic: "2am",
  date: "2026-10-13",
  minutes: 7,
  status: "published",
  cover: {
    src: u("photo-1510731491328-7363eecd7b2d", 1600, 900),
    alt: "Silhouette of a woman holding a microphone on a dark stage",
    w: 1600,
    h: 900,
    credit: un("Markus Spiske", "https://unsplash.com/photos/silhoutte-of-woman-holding-microphone-i2hfu0fcfus"),
  },
  body: [
    { t: "p", text: "This is one of those thoughts that shows up at 2 a.m. and refuses to leave." },
    { t: "p", text: "If my personality were a song, it wouldn't be a love song. It wouldn't be an Afrobeats banger or a gospel classic either, even though I'll happily play all three. It would be Zombie by The Cranberries." },
    { t: "p", text: "Yes, that one. The one with the guitars that sound like a building collapsing, and Dolores O'Riordan's voice cracking like it's about to break in half. Stay with me, there's a reason." },
    {
      t: "image",
      src: u("photo-1644365978029-d14ed81d8aa5", 1600, 1067),
      alt: "A black audio cassette tape on a white background",
      w: 1600,
      h: 1067,
      caption: "1994. Some songs are older than the people who need them most.",
      credit: un("Etienne Girardet", "https://unsplash.com/photos/black-tdk-audio-cassette-tape-WWVnwP4D-N0"),
    },

    { t: "h", text: "What the song is actually about" },
    { t: "p", text: "A lot of people sing along to Zombie without knowing what it is. It's not a horror song. It's a protest song, and it was born out of grief." },
    { t: "p", text: "On 20 March 1993, two IRA bombs went off on a shopping street in Warrington, England. Two children were killed: three-year-old Johnathan Ball and twelve-year-old Tim Parry. Dozens more were hurt. Dolores, an Irish woman from Limerick, wrote Zombie about it, on her own, during a break from touring." },
    { t: "p", text: "The song was released on 19 September 1994 as the lead single from the album No Need to Argue. The video, shot in Belfast during the Troubles by Samuel Bayer (the same man who directed Smells Like Teen Spirit), was banned by the BBC at the time. In April 2020 it crossed one billion views on YouTube, the first song by an Irish band ever to do it." },
    { t: "p", text: "The \"zombie\" in the title is not a monster. It's what violence turns people into: people repeating a fight that started long before them, for reasons they barely understand, while innocent people pay for it. People who have gone numb. People who are alive, but not really living." },
    {
      t: "image",
      src: u("photo-1596456216777-aeed14d20e83", 1600, 1067),
      alt: "People walking on a street in Belfast",
      w: 1600,
      h: 1067,
      caption: "Belfast today. The video was shot on streets like these in the middle of the Troubles.",
      credit: un("K. Mitch Hodge", "https://unsplash.com/photos/people-walking-on-street-near-building-during-daytime-hw0vL2Eg_Xk"),
    },

    { t: "h", text: "So why is this me?" },
    { t: "p", text: "Five reasons. Maybe six. It's 2 a.m., I'm not counting." },

    { t: "h", text: "1. Quiet, then very loud" },
    { t: "p", text: "Zombie opens soft. A few guitar notes, a calm voice. Then the chorus hits and the whole thing explodes into distortion and that raw, howling voice." },
    { t: "p", text: "That's my temperament in one song. Most days I'm calm. I listen, I'm polite, I take a lot in. But when something is wrong, really wrong, I go to full volume. No warm-up, no middle setting. You'll know exactly where I stand." },
    {
      t: "image",
      src: u("photo-1601266289415-e7339a97d19b", 1600, 1067),
      alt: "A white electric guitar resting on a blue amplifier",
      w: 1600,
      h: 1067,
      caption: "Calm until the distortion pedal goes down.",
      credit: un("Bernie Almanzar", "https://unsplash.com/photos/white-electric-guitar-on-blue-guitar-amplifier-cCyojGPS8eQ"),
    },

    { t: "h", text: "2. Angry at the right things" },
    { t: "p", text: "What I love most about Zombie is who it's angry at. It's not angry at a tribe or a team. It's angry at violence itself, and at whoever keeps feeding it while children end up in the ground." },
    { t: "p", text: "That's the anger I carry. If you've read my One Piece post, you know what moves me: people with power hurting people with none. If you've read my Kenya post, you know I can't stay quiet when the people meant to protect us are the problem. I don't get angry at people for being different from me. I get angry when the innocent pay for someone else's war." },

    { t: "h", text: "3. Calling out your own side" },
    { t: "p", text: "Here's the brave part people miss. Dolores was Irish, writing about violence carried out in the name of an Irish cause. She didn't say \"our side is right, theirs is wrong.\" She said this is wrong, full stop, even when it's done in our name." },
    { t: "p", text: "That takes guts, and I try to live by it. I'll call out my own country's leaders, my own industry, my own people, and yes, myself. Loyalty doesn't mean pretending your side never does anything wrong. Sometimes it means being the one who says it out loud." },

    { t: "h", text: "4. Refusing to be a zombie" },
    { t: "p", text: "The whole song is a warning about going numb. About people who've stopped feeling, stopped questioning, and just keep doing what they're told." },
    { t: "p", text: "My biggest fear isn't failing. It's getting comfortable with things that should never be comfortable. Getting used to corruption. Getting used to broken systems. Getting used to a life that's just going through the motions. Building Makeja, writing this page, speaking up when it would be easier to scroll past: that's me refusing to become a zombie." },
    {
      t: "image",
      src: u("photo-1510133744874-096621a0e01e", 1600, 1067),
      alt: "A person wearing headphones in a dark room, looking out at water through a window",
      w: 1600,
      h: 1067,
      caption: "2 a.m., headphones on, chorus on repeat.",
      credit: un("Reynier Carl", "https://unsplash.com/photos/tilt-shift-lens-photography-of-person-wearing-headphones-facing-body-of-water-through-window-of-a-dark-room-wf0c0d-h2fE"),
    },

    { t: "h", text: "5. Turning pain into something that lasts" },
    { t: "p", text: "Dolores took the worst news of 1993 and turned it into something people are still singing more than thirty years later. In 1998 the band even played it at the Nobel Peace Prize ceremony honouring the leaders of the Northern Ireland peace deal. A song born from a bombing, played at a celebration of peace." },
    { t: "p", text: "That's what I try to do with the hard stuff in my own life. Don't waste it. Turn it into something useful: a product, a lesson, a post like this one. Pain is going to come either way. You might as well build something with it." },

    { t: "h", text: "6. Not polished, just real" },
    { t: "p", text: "Dolores's voice in Zombie is not pretty. It cracks, it yodels, it breaks. That's exactly why it works. You believe her." },
    { t: "p", text: "I'm not very polished either. I speak my mind, sometimes too loudly, sometimes too soon. But I'd rather be real and a bit rough around the edges than smooth and empty." },
    {
      t: "image",
      src: u("photo-1476900164809-ff19b8ae5968", 1600, 1067),
      alt: "Lit candles seen from a low angle",
      w: 1600,
      h: 1067,
      caption: "For Johnathan and Tim, and everyone else who paid for a war they never chose.",
      credit: un("Mike Labrum", "https://unsplash.com/photos/low-angle-photo-of-lightened-candles-fvl4b1gjpbk"),
    },

    { t: "h", text: "The softer side of the song" },
    { t: "p", text: "Under all that noise, Zombie is really a song about caring. You don't scream like that about something you don't love. Dolores was screaming because two kids she never met mattered to her." },
    { t: "p", text: "She passed away in January 2018. She had agreed to sing on a new version of Zombie with the American band Bad Wolves, and never got to. They released it anyway, as a tribute. Somehow that feels right: the song outlived the singer, and the message outlived both." },
    { t: "p", text: "So yes. Loud when it matters, angry at the right things, allergic to going numb, and soft underneath all of it. That's the song. That's me." },
    {
      t: "image",
      src: u("photo-1453090927415-5f45085b65c0", 1600, 1067),
      alt: "A microphone on a foggy stage",
      w: 1600,
      h: 1067,
      credit: un("Oscar Keys", "https://unsplash.com/photos/photo-of-microphone-on-foggy-stage-ojVMh1QTVGY"),
    },
    { t: "p", text: "Go play it loud tonight. Then tell me: if your personality were a song, what would it be?" },

  ],
};

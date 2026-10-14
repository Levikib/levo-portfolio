import type { Thought } from "../thoughts";

/** Art Levo picked for this post, stored in public/thoughts/memories. */
const m = (name: string) => `/thoughts/memories/${name}.webp`;

export const memories: Thought = {
  slug: "lose-every-memory-or-never-make-a-new-one",
  title: "Lose every memory, or never make a new one?",
  dek: "The question that stopped me mid-sentence. I'd give up my past to keep my future, and I'm still not fully okay with that answer.",
  topic: "life",
  date: "2026-10-13",
  minutes: 7,
  status: "published",
  series: { name: "Impossible questions", part: 2 },
  cover: {
    src: m("cover-screens"),
    alt: "A lone figure in fog facing a wall of old glowing television screens",
    w: 736,
    h: 414,
  },
  body: [
    { t: "p", text: "Would you rather lose all your memories, or lose the ability to make new ones?" },
    { t: "p", text: "Damn." },
    { t: "p", text: "I've been asked a lot of these \"would you rather\" questions, and most of them I answer in two seconds. This one stopped me mid-sentence. Because both options are terrible, and both of them take something that feels like the core of who you are." },
    { t: "p", text: "After thinking about it far longer than I'd like to admit, here's my answer: I'd keep the ability to make new memories, even if it meant losing every old one." },
    { t: "p", text: "Let me explain, and let me also be honest about why it still messes with me." },

    { t: "h", text: "This isn't just a hypothetical" },
    { t: "p", text: "Both versions of this question have happened to real people." },
    { t: "p", text: "In 1953, a young American man named Henry Molaison had brain surgery to stop severe seizures. Surgeons removed parts of both temporal lobes, including the hippocampus. The seizures improved. But from that day until he died in 2008, at 82, he could almost never form a new long-term memory. Every day, the people around him were strangers again. Science knew him for decades only as \"Patient H.M.\"" },
    { t: "p", text: "Here's the twist that blew my mind. Researchers taught Henry to trace a star while looking only at its reflection in a mirror. Each day he got better at it, even though he had no memory of ever having done it before. His hands remembered what his mind couldn't." },
    {
      t: "image",
      src: m("frozen-in-the-crowd"),
      alt: "A man standing still in a misty square while blurred crowds rush past him on both sides",
      w: 736,
      h: 1104,
      caption: "Everyone else kept moving. Henry stayed in 1953.",
    },
    { t: "p", text: "Then there's Clive Wearing, a British conductor and musician. In 1985 a viral brain infection wiped out most of his past and left him with a memory that lasts somewhere between seven and thirty seconds. He constantly feels like he has just woken up." },
    { t: "p", text: "And yet two things survived. He still loves his wife Deborah, and greets her with pure joy every time she walks in, as if they haven't seen each other in years, even if she just stepped out of the room. And he can still sit at a piano and play beautifully." },
    {
      t: "image",
      src: m("room-inside-the-head"),
      alt: "A painted head resting on a hand, with a hole in it revealing a grand room where a small figure stands in a lit doorway",
      w: 736,
      h: 959,
      caption: "Somewhere deeper than memory, someone is still home.",
    },
    { t: "p", text: "Movies have played with both sides too. Memento and 50 First Dates are about people who can't make new memories. Eternal Sunshine of the Spotless Mind is about people who choose to erase old ones. We keep telling this story because we're all secretly scared of it." },

    { t: "h", text: "Why I'd let go of the past" },
    { t: "p", text: "First, a genuine observation, not a flex: at this point in my life, I don't feel like I've lost that much. I'm young enough that most of my story is still unwritten. If I had to bet on where the best memories are, I'd bet on the ones I haven't made yet." },
    { t: "p", text: "Second, losing the ability to make new memories feels like a different kind of death. You'd be frozen. Every new friend, a stranger tomorrow. Every lesson, gone by morning. Every win, every product you ship, every person you fall in love with, erased before you can hold on to it. You'd be alive, but you'd stop growing." },
    { t: "p", text: "Choosing new memories means choosing to keep moving. It means I'm not afraid of change, and I'm not afraid of starting over. I'd rather walk into the unknown with an empty album than sit forever with a full one I can never add to." },
    {
      t: "image",
      src: m("running-into-the-spiral"),
      alt: "A silhouette running into a swirling tunnel",
      w: 474,
      h: 710,
      caption: "I'd run into the unknown before I'd stand still forever.",
    },

    { t: "h", text: "Why it still messes with me" },
    { t: "p", text: "But I can't pretend this is a clean answer. Losing my memories would mean losing a huge part of me." },
    { t: "p", text: "My memories built my perspective. The struggles I came through, the lessons I learned the hard way, the people who shaped me, the stories that changed how I see the world (I wrote a whole post about one arc of One Piece, for crying out loud). Without them, would I still be me? Or just someone with my face and my name?" },
    {
      t: "image",
      src: m("missing-pieces"),
      alt: "A hooded man sitting on the floor with his head in his hand, his body made of jigsaw pieces with some missing, holding one piece",
      w: 675,
      h: 1200,
      caption: "Take the memories away and what's left? I honestly don't know.",
    },
    { t: "p", text: "And there's a contradiction I have to own. In my last post, I said the thing I dread most is loss. And here I am, choosing to lose everything I've ever lived. That's messed up. I don't fully know how to sit with it." },
    { t: "p", text: "Maybe here's how they fit together. When I said I fear loss, I meant losing people. And if Clive Wearing's story teaches anything, it's that love can survive even when memory doesn't. He forgot almost everything, but not how he feels about Deborah. Henry forgot every day, but his hands kept learning." },
    { t: "p", text: "So maybe we're not only our memories. Maybe some part of us, our character, our instincts, the way we love, lives somewhere deeper. If that's true, I could lose my past and still be recognisably me. And I'd still be able to love new people and make new mistakes and learn new lessons. That's the bet I'm making." },
    {
      t: "image",
      src: m("who-am-i"),
      alt: "A glowing blue figure among dark silhouettes, with the words who I am scribbled over its head",
      w: 736,
      h: 736,
      caption: "Strip the memories away and something still glows.",
    },

    { t: "h", text: "What I'm taking from it" },
    {
      t: "list",
      items: [
        "Write things down. Journal, take photos, record voice notes. Our memories are more fragile than we think.",
        "Stop living only in the past. Good or bad, it's already happened. The next memory is the only one you can still shape.",
        "Make memories worth keeping. If tomorrow's memories are what I'd fight for, then I should spend today making good ones.",
        "Love deeply. It might be the one thing that survives everything.",
      ],
    },
    { t: "p", text: "I'm still not fully at peace with my answer, and maybe that's the point of a question like this. It's not supposed to be easy. It's supposed to show you what you're holding on to." },
    { t: "p", text: "Your turn: your past, or your future? Be honest." },

  ],
};

// ---------------------------------------------------------------------------
// EDIT ME: all real content for the site lives in this file.
// Swap in your real projects, links, and copy — everything else just renders it.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Sunil Karki',
  initials: 'SK',
  roles: ['DevOps Engineer', 'Cloud Engineer', 'AWS-Certified Professional', 'Problem Solver'],
  tagline:
    'AWS-certified DevOps engineer who designs, deploys, and automates reliable cloud infrastructure — using Jenkins, Git, and CI/CD pipelines to ship solutions that hold up in production.',
  location: 'Based in — add your city', // TODO: not on your resume, add if you want it shown
  resumeUrl: '/resume.pdf',
  email: 'karkisunil1200@gmail.com',
  social: {
    github: 'https://github.com/your-username', // TODO: add your GitHub URL
    linkedin: 'https://linkedin.com/in/your-username', // TODO: your resume links "LinkedIn" but the URL wasn't extractable from the PDF text — paste it here
    twitter: 'https://x.com/your-username', // TODO: optional, remove if unused
  },
};

export const about = {
  paragraphs: [
    "I'm a certified AWS professional with hands-on experience designing, deploying, and maintaining solutions on AWS cloud. I'm skilled in DevOps tools including Jenkins, Git, and Ant Scripts for deployment automation, with a strong foundation in UNIX, SQL, and Java and a solid understanding of the ITIL framework.",
    "I'm known for strong problem-solving skills and the ability to troubleshoot complex issues in a cloud environment — holding six certifications across AWS architecture, development, and operations, plus HashiCorp's Terraform Associate.",
  ],
  // Years of experience is estimated from your resume's earliest listed
  // start date (Oct 2020) — update if it's no longer accurate.
  stats: [
    { label: 'Years of experience', value: 4, suffix: '+' },
    { label: 'Certifications earned', value: 6, suffix: '' },
    { label: 'Technologies used', value: 20, suffix: '+' },
    { label: 'Cups of coffee', value: 999, suffix: '+' },
  ],
};

export const skills = [
  {
    category: 'Cloud Technologies',
    items: ['AWS EC2', 'S3', 'EBS', 'ELB', 'Auto Scaling', 'VPC'],
  },
  {
    category: 'DevOps Tools',
    items: ['Jenkins', 'Git', 'Ant Scripts', 'Cypress', 'CI/CD'],
  },
  {
    category: 'Languages & Databases',
    items: ['Java', 'SQL', 'Oracle', 'React', 'TypeScript', 'Redux', 'HTML', 'CSS'],
  },
  {
    category: 'Tools & Practices',
    items: ['UNIX', 'Autosys', 'ServiceNow', 'ITIL Framework', 'Incident & Change Mgmt'],
  },
];

// TODO: only PickleMatch is real right now — the other two placeholder
// projects were removed until there's real content for them. Copy the
// PickleMatch entry below as a starting shape when you add the next one.
// `image` accepts any URL, or leave it out to fall back to a gradient tile
// with the project's initials. A project with a `slug` gets its own detail
// page at /projects/<slug> (see src/pages/ProjectDetail.jsx) and its card
// becomes clickable; add `slug`, `longDescription`, and `features` to any
// other project you want the same treatment for.
export const projects = [
  {
    title: 'PickleMatch',
    slug: 'picklematch',
    image: '/projects/picklematch/icon.png',
    description:
      'A React Native app that matches nearby pickleball players in real time — set your availability and skill level, then send and receive game invites.',
    longDescription: [
      "PickleMatch solves a simple, common problem for pickleball players: finding someone to play with, right now. Instead of scrolling group chats or guessing who's free, players flip on \"Play Today\" and instantly see who else nearby is available to play.",
      "It's built with React Native and Expo Router for the app shell, TypeScript throughout, and Supabase for real-time data — active player status, invites, and preferences all sync live as players come online or respond.",
      'Players set a preferred format, skill range, and search radius; the app surfaces a live list of nearby available players within that range and handles the full invite flow — send, accept, decline — with real-time status updates.',
    ],
    features: [
      '"Play Today" real-time availability toggle',
      'Live list of nearby active players ready to play',
      'Skill-level range and preferred-format matching',
      'Adjustable search radius',
      'Send, accept, and decline game invites in real time',
      'Built with React Native, Expo Router, TypeScript, and Supabase',
    ],
    // Official 6.5" App Store screenshots from the project's own
    // app-store-assets/ios folder — not simulator grabs. Messages and
    // Profile aren't included here because the app requires a real login
    // to render them and I'm not signing into the live backend to get them;
    // add those two the same way (drop a file in public/projects/picklematch/
    // and add an entry here) once you export them yourself.
    screenshots: [
      {
        src: '/projects/picklematch/home.png',
        alt: 'PickleMatch Home screen with today\'s activity and upcoming games',
        title: 'Home — your court activity at a glance',
        caption:
          'A dashboard for your pickleball life: your stats, what\'s happening today, and every game you have planned, without digging through menus.',
        details: [
          'Profile snapshot up top — skill rating, home city, preferred format',
          '"Today" quick actions: turn on Play Now availability or find your next game',
          '"Your games" feed shows every active plan, including ones still being coordinated (time/court TBD)',
          'Push notifications surfaced right from the home screen',
        ],
      },
      {
        src: '/projects/picklematch/discover.png',
        alt: 'PickleMatch Discover screen ranking nearby players by compatibility',
        title: 'Discover — ranked matches, not a random list',
        caption:
          'Browse players ranked by actual compatibility, with the reasoning shown up front, so you know why someone\'s a good fit before reaching out.',
        details: [
          '"Best fit for you" ranking driven by your own stated preferences — no opaque hidden score',
          '"Why this player fits" breaks the match down in plain language',
          'Swipeable card stack ("Player 1 of 4") to compare several good fits quickly',
          'Act right from the card: Invite to Play, Connect, or pass',
        ],
      },
      {
        src: '/projects/picklematch/play-now.png',
        alt: 'PickleMatch Play Now screen showing an active nearby player available to play',
        title: 'Play Now — real-time availability',
        caption:
          'Flip yourself "Available" with a quick filter (format, skill range, search radius), and the screen fills with players active right now — not a static directory.',
        details: [
          'One-tap "Become Available" with a visible expiry — status never goes stale',
          'Live "Available to play now" list of nearby active players, updating as people come and go',
          'Each player card shows skill rating, distance, and a "Today\'s Rally Fit" summary (format, skill range, time of day)',
          'A short bio so you know who you\'re about to invite',
        ],
      },
    ],
    status: 'In development',
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    category: 'Mobile',
    github: 'https://github.com/karkisunil14/PickleMatch54',
    live: '#', // TODO: add an App Store / TestFlight / web link once it ships
    featured: true,
  },
];

export const experience = [
  {
    type: 'work',
    title: 'Jr. DevOps Engineer',
    org: 'CGI',
    period: 'January 2023 — Present',
    points: [
      'Applied problem-solving skills to modernize technology solutions impacting client missions directly.',
      'Led client discussions to communicate technical updates and solution enhancements.',
      'Developed and troubleshot technical solutions including automation, monitoring, SQL scripting, and CI/CD pipeline implementations.',
      'Participated in technical architecture efforts, interfacing with feature and product teams to understand business needs.',
    ],
  },
  {
    type: 'work',
    title: 'Production Support Specialist L2',
    org: 'Fannie Mae',
    period: 'September 2021 — January 2023',
    points: [
      'Provided functional & technical support for applications, handling issues from application errors to infrastructure.',
      'Participated in release cycles for functional validation, coordinating deployments and post-release checks.',
      'Liaised with development teams for prioritization of enhancements and bug fixes.',
      'Participated in DRP and BCP exercises and coordinated with infra teams on server patching and upgrades.',
    ],
  },
  {
    type: 'work',
    title: 'Production Support Specialist L1.5',
    org: 'Fannie Mae',
    period: 'October 2020 — September 2021',
    points: [
      'Worked on planning and execution of change, problem, and incident management.',
      'Provided mid-level end-user support, including systems administration assistance and user documentation updates.',
      'Utilized UNIX command-line and SQL scripting for various tasks and troubleshooting.',
    ],
  },
  {
    type: 'education',
    title: 'Software Engineering',
    org: 'Lambda School',
    period: '',
    points: [],
  },
  {
    type: 'education',
    title: 'Computer Science',
    org: 'Mississippi College',
    period: '',
    points: [],
  },
];

export const certifications = [
  'AWS Cloud Practitioner',
  'AWS Certified Solutions Architect – Associate',
  'AWS Certified Developer – Associate',
  'AWS Certified SysOps Administrator – Associate',
  'AWS Certified Solutions Architect – Professional',
  'HashiCorp Certified: Terraform Associate',
];

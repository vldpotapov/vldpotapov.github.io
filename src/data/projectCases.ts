export type ProjectTheme = "dark" | "light";

export type ProjectTool = {
  name: string;
  icon: string;
};

export type ProjectInfoRow = {
  label: string;
  value?: string;
  description?: string;
  tools?: ProjectTool[];
};

export type ProjectMediaItem = {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
  text?: string;
  align?: "left" | "right";
  layout?: "equal" | "wide";
  ratio?: string;
  callout?: string;
  slides?: { src: string; alt: string }[];
  videoSrc?: string;
  hasAudio?: boolean;
};

export type ProjectSection =
  | {
      type: "intro";
      eyebrow: string;
      callout?: string;
      calloutAccent?: string;
      text: string[];
      image?: ProjectMediaItem;
      attributes?: { title: string; text: string };
    }
  | {
      type: "feature";
      eyebrow: string;
      title: string;
      text: string[];
      tools?: string[];
      callout?: string;
      calloutAccent?: string;
      image?: ProjectMediaItem;
      imageSide?: "left" | "right";
    }
  | {
      type: "story-grid";
      eyebrow: string;
      title: string;
      text: string[];
      tools?: string[];
      items: ProjectMediaItem[];
      followup?: { title: string; text: string[]; tools?: string[]; items: ProjectMediaItem[]; after?: { title: string; text: string[]; tools?: string[] }[]; threeUp?: { title: string; text: string; items: ProjectMediaItem[] }[]; afterThreeUp?: { title: string; text: string[]; tools?: string[] }[]; afterThreeUpBlocks?: { title: string; text: string; items: ProjectMediaItem[] }[]; wideMedia?: { title: string; text: string; image: ProjectMediaItem; callout?: string }[]; afterWideMedia?: { title: string; text: string[]; tools?: string[] }[]; afterWideMediaItems?: ProjectMediaItem[] };
    }
  | {
      type: "slider";
      eyebrow: string;
      title: string;
      text?: string;
      slides: ProjectMediaItem[];
    };

export const motorSkinProject = {
  title: "IGB Live London 2026",
  subtitle: "Visual campaign, motion direction, and exhibition graphics for a spy-inspired product launch.",
  year: "2026",
  role: "Graphic Designer / 3D Artist",
  client: "Slotegrator",
  industry: "iGaming / Exhibition",
  theme: "dark" as ProjectTheme,
  accent: "#60f219",
  sliderNumberColor: "#000",
  backHref: "/#projects",
  cover: {
    src: "/images/projects/igb-live-2026/hero.png",
    alt: "IGB Live London campaign cover",
  },
  heroMeta: ["Visual Campaign", "Exhibition Design", "Motion Graphics"],
  overview: {
    title: "Visual Campaign",
    eyebrow: "Overview",
    before: "IGB Live London 2026 became one of the company's largest marketing initiatives of the year.",
    accent:
      "The project brought together digital and print media, exhibition design, social media, sales collateral, and product communication into a unified visual system.",
    after: "My role was to translate the campaign concept into a consistent brand experience across every customer touchpoint.",
  },
  glance: [
    { label: "Duration", value: "3+ Months", description: "Planning, design, and production." },
    { label: "Deliverables", value: "40+ Assets", description: "Digital, print, motion, and environmental design." },
    { label: "Touchpoints", value: "8+ Channels", description: "Social media, sales materials, exhibition booth, magazine, print, and more." },
    { label: "Recognition", value: "Award-winning", description: "Best Pre-Show Marketing Campaign." },
    {
      label: "Tools",
      value: "",
      tools: [
        { name: "Jira", icon: "/icons/tools/jira.svg" },
        { name: "Figma", icon: "/icons/tools/figma.svg" },
        { name: "Photoshop", icon: "/icons/tools/photoshop.svg" },
        { name: "Illustrator", icon: "/icons/tools/illustrator.svg" },
        { name: "InDesign", icon: "/icons/tools/indesign.svg" },
        { name: "Blender", icon: "/icons/tools/blender.svg" },
        { name: "After Effects", icon: "/icons/tools/ae.svg" },
        { name: "ChatGPT", icon: "/icons/tools/gpt.svg" },
        { name: "Kling", icon: "/icons/tools/kling.svg" },
        { name: "Weave", icon: "/icons/tools/weave.svg" },
      ],
    },
  ] as ProjectInfoRow[],
  sections: [
    {
      type: "intro",
      eyebrow: "Creative Concept",
      callout: "Campaign Concept developed by the",
      calloutAccent: "Marketing Team",
      text: [
        "The \"Licensed to Deal\" concept was created by the marketing team for IGB Live London 2026.",
        "Inspired by spy and heist films, it positioned Slotegrator as a strategic technology partner while establishing five defining attributes: precision, secrecy, intelligence, technology, and control.",
        "This creative direction became the foundation for every campaign asset, from digital communication and exhibition graphics to printed materials, merchandise, and on-site branding.",
      ],
      image: { src: "/images/projects/igb-live-2026/concept.png", alt: "Spy and heist movie references for the IGB Live London campaign concept" },
      attributes: {
        title: "Core Attributes",
        text: "Precision \u22c5 Secrecy \u22c5 Intelligence \u22c5 Technology \u22c5 Control",
      },
    },
    {
      type: "feature",
      eyebrow: "Visual Language",
      title: "Translating the Concept into a Visual System",
      callout: "Visual Language developed by the",
      calloutAccent: "Marketing Team",
      text: [
        "The campaign's visual identity drew inspiration from surveillance interfaces, classified documents, encrypted communications, laser security systems, and cinematic espionage aesthetics.",
        "These elements formed a cohesive design language applied consistently across social media, exhibition graphics, printed publications, motion content, and promotional materials.",
      ],
      image: { src: "/images/projects/igb-live-2026/moodboard.png", alt: "Visual language moodboard for the IGB Live London campaign" },
    },
    {
      type: "story-grid",
      eyebrow: "Campaign Architecture",
      title: "Teaser Campaign",
      text: [
        "To build anticipation ahead of IGB Live London 2026, the campaign unfolded through a sequence of six teaser videos released over several weeks. Each video revealed a new chapter of the story, gradually introducing the concept, the team, and finally the new product.",
      ],
      tools: ["Figma", "Photoshop", "After Effects", "ChatGPT", "Weave"],
      items: [
        { title: "01 - Incoming Call", text: "The campaign opened with a ringing phone, introducing the spy-inspired narrative through a familiar cinematic motif.", src: "/videos/projects/igb-live-2026/posters/phone.png", videoSrc: "/videos/projects/igb-live-2026/phone.mp4", alt: "Incoming call teaser poster", align: "right" },
        { title: "02 - Surveillance Room", text: "The second teaser expanded the visual language by introducing a surveillance control room, reinforcing the campaign theme while building anticipation for the upcoming announcement.", src: "/videos/projects/igb-live-2026/posters/surveillance_room.png", videoSrc: "/videos/projects/igb-live-2026/surveillance_room.mp4", alt: "Surveillance room teaser poster", align: "left" },
        { title: "03 - Classified Message", text: "A coded message sequence built tension and gave the campaign a stronger mission-based structure.", src: "/videos/projects/igb-live-2026/posters/top_secret.png", videoSrc: "/videos/projects/igb-live-2026/top_secret.mp4", alt: "Classified message teaser poster", align: "right", layout: "wide" },
        { title: "04 - Location Confirmed", text: "The event location was revealed through a location confirmation sequence, announcing London as the next mission while maintaining the established visual language.", src: "/videos/projects/igb-live-2026/posters/igb_location.png", videoSrc: "/videos/projects/igb-live-2026/igb_location.mp4", hasAudio: false, alt: "Location confirmed teaser poster", align: "left" },
        { title: "05a - Agent Identified", text: "A series of personalized videos introduced the team attending the exhibition through surveillance-style graphics.", src: "/videos/projects/igb-live-2026/posters/all_agents.png", videoSrc: "/videos/projects/igb-live-2026/all_agents.mp4", alt: "Agent identified teaser poster", align: "right", layout: "wide", callout: "Live-action footage was filmed with the support of an external videographer, while visual effects and post-production were created by the motion designer." },
        { title: "05b - Agent Identified", text: "An alternative version was created for team members who couldn't record personalized footage, ensuring visual consistency across all internal communications.", src: "/videos/projects/igb-live-2026/posters/employee_spy.png", videoSrc: "/videos/projects/igb-live-2026/employee_spy.mp4", hasAudio: false, alt: "Employee spy teaser poster", align: "right" },
        { title: "06 - Classified Asset", text: "The final teaser revealed the campaign's classified product, Predictor. Rather than presenting it directly, the animation framed the product as a secured asset awaiting public disclosure, completing the pre-event teaser campaign.", src: "/videos/projects/igb-live-2026/posters/predictor.png", videoSrc: "/videos/projects/igb-live-2026/predictor.mp4", alt: "Predictor classified asset teaser poster", align: "left" },
      ],
      followup: {
        title: "Exhibition Experience",
        text: [
          "The exhibition booth became the physical expression of the campaign, translating its visual identity into an immersive real-world environment.",
          "Every graphic element was designed to create a seamless connection between digital communication, printed materials, and the exhibition space.",
        ],
        tools: ["Figma", "Photoshop", "Illustrator", "Blender"],
        items: [
          { title: "01 - Booth Proposal", text: "The initial booth layout provided by the exhibition contractor served as the foundation for the overall spatial design and visual planning.", src: "/images/projects/igb-live-2026/booth_developer.png", alt: "Initial booth proposal layout", align: "right", layout: "wide", ratio: "968 / 622" },
          { title: "02 \u2014 Environmental Graphics", text: "Large-format graphics were developed for walls, partitions, hanging structures, and other architectural elements, adapting the campaign identity to the exhibition environment.", src: "/images/projects/igb-live-2026/booth_design.png", alt: "Environmental graphics for the IGB Live London exhibition booth", align: "left", layout: "wide", ratio: "968 / 605" },
          {
            title: "03 \u2014 Booth Visualization",
            text: "A series of 3D visualizations refined the spatial composition, validated graphic placement, and ensured a cohesive visitor experience before production.",
            src: "",
            alt: "Booth visualization gallery",
            align: "right",
            layout: "wide",
            ratio: "968 / 645",
            slides: [
              { src: "/images/projects/igb-live-2026/slider_1_render/booth_render_1.png", alt: "IGB Live booth visualization render 1" },
              { src: "/images/projects/igb-live-2026/slider_1_render/booth_render_2.png", alt: "IGB Live booth visualization render 2" },
              { src: "/images/projects/igb-live-2026/slider_1_render/booth_render_3.png", alt: "IGB Live booth visualization render 3" },
              { src: "/images/projects/igb-live-2026/slider_1_render/booth_render_4.png", alt: "IGB Live booth visualization render 4" },
            ],
          },
          {
            title: "04 \u2014 From Visualization to Reality",
            text: "Comparing the 3D visualizations with the completed booth demonstrates how the original design vision was faithfully translated into the final exhibition environment.",
            src: "",
            alt: "Completed IGB Live booth gallery",
            align: "left",
            layout: "wide",
            ratio: "968 / 645",
            slides: [
              { src: "/images/projects/igb-live-2026/slider_2_inlive/igb_booth_inlive_1.jpg", alt: "Completed IGB Live booth view 1" },
              { src: "/images/projects/igb-live-2026/slider_2_inlive/igb_booth_inlive_2.jpg", alt: "Completed IGB Live booth view 2" },
              { src: "/images/projects/igb-live-2026/slider_2_inlive/igb_booth_inlive_3.jpg", alt: "Completed IGB Live booth view 3" },
              { src: "/images/projects/igb-live-2026/slider_2_inlive/igb_booth_inlive_4.jpg", alt: "Completed IGB Live booth view 4" },
            ],
          },
          {
            title: "04 \u2014 Final Installation",
            text: "The completed booth brought the campaign's visual language into a physical setting, creating a cohesive and recognizable brand presence throughout IGB Live London 2026.",
            src: "",
            alt: "Final IGB Live booth installation gallery",
            align: "right",
            layout: "wide",
            ratio: "968 / 645",
            slides: [
              { src: "/images/projects/igb-live-2026/slider_3_people/igb_booth_people_1.jpg", alt: "Final IGB Live booth installation view 1" },
              { src: "/images/projects/igb-live-2026/slider_3_people/igb_booth_people_2.jpg", alt: "Final IGB Live booth installation view 2" },
              { src: "/images/projects/igb-live-2026/slider_3_people/igb_booth_people_3.jpg", alt: "Final IGB Live booth installation view 3" },
              { src: "/images/projects/igb-live-2026/slider_3_people/igb_booth_people_4.jpg", alt: "Final IGB Live booth installation view 4" },
              { src: "/images/projects/igb-live-2026/slider_3_people/igb_booth_people_5.jpg", alt: "Final IGB Live booth installation view 5" },
            ],
          },
        ],
        after: [
          {
            title: "Campaign eBook",
            text: [
              "The eBook served as one of the campaign's key content assets, supporting the launch of Prediction Markets ahead of IGB Live London 2026. I designed both the digital edition for online distribution and the print-ready edition produced for use during the exhibition.",
            ],
            tools: ["Figma", "Photoshop", "Illustrator", "InDesign", "ChatGPT"],
          },
        ],
        threeUp: [
          {
            title: "Digital Edition",
            text: "The digital publication combined editorial layouts, custom illustrations, data-driven content, and campaign visuals into a structured reading experience optimized for online distribution.",
            items: [
              { src: "/images/projects/igb-live-2026/prediction_digital_1.png", alt: "Prediction Markets digital eBook layout 1", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/prediction_digital_2.png", alt: "Prediction Markets digital eBook layout 2", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/prediction_digital_3.png", alt: "Prediction Markets digital eBook layout 3", ratio: "453 / 567" },
            ],
          },
          {
            title: "Printed Edition",
            text: "The print edition adapted the same design system for physical production, ensuring consistency between digital and printed formats while preparing the publication for distribution during the event.",
            items: [
              { src: "/images/projects/igb-live-2026/prediction_print_1.png", alt: "Prediction Markets printed eBook layout 1", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/prediction_print_2.png", alt: "Prediction Markets printed eBook layout 2", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/prediction_print_3.png", alt: "Prediction Markets printed eBook layout 3", ratio: "453 / 567" },
            ],
          },
        ],
        afterThreeUp: [
          {
            title: "Campaign Assets",
            text: [
              "To support the campaign across every touchpoint, a broad collection of supporting assets was developed alongside the core deliverables. Together, they extended the campaign identity beyond the exhibition booth, ensuring a consistent brand presence across digital platforms, printed materials, promotional merchandise, and on-site communication.",
            ],
          },
        ],
        afterThreeUpBlocks: [
          {
            title: "Social Media Assets",
            text: "A collection of campaign visuals created for both corporate and employee social media channels, maintaining a unified visual identity throughout the campaign.",
            items: [
              { src: "/images/projects/igb-live-2026/people_smm__1.png", alt: "IGB Live social media asset 1", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/people_smm__2.png", alt: "IGB Live social media asset 2", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/people_smm__3.png", alt: "IGB Live social media asset 3", ratio: "453 / 567" },
            ],
          },
          {
            title: "Event Materials",
            text: "Printed brochures, branded merchandise, and supporting collateral produced for the exhibition, extending the campaign into physical interactions with visitors.",
            items: [
              { src: "/images/projects/igb-live-2026/merch_1.jpg", alt: "IGB Live event materials 1", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/merch_2.jpg", alt: "IGB Live event materials 2", ratio: "453 / 567" },
              { src: "/images/projects/igb-live-2026/merch_3.jpg", alt: "IGB Live event materials 3", ratio: "453 / 567" },
            ],
          },
        ],
        wideMedia: [
          {
            title: "Campaign Videos",
            text: "A series of campaign videos expanded the narrative beyond static visuals, combining live-action footage with motion graphics to reinforce the spy-inspired concept across digital platforms.",
            image: { src: "/videos/projects/igb-live-2026/posters/igb_london_26_short.png", videoSrc: "/videos/projects/igb-live-2026/igb_london_26_short.mp4", alt: "IGB Live campaign video preview", ratio: "1400 / 788" },
            callout: "Live-action footage was filmed with the support of an external videographer, while visual effects and post-production were created by our in-house motion designer. Included here to present the campaign as a complete creative experience.",
          },
        ],
        afterWideMedia: [
          {
            title: "Mission Complete",
            text: [
              "Designed as the final chapter of the campaign, Mission Complete brought the narrative full circle. It concluded months of coordinated work and marked the successful completion of the IGB Live London 2026 campaign using the same visual language that introduced it.",
            ],
          },
        ],
        afterWideMediaItems: [
          {
            text: "The closing campaign video brought every stage of the narrative together, ending the story with the message \"Mission Complete\" and celebrating the successful completion of the IGB Live London 2026 campaign.",
            src: "/videos/projects/igb-live-2026/posters/mission_complete.png",
            videoSrc: "/videos/projects/igb-live-2026/mission_complete.mp4",
            alt: "Mission Complete campaign video",
            align: "right",
            ratio: "684 / 856",
          },
        ],
      },
    },
  ] as ProjectSection[],
} as const;




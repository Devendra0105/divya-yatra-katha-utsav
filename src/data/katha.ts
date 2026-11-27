import bali from "assets\katha\rishabhdev.jpg"

export type KathaDay = {
  dayNumber: number;
  dayLabel: string;
  date: string;
  title: string;
  points: readonly string[];
  timing: string;
  venue: string;
  illustration?: string | undefined;
  illustrationAlt: string;
  illustrationPlaceholder: string;
};
import ap from "@/assets/divya-yatra/ap.png"
/**
 * Global header emblem for Shree Akshar Purushottam Maharaj.
 * Leave `src` undefined until the verified PNG asset is added under `src/assets/divya-yatra/`.
 */
export const aksharPurushottamBanner: {
  src?: string | undefined;
  alt: string;
  title: string;
} = {
  src: ap,
  alt: "श्री अक्षर पुरुषोत्तम महाराज",
  title: "श्री अक्षर पुरुषोत्तम महाराज",
};

export const katha = {
  title: "संगीतमय श्रीमद् भागवत कथा",
  location: "जगन्नाथपुरी एवं गंगासागर तीर्थ क्षेत्र",
  organizers: "श्री स्वामिनारायण सत्संग मंडल, दौसा, जयपुर एवं जोधपुर",
  startDate: "14 दिसंबर 2026",
  endDate: "23 दिसंबर 2026",
  kathaStartDate: "15 दिसंबर 2026",
  dailyDurationNote: "दैनिक कथा अवधि: लगभग ३ घंटे (दिन के अनुसार समय व स्थान पृथक हो सकते हैं)",
  durationDays: 10,
  speaker: "पू. योगीप्रेम स्वामी",
  speakerAffiliation: "अक्षरधाम मंदिर – जोधपुर",
} as const;

export const kathaSchedule: readonly KathaDay[] = [
  {
    dayNumber: 1,
    dayLabel: "प्रथम दिवस",
    date: "15 दिसंबर 2026",
    title: "मुख्य वक्ता एवं श्रोता की कथा",
    points: [
      "श्रीमद् भागवत कथा महात्म्य एवं मुख्य वक्ता व श्रोता की पावन कथा।",
      "इस दिवस के अन्य विस्तृत कथा बिंदु कार्यक्रम प्राप्त होने पर अद्यतन किए जाएंगे।",
    ],
    timing: "लगभग ३ घंटे (सटीक समय शीघ्र सूचित किया जाएगा)",
    venue: "शीघ्र सूचित किया जाएगा",
    illustration: undefined,
    illustrationAlt: "श्रीमद्भागवत ग्रंथ चित्र",
    illustrationPlaceholder: "श्रीमद्भागवत ग्रंथ चित्र (PNG)",
  },
  {
    dayNumber: 2,
    dayLabel: "द्वितीय दिवस",
    date: "16 दिसंबर 2026",
    title: "कथा प्रसंग — कार्यक्रम प्राप्त होने पर अद्यतन किया जाएगा",
    points: ["इस दिवस के कथा विषय एवं प्रमुख बिंदु कार्यक्रम प्राप्त होने पर जोड़े जाएंगे।"],
    timing: "लगभग ३ घंटे (सटीक समय शीघ्र सूचित किया जाएगा)",
    venue: "शीघ्र सूचित किया जाएगा",
    illustration: undefined,
    illustrationAlt: "द्वितीय दिवस कथा प्रसंग चित्र",
    illustrationPlaceholder: "द्वितीय दिवस कथा प्रसंग चित्र (PNG)",
  },
  {
    dayNumber: 3,
    dayLabel: "तृतीय दिवस",
    date: "17 दिसंबर 2026",
    title: "कथा प्रसंग — कार्यक्रम प्राप्त होने पर अद्यतन किया जाएगा",
    points: ["इस दिवस के कथा विषय एवं प्रमुख बिंदु कार्यक्रम प्राप्त होने पर जोड़े जाएंगे।"],
    timing: "लगभग ३ घंटे (सटीक समय शीघ्र सूचित किया जाएगा)",
    venue: "शीघ्र सूचित किया जाएगा",
    illustration: undefined,
    illustrationAlt: "तृतीय दिवस कथा प्रसंग चित्र",
    illustrationPlaceholder: "तृतीय दिवस कथा प्रसंग चित्र (PNG)",
  },
  {
    dayNumber: 4,
    dayLabel: "चतुर्थ दिवस",
    date: "18 दिसंबर 2026",
    title: "कथा प्रसंग — कार्यक्रम प्राप्त होने पर अद्यतन किया जाएगा",
    points: ["इस दिवस के कथा विषय एवं प्रमुख बिंदु कार्यक्रम प्राप्त होने पर जोड़े जाएंगे।"],
    timing: "लगभग ३ घंटे (सटीक समय शीघ्र सूचित किया जाएगा)",
    venue: "शीघ्र सूचित किया जाएगा",
    illustration: undefined,
    illustrationAlt: "चतुर्थ दिवस कथा प्रसंग चित्र",
    illustrationPlaceholder: "चतुर्थ दिवस कथा प्रसंग चित्र (PNG)",
  },
  {
    dayNumber: 5,
    dayLabel: "पंचम दिवस",
    date: "19 दिसंबर 2026",
    title: "कथा प्रसंग — कार्यक्रम प्राप्त होने पर अद्यतन किया जाएगा",
    points: ["इस दिवस के कथा विषय एवं प्रमुख बिंदु कार्यक्रम प्राप्त होने पर जोड़े जाएंगे।"],
    timing: "लगभग ३ घंटे (सटीक समय शीघ्र सूचित किया जाएगा)",
    venue: "शीघ्र सूचित किया जाएगा",
    illustration: undefined,
    illustrationAlt: "पंचम दिवस कथा प्रसंग चित्र",
    illustrationPlaceholder: "पंचम दिवस कथा प्रसंग चित्र (PNG)",
  },
  {
    dayNumber: 6,
    dayLabel: "षष्ठ दिवस",
    date: "20 दिसंबर 2026",
    title: "कथा प्रसंग — कार्यक्रम प्राप्त होने पर अद्यतन किया जाएगा",
    points: ["इस दिवस के कथा विषय एवं प्रमुख बिंदु कार्यक्रम प्राप्त होने पर जोड़े जाएंगे।"],
    timing: "लगभग ३ घंटे (सटीक समय शीघ्र सूचित किया जाएगा)",
    venue: "शीघ्र सूचित किया जाएगा",
    illustration: undefined,
    illustrationAlt: "षष्ठ दिवस कथा प्रसंग चित्र",
    illustrationPlaceholder: "षष्ठ दिवस कथा प्रसंग चित्र (PNG)",
  },
  {
    dayNumber: 7,
    dayLabel: "सप्तम दिवस",
    date: "21 दिसंबर 2026",
    title: "कथा प्रसंग — कार्यक्रम प्राप्त होने पर अद्यतन किया जाएगा",
    points: ["इस दिवस के कथा विषय एवं प्रमुख बिंदु कार्यक्रम प्राप्त होने पर जोड़े जाएंगे।"],
    timing: "लगभग ३ घंटे (सटीक समय शीघ्र सूचित किया जाएगा)",
    venue: "शीघ्र सूचित किया जाएगा",
    illustration: undefined,
    illustrationAlt: "सप्तम दिवस कथा प्रसंग चित्र",
    illustrationPlaceholder: "सप्तम दिवस कथा प्रसंग चित्र (PNG)",
  },
];

// src/data/guests.ts
import chiefImg from "@/assets/yajman/mukhya/maheshjikhandelwal.jpeg";
import amarsingh from "@/assets/yajman/amarsinghji.jpeg";
import amarsingh2 from "@/assets/yajman/amarsinghji2.jpeg";
import dinesh from "@/assets/yajman/dineshjisoni.jpeg";
import dinesh2 from "@/assets/yajman/dineshjisoni2.jpeg";
import kamlesh from "@/assets/yajman/kamleshjisharma.jpeg";
import kamlesh2 from "@/assets/yajman/kamleshjisharma2.jpeg";
import mahendra from "@/assets/yajman/mahendrajiyada.jpeg";
import mahendra2 from "@/assets/yajman/mahendrajiyada2.jpeg";
import mahesh2 from "@/assets/yajman/maheshjikhandelwal2.jpeg";
import prem from "@/assets/yajman/premnarayanjichodhari.jpeg";
import prem2 from "@/assets/yajman/premnarayanjichodhari2.jpeg";

export type YajmanProfile = {
  name: string;
  title?: string;
  image?: string;
};

// Add verified Mukhy Yajman and Yajman portraits/names once provided in src/assets/divya-yatra/.
export const chiefYajmans: YajmanProfile[] = [
  { name: "Mahesh Ji Khandelwal", title: "मुख्य यजमान", image: chiefImg },
];

export const distinguishedYajmans: YajmanProfile[] = [
  { name: "Amar Singh Ji (2)", image: amarsingh2 },
  { name: "Dinesh Jisoni (2)", image: dinesh2 },
  { name: "Kamlesh Jisharma (2)", image: kamlesh2 },
  { name: "Mahendra Jiyada (2)", image: mahendra2 },
  { name: "Mahesh Ji Khandelwal (2)", image: mahesh2 },

  { name: "Prem Narayan Jichodhari (2)", image: prem2 },
];

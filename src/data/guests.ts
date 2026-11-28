// src/data/guests.ts
import chiefImg from "@/assets/yajman/mukhya/maheshjikhandelwal2.jpeg";
import amarsingh2 from "@/assets/yajman/amarsinghji2.jpeg";
import dinesh2 from "@/assets/yajman/dineshjisoni2.jpeg";
import kamlesh2 from "@/assets/yajman/kamleshjisharma2.jpeg";
import mahendra2 from "@/assets/yajman/mahendrajiyada2.jpeg";
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
  { name: "Amar Singh Ji", image: amarsingh2 },
  { name: "Dinesh Ji Soni", image: dinesh2 },
  { name: "Kamlesh Ji Sharma", image: kamlesh2 },
  { name: "Mahendra Ji Yadav ", image: mahendra2 },
  { name: "Prem Narayan Ji Chodhari", image: prem2 },
];

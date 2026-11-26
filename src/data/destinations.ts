import belurMath from "@/assets/divya-yatra/belur-math.jpg.asset.jpeg";
import chandrabhagaBeach from "@/assets/divya-yatra/chandrabhaga-beach.jpg.asset.jpeg";
import dakshineswarTemple from "@/assets/divya-yatra/dakshineswar-kali-temple.jpg.asset.jpeg";
import gangaSagar from "@/assets/divya-yatra/gangasagar.jpg.asset.jpeg";
import gundichaTemple from "@/assets/divya-yatra/gundicha-temple.jpg.asset.jpeg";
import howrahBridge from "@/assets/divya-yatra/howrah-bridge.jpg.asset.jpeg";
import indradyumnaSarovar from "@/assets/divya-yatra/indradyumna-sarovar.jpg.asset.jpeg";
import jagannathPuri from "@/assets/divya-yatra/jagannath-puri.jpg.asset.jpeg";
import konarkSunTemple from "@/assets/divya-yatra/konark-sun-temple.jpg.asset.jpeg";
import lingarajTemple from "@/assets/divya-yatra/lingaraj-temple.jpg.asset.jpeg";
import sakshiGopalTemple from "@/assets/divya-yatra/sakshi-gopal-temple.jpg.asset.jpeg";
import swaminarayanTemple from "@/assets/divya-yatra/swaminarayan-temple-kolkata.jpeg";
import victoriaMemorial from "@/assets/divya-yatra/victoria-memorial.jpg.asset.jpeg";

export type Destination = {
  id: string;
  title: string;
  englishName: string;
  location: string;
  region: string;
  image?: string;
  verifiedNote?: string;
};

export const destinations: Destination[] = [
  {
    id: "jagannath-puri",
    title: "श्री जगन्नाथ मंदिर",
    englishName: "Shree Jagannath Temple, Puri",
    location: "पुरी, ओडिशा",
    region: "पुरी",
    image: jagannathPuri,
    verifiedNote:
      "विवरणिका के अनुसार भगवान श्री स्वामिनारायण, श्री नीलकंठ वर्णी रूप में वनविचरण के दौरान यहां छह माह रहे थे।",
  },
  {
    id: "konark-sun-temple",
    title: "कोणार्क सूर्य मंदिर",
    englishName: "Konark Sun Temple",
    location: "कोणार्क, ओडिशा",
    region: "ओडिशा",
    image: konarkSunTemple,
  },
  {
    id: "gundicha-temple",
    title: "गुंडिचा मंदिर",
    englishName: "Gundicha Temple, Puri",
    location: "पुरी, ओडिशा",
    region: "पुरी",
    image: gundichaTemple,
  },
  {
    id: "lingaraj-temple",
    title: "लिंगराज मंदिर",
    englishName: "Lingaraj Temple, Bhubaneswar",
    location: "भुवनेश्वर, ओडिशा",
    region: "ओडिशा",
    image: lingarajTemple,
  },
  {
    id: "sakshi-gopal-temple",
    title: "साक्षी गोपाल मंदिर",
    englishName: "Sakshi Gopal Temple",
    location: "पुरी क्षेत्र, ओडिशा",
    region: "पुरी",
    image: sakshiGopalTemple,
  },
  {
    id: "dakshineswar-kali-temple",
    title: "दक्षिणेश्वर काली मंदिर",
    englishName: "Dakshineswar Kali Temple, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: dakshineswarTemple,
  },
  {
    id: "belur-math",
    title: "बेलूर मठ",
    englishName: "Belur Math, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: belurMath,
  },
  {
    id: "gangasagar",
    title: "गंगासागर तीर्थ",
    englishName: "Gangasagar Tirtha",
    location: "गंगासागर",
    region: "गंगासागर",
    image: gangaSagar,
  },
  {
    id: "victoria-memorial",
    title: "विक्टोरिया मेमोरियल",
    englishName: "Victoria Memorial, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: victoriaMemorial,
  },
  {
    id: "howrah-bridge",
    title: "हावड़ा ब्रिज",
    englishName: "Howrah Bridge, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: howrahBridge,
  },
  {
    id: "swaminarayan-temple-kolkata",
    title: "श्री स्वामिनारायण मंदिर",
    englishName: "Shree Swaminarayan Temple, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: swaminarayanTemple,
  },
  {
    id: "indradyumna-sarovar",
    title: "इन्द्रद्युम्न सरोवर तीर्थ",
    englishName: "Indradyumna Sarovar, Puri",
    location: "पुरी, ओडिशा",
    region: "पुरी",
    image: indradyumnaSarovar,
  },

  {
    id: "chandrabhaga-beach",
    title: "चंद्रभागा बीच",
    englishName: "Chandrabhaga Beach, Konark",
    location: "कोणार्क, ओडिशा",
    region: "ओडिशा",
    image: chandrabhagaBeach,
  },
];
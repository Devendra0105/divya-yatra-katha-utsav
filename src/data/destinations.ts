import belurMath from "@/assets/divya-yatra/belur-math.jpg.asset.json";
import chandrabhagaBeach from "@/assets/divya-yatra/chandrabhaga-beach.jpg.asset.json";
import dakshineswarTemple from "@/assets/divya-yatra/dakshineswar-kali-temple.jpg.asset.json";
import gangaSagar from "@/assets/divya-yatra/gangasagar.jpg.asset.json";
import gundichaTemple from "@/assets/divya-yatra/gundicha-temple.jpg.asset.json";
import howrahBridge from "@/assets/divya-yatra/howrah-bridge.jpg.asset.json";
import indradyumnaSarovar from "@/assets/divya-yatra/indradyumna-sarovar.jpg.asset.json";
import jagannathPuri from "@/assets/divya-yatra/jagannath-puri.jpg.asset.json";
import konarkSunTemple from "@/assets/divya-yatra/konark-sun-temple.jpg.asset.json";
import lingarajTemple from "@/assets/divya-yatra/lingaraj-temple.jpg.asset.json";
import sakshiGopalTemple from "@/assets/divya-yatra/sakshi-gopal-temple.jpg.asset.json";
import swaminarayanTemple from "@/assets/divya-yatra/swaminarayan-temple-kolkata.jpg.asset.json";
import victoriaMemorial from "@/assets/divya-yatra/victoria-memorial.jpg.asset.json";

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
    image: jagannathPuri.url,
    verifiedNote:
      "विवरणिका के अनुसार भगवान श्री स्वामिनारायण, श्री नीलकंठ वर्णी रूप में वनविचरण के दौरान यहां छह माह रहे थे।",
  },
  {
    id: "konark-sun-temple",
    title: "कोणार्क सूर्य मंदिर",
    englishName: "Konark Sun Temple",
    location: "कोणार्क, ओडिशा",
    region: "ओडिशा",
    image: konarkSunTemple.url,
  },
  {
    id: "gundicha-temple",
    title: "गुंडिचा मंदिर",
    englishName: "Gundicha Temple, Puri",
    location: "पुरी, ओडिशा",
    region: "पुरी",
    image: gundichaTemple.url,
  },
  {
    id: "lingaraj-temple",
    title: "लिंगराज मंदिर",
    englishName: "Lingaraj Temple, Bhubaneswar",
    location: "भुवनेश्वर, ओडिशा",
    region: "ओडिशा",
    image: lingarajTemple.url,
  },
  {
    id: "sakshi-gopal-temple",
    title: "साक्षी गोपाल मंदिर",
    englishName: "Sakshi Gopal Temple",
    location: "पुरी क्षेत्र, ओडिशा",
    region: "पुरी",
    image: sakshiGopalTemple.url,
  },
  {
    id: "dakshineswar-kali-temple",
    title: "दक्षिणेश्वर काली मंदिर",
    englishName: "Dakshineswar Kali Temple, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: dakshineswarTemple.url,
  },
  {
    id: "belur-math",
    title: "बेलूर मठ",
    englishName: "Belur Math, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: belurMath.url,
  },
  {
    id: "gangasagar",
    title: "गंगासागर तीर्थ",
    englishName: "Gangasagar Tirtha",
    location: "गंगासागर",
    region: "गंगासागर",
    image: gangaSagar.url,
  },
  {
    id: "victoria-memorial",
    title: "विक्टोरिया मेमोरियल",
    englishName: "Victoria Memorial, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: victoriaMemorial.url,
  },
  {
    id: "howrah-bridge",
    title: "हावड़ा ब्रिज",
    englishName: "Howrah Bridge, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: howrahBridge.url,
  },
  {
    id: "swaminarayan-temple-kolkata",
    title: "श्री स्वामिनारायण मंदिर",
    englishName: "Shree Swaminarayan Temple, Kolkata",
    location: "कोलकाता",
    region: "कोलकाता",
    image: swaminarayanTemple.url,
  },
  {
    id: "indradyumna-sarovar",
    title: "इन्द्रद्युम्न सरोवर तीर्थ",
    englishName: "Indradyumna Sarovar, Puri",
    location: "पुरी, ओडिशा",
    region: "पुरी",
    image: indradyumnaSarovar.url,
  },
  {
    id: "sweta-ganga-sarovar",
    title: "श्वेत गंगा सरोवर तीर्थ",
    englishName: "Sweta Ganga Sarovar, Puri",
    location: "पुरी, ओडिशा",
    region: "पुरी",
  },
  {
    id: "chandrabhaga-beach",
    title: "चंद्रभागा बीच",
    englishName: "Chandrabhaga Beach, Konark",
    location: "कोणार्क, ओडिशा",
    region: "ओडिशा",
    image: chandrabhagaBeach.url,
  },
];
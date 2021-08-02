import { connectToDatabase } from "../../../util/mongodb";
const items = [
    {
      "username": "Francine JH",
      "team": "armythyst"
    },
    {
      "username": "Raven Reyes",
      "team": "armythyst"
    },
    {
      "username": "Czandarra Sittie Deolino Ganap",
      "team": "armythyst"
    },
    {
      "username": "Sharla Rose Cantila",
      "team": "armythyst"
    },
    {
      "username": "Kazel Fugaban",
      "team": "armythyst"
    },
    {
      "username": "arlen sellar",
      "team": "armythyst"
    },
    {
      "username": "Donny Ventura",
      "team": "armythyst"
    },
    {
      "username": "Arianne Jade Dupitas",
      "team": "armythyst"
    },
    {
      "username": "Echo Park",
      "team": "armythyst"
    },
    {
      "username": "Stephanie Yvonne de Villa",
      "team": "armythyst"
    },
    {
      "username": "Argie Hortelano Torculas",
      "team": "armythyst"
    },
    {
      "username": "Kath Ilang-Ilang",
      "team": "armythyst"
    },
    {
      "username": "Mae Flores",
      "team": "armythyst"
    },
    {
      "username": "Coleen Jeon",
      "team": "armythyst"
    },
    {
      "username": "Precious Lara Rodriguez",
      "team": "armythyst"
    },
    {
      "username": "Jessa Austria",
      "team": "armythyst"
    },
    {
      "username": "Yana Alexie Fajardo",
      "team": "armythyst"
    },
    {
      "username": "Jodi Angel B. Barbosa",
      "team": "armythyst"
    },
    {
      "username": "NIMUEL",
      "team": "armythyst"
    },
    {
      "username": "Gabriella Joyce Pingul",
      "team": "armythyst"
    },
    {
      "username": "Kristine Joy Gimenez",
      "team": "armythyst"
    },
    {
      "username": "Teresa Roluna Gemina",
      "team": "armythyst"
    },
    {
      "username": "Ma Trexie Mayores",
      "team": "armythyst"
    },
    {
      "username": "Sophia Ae Ando",
      "team": "armythyst"
    },
    {
      "username": "Aubrey Min",
      "team": "armythyst"
    },
    {
      "username": "Christable Petilla",
      "team": "armythyst"
    },
    {
      "username": "Kwek Kwek",
      "team": "armythyst"
    },
    {
      "username": "Camille Eujin",
      "team": "armythyst"
    },
    {
      "username": "Solana Jung",
      "team": "armythyst"
    },
    {
      "username": "Clarice Joy Japitana",
      "team": "armythyst"
    },
    {
      "username": "Jerah Coronica",
      "team": "armythyst"
    },
    {
      "username": "Athea Anika Gianzon",
      "team": "armythyst"
    },
    {
      "username": "Airel Provy Anne Baquire",
      "team": "armythyst"
    },
    {
      "username": "Christine Andrea Labausa",
      "team": "armythyst"
    },
    {
      "username": "Mira Nabartey",
      "team": "armythyst"
    },
    {
      "username": "Klea Hoseokie",
      "team": "armythyst"
    },
    {
      "username": "Rein Andrei Saltoc",
      "team": "armythyst"
    },
    {
      "username": "Dona Santiago",
      "team": "armythyst"
    },
    {
      "username": "Reeseanne Gwen Galendez",
      "team": "armythyst"
    },
    {
      "username": "Danaya Lei Bayle",
      "team": "armythyst"
    },
    {
      "username": "Hart Carpio",
      "team": "armythyst"
    },
    {
      "username": "yamiibaybeh",
      "team": "bu"
    },
    {
      "username": "Serz_taekooker",
      "team": "bu"
    },
    {
      "username": "moooooooonchild7",
      "team": "bu"
    },
    {
      "username": "Jooniee2V",
      "team": "bu"
    },
    {
      "username": "i_aleesha",
      "team": "bu"
    },
    {
      "username": "mikroesme",
      "team": "bu"
    },
    {
      "username": "Perwinkle12",
      "team": "bu"
    },
    {
      "username": "purple_moonjin",
      "team": "bu"
    },
    {
      "username": "AgustD_D",
      "team": "bu"
    },
    {
      "username": "lauricson1",
      "team": "bu"
    },
    {
      "username": "Juvannise1",
      "team": "bu"
    },
    {
      "username": "in_hopesworld",
      "team": "bu"
    },
    {
      "username": "tastyfriedjimin ",
      "team": "bu"
    },
    {
      "username": "goldencalcium",
      "team": "bemojiken"
    },
    {
      "username": "moonjooned",
      "team": "bemojiken"
    },
    {
      "username": "mochi_x25",
      "team": "bemojiken"
    },
    {
      "username": "joonbf_",
      "team": "bemojiken"
    },
    {
      "username": "minitaetae",
      "team": "bemojiken"
    },
    {
      "username": "armysopforbts",
      "team": "bemojiken"
    },
    {
      "username": "yoongleshug",
      "team": "bemojiken"
    },
    {
      "username": "cherrybangtan",
      "team": "bemojiken"
    },
    {
      "username": "nashi",
      "team": "bemojiken"
    },
    {
      "username": "taaniswife",
      "team": "bemojiken"
    },
    {
      "username": "SKNMJeon7",
      "team": "bemojiken"
    },
    {
      "username": "pjmseeexc",
      "team": "bemojiken"
    },
    {
      "username": "7inLight",
      "team": "bemojiken"
    },
    {
      "username": "aliahzimonee",
      "team": "bemojiken"
    },
    {
      "username": "mehsaw",
      "team": "bemojiken"
    },
    {
      "username": "seraphicallypjm",
      "team": "bemojiken"
    },
    {
      "username": "serendipjminity",
      "team": "bemojiken"
    },
    {
      "username": "iamARGest",
      "team": "bemojiken"
    },
    {
      "username": "IndianBangtan7",
      "team": "bemojiken"
    },
    {
      "username": "haruniiu",
      "team": "bemojiken"
    },
    {
      "username": "ssilyoon",
      "team": "bemojiken"
    },
    {
      "username": "btsisgenre",
      "team": "bptw"
    },
    {
      "username": "tahmagutchi",
      "team": "bptw"
    },
    {
      "username": "nguyen_hang7",
      "team": "bptw"
    },
    {
      "username": "RArmy120",
      "team": "bptw"
    },
    {
      "username": "ajeonis",
      "team": "bptw"
    },
    {
      "username": "chokookies_",
      "team": "bptw"
    },
    {
      "username": "TearRosie ",
      "team": "bptw"
    },
    {
      "username": "vminforlife999",
      "team": "bptw"
    },
    {
      "username": "taEhYunG95_aMii",
      "team": "bptw"
    },
    {
      "username": "namujuniee",
      "team": "bptw"
    },
    {
      "username": "sunpinkies ",
      "team": "bptw"
    },
    {
      "username": "milkiesoxygen",
      "team": "bptw"
    },
    {
      "username": "1997nochu_",
      "team": "bptw"
    },
    {
      "username": "Felicitaejiin",
      "team": "bptw"
    },
    {
      "username": "jisohyuunn",
      "team": "bptw"
    },
    {
      "username": "jjkdrafts",
      "team": "bptw"
    },
    {
      "username": "JlM0CHI",
      "team": "bptw"
    },
    {
      "username": "pjmgcftgguk ",
      "team": "bptw"
    },
    {
      "username": "estemina",
      "team": "bptw"
    },
    {
      "username": "byaaaang_lyv",
      "team": "bptw"
    },
    {
      "username": "nuqqqe",
      "team": "bptw"
    },
    {
      "username": "katalinayya",
      "team": "bptw"
    },
    {
      "username": "euphoriafilter ",
      "team": "bulletproof"
    },
    {
      "username": "tanniebee",
      "team": "bulletproof"
    },
    {
      "username": "seokjungie",
      "team": "bulletproof"
    },
    {
      "username": "Lovelychimmy_",
      "team": "bulletproof"
    },
    {
      "username": "andcris__",
      "team": "bulletproof"
    },
    {
      "username": "namuknjj",
      "team": "bulletproof"
    },
    {
      "username": "cutelilsanshine",
      "team": "bulletproof"
    },
    {
      "username": "JiKoOk_iSrEaL94",
      "team": "bulletproof"
    },
    {
      "username": "hannayoonie",
      "team": "bulletproof"
    },
    {
      "username": "novitantsya",
      "team": "bulletproof"
    },
    {
      "username": "mhywinterbear_",
      "team": "bulletproof"
    },
    {
      "username": "enahsirish",
      "team": "bulletproof"
    },
    {
      "username": "jkvnuna",
      "team": "bulletproof"
    },
    {
      "username": "MCristel_1999",
      "team": "bulletproof"
    },
    {
      "username": "dilytear ",
      "team": "bulletproof"
    },
    {
      "username": "_loveBTS_army_",
      "team": "bulletproof"
    },
    {
      "username": "seokjinnie_131",
      "team": "bulletproof"
    },
    {
      "username": "arawinterbear",
      "team": "bulletproof"
    },
    {
      "username": "YourFriend_ARMY",
      "team": "bulletproof"
    },
    {
      "username": "_aphrodite07",
      "team": "bulletproof"
    },
    {
      "username": "Jeon_u_r_Love",
      "team": "bulletproof"
    },
    {
      "username": "BtsKoreasPride_",
      "team": "bulletproof"
    },
    {
      "username": "_bubblyjimim",
      "team": "bulletproof"
    },
    {
      "username": "sexcYO0NS",
      "team": "bulletproof"
    },
    {
      "username": "minxiaoyuu",
      "team": "bulletproof"
    },
    {
      "username": "riyaseeeel",
      "team": "bulletproof"
    },
    {
      "username": "wansyafia",
      "team": "bulletproof"
    },
    {
      "username": "jimmochi16pt2",
      "team": "bulletproof"
    },
    {
      "username": "sw7wendy_army",
      "team": "bvo1stchild"
    },
    {
      "username": "Jennie s",
      "team": "bvo1stchild"
    },
    {
      "username": "cielminn",
      "team": "bvo1stchild"
    },
    {
      "username": "bangtan_2692",
      "team": "bvo1stchild"
    },
    {
      "username": "redbunny93",
      "team": "bvo1stchild"
    },
    {
      "username": "jodie_pinkk",
      "team": "bvo1stchild"
    },
    {
      "username": "MyNaBTSOT7",
      "team": "bvo1stchild"
    },
    {
      "username": "taeMinhopefull1 ",
      "team": "bvo1stchild"
    },
    {
      "username": "seokiejin97",
      "team": "bvo1stchild"
    },
    {
      "username": "kljnf",
      "team": "bvo1stchild"
    },
    {
      "username": "Regine Pajunar Pajares",
      "team": "bvsc"
    },
    {
      "username": "Gerald Alfonso",
      "team": "bvsc"
    },
    {
      "username": "Keisha Husain",
      "team": "bvsc"
    },
    {
      "username": "Dheimme Tebbz",
      "team": "bvsc"
    },
    {
      "username": "Safari Dalingas",
      "team": "bvsc"
    },
    {
      "username": "Jashmine Castillon",
      "team": "bvsc"
    },
    {
      "username": "Desiree Joy Palisoc",
      "team": "bvsc"
    },
    {
      "username": "Mitch Ghail Silva",
      "team": "bvsc"
    },
    {
      "username": "Abigail Soriano",
      "team": "bvsc"
    },
    {
      "username": "Aes Kim",
      "team": "bvsc"
    },
    {
      "username": "Alliya Narciso",
      "team": "bvsc"
    },
    {
      "username": "Aly Jeon",
      "team": "bvsc"
    },
    {
      "username": "Alyssa Marie Calub",
      "team": "bvsc"
    },
    {
      "username": "Cassy Jeon Lauron",
      "team": "bvsc"
    },
    {
      "username": "Devonne Cheon",
      "team": "bvsc"
    },
    {
      "username": "Franz Fernando",
      "team": "bvsc"
    },
    {
      "username": "Joana Park",
      "team": "bvsc"
    },
    {
      "username": "Joyce Cruz",
      "team": "bvsc"
    },
    {
      "username": "Mai NJ",
      "team": "bvsc"
    },
    {
      "username": "Mics Jeon",
      "team": "bvsc"
    },
    {
      "username": "Minji Kun",
      "team": "bvsc"
    },
    {
      "username": "Oochie Woobin",
      "team": "bvsc"
    },
    {
      "username": "Riah Kim",
      "team": "bvsc"
    },
    {
      "username": "Shann Ashley Fajutang",
      "team": "bvsc"
    },
    {
      "username": "Sunny Van Gogh",
      "team": "bvsc"
    },
    {
      "username": "Wendie Benegas",
      "team": "bvsc"
    },
    {
      "username": "Alyanne Apigo",
      "team": "bvsc"
    },
    {
      "username": "Lorien Travero Nungay",
      "team": "bvsc"
    },
    {
      "username": "Beainne Josef",
      "team": "bvsc"
    },
    {
      "username": "Jeanyl Polea",
      "team": "bvsc"
    },
    {
      "username": "Juliean Boter",
      "team": "bvsc"
    },
    {
      "username": "Princess Mae Evasco",
      "team": "bvsc"
    },
    {
      "username": "Nicky Gajete",
      "team": "bvsc"
    },
    {
      "username": "Astraea Jane",
      "team": "bvsc"
    },
    {
      "username": "Sheryn Montoya",
      "team": "bvsc"
    },
    {
      "username": "Cami Noreen",
      "team": "bvsc"
    },
    {
      "username": "Lumilyn Sarto",
      "team": "bvsc"
    },
    {
      "username": "Nit Siran",
      "team": "bvsc"
    },
    {
      "username": "Jezaiya Min",
      "team": "bvsc"
    },
    {
      "username": "Jhean Claudine",
      "team": "bvsc"
    },
    {
      "username": "Kristel Joy",
      "team": "bvsc"
    },
    {
      "username": "Liane Keith",
      "team": "bvsc"
    },
    {
      "username": "Rodielyn Manera",
      "team": "bvsc"
    },
    {
      "username": "Czarina Cueva",
      "team": "bvsc"
    },
    {
      "username": "Allysa Gabrielle",
      "team": "bvsc"
    },
    {
      "username": "Yanni",
      "team": "epipanthy"
    },
    {
      "username": "Bea Alyssa",
      "team": "epipanthy"
    },
    {
      "username": "Dianne Tampan",
      "team": "epipanthy"
    },
    {
      "username": "Marielle Maranan",
      "team": "epipanthy"
    },
    {
      "username": "taekolaaaay",
      "team": "epipanthy"
    },
    {
      "username": "Trisha Elaine",
      "team": "epipanthy"
    },
    {
      "username": "TineJK",
      "team": "epipanthy"
    },
    {
      "username": "Zhaira Encarnacion ",
      "team": "epipanthy"
    },
    {
      "username": "Patricia Mae Maranan",
      "team": "epipanthy"
    },
    {
      "username": "lyra damaso",
      "team": "epipanthy"
    },
    {
      "username": "maknaeelle7",
      "team": "epipanthy"
    },
    {
      "username": "Anjielyn",
      "team": "epipanthy"
    },
    {
      "username": "Trix Kim",
      "team": "epipanthy"
    },
    {
      "username": "Jeon July Agustd",
      "team": "epipanthy"
    },
    {
      "username": "Shiela kim",
      "team": "epipanthy"
    },
    {
      "username": "Yachi",
      "team": "epipanthy"
    },
    {
      "username": "Shanara Rheign",
      "team": "epipanthy"
    },
    {
      "username": "Kayla Melgazo",
      "team": "epipanthy"
    },
    {
      "username": "cheeseisarmy",
      "team": "epipanthy"
    },
    {
      "username": "jjgful",
      "team": "epipanthy"
    },
    {
      "username": "Kate Cruz",
      "team": "epipanthy"
    },
    {
      "username": "Des Pacito",
      "team": "epipanthy"
    },
    {
      "username": "Cristine Paican",
      "team": "epipanthy"
    },
    {
      "username": "tham_901",
      "team": "hopeworld"
    },
    {
      "username": "army7_snowwhite",
      "team": "hopeworld"
    },
    {
      "username": "Rapjin_kore",
      "team": "hopeworld"
    },
    {
      "username": "kenwithbts",
      "team": "hopeworld"
    },
    {
      "username": "purpleborahae98",
      "team": "hopeworld"
    },
    {
      "username": "WeRBulletpruf",
      "team": "hopeworld"
    },
    {
      "username": "illegvr!",
      "team": "hopeworld"
    },
    {
      "username": "plantaegguk_",
      "team": "hopeworld"
    },
    {
      "username": "BornToSlay97",
      "team": "hopeworld"
    },
    {
      "username": "jay_huen_gguk",
      "team": "hopeworld"
    },
    {
      "username": "Jeon9Kooky",
      "team": "hopeworld"
    },
    {
      "username": "ashtonaRMy",
      "team": "hopeworld"
    },
    {
      "username": "Ice_Cookies_",
      "team": "hopeworld"
    },
    {
      "username": "jeon_yoongrace",
      "team": "hopeworld"
    },
    {
      "username": "igotjoonieverse",
      "team": "hopeworld"
    },
    {
      "username": "sjsearth",
      "team": "hopeworld"
    },
    {
      "username": "Aira Moreno",
      "team": "impiedstor"
    },
    {
      "username": "imillegirlden",
      "team": "impiedstor"
    },
    {
      "username": "Cristine Jean Cabintoy",
      "team": "impiedstor"
    },
    {
      "username": "Ronniella Tizo",
      "team": "impiedstor"
    },
    {
      "username": "Bora Park",
      "team": "impiedstor"
    },
    {
      "username": "Monifah Pal-ing",
      "team": "impiedstor"
    },
    {
      "username": "thriellejk",
      "team": "impiedstor"
    },
    {
      "username": "Precious Justado",
      "team": "impiedstor"
    },
    {
      "username": "Jasmine Shayne Bodiongan",
      "team": "impiedstor"
    },
    {
      "username": "Jennifer Abregado",
      "team": "impiedstor"
    },
    {
      "username": "Joanna mae molina",
      "team": "impiedstor"
    },
    {
      "username": "Kimberly Nuñez Paburada",
      "team": "impiedstor"
    },
    {
      "username": "Bernadette Rivera",
      "team": "impiedstor"
    },
    {
      "username": "clarisse villalva",
      "team": "impiedstor"
    },
    {
      "username": "Allyza Denise Mangubat",
      "team": "impiedstor"
    },
    {
      "username": "Shirmine Solis Balog",
      "team": "impiedstor"
    },
    {
      "username": "Aira Shiene Gardiola",
      "team": "impiedstor"
    },
    {
      "username": "Mhea Kim",
      "team": "impiedstor"
    },
    {
      "username": "Kimberly Mae Arnaez",
      "team": "impiedstor"
    },
    {
      "username": "Cryslyn Magnanao ",
      "team": "impiedstor"
    },
    {
      "username": "Reverie JH",
      "team": "impiedstor"
    },
    {
      "username": "Jhanna Kim",
      "team": "impiedstor"
    },
    {
      "username": "Shane Bendicio",
      "team": "impiedstor"
    },
    {
      "username": "Sameey Arredondo",
      "team": "impiedstor"
    },
    {
      "username": "Shiela Marie",
      "team": "impiedstor"
    },
    {
      "username": "Josralive De la Cruz",
      "team": "impiedstor"
    },
    {
      "username": "shannieyah",
      "team": "impiedstor"
    },
    {
      "username": "Roxette Joy",
      "team": "impiedstor"
    },
    {
      "username": "Mariella Magabo",
      "team": "impiedstor"
    },
    {
      "username": "Raven Guanzon",
      "team": "impiedstor"
    },
    {
      "username": "Ean Rose Lavina",
      "team": "impiedstor"
    },
    {
      "username": "Karylle Mish Gellica",
      "team": "impiedstor"
    },
    {
      "username": "Bea Lagalangan",
      "team": "impiedstor"
    },
    {
      "username": "Eyah Jeon",
      "team": "impiedstor"
    },
    {
      "username": "jikook_stars",
      "team": "impiedstor"
    },
    {
      "username": "Giang Dao",
      "team": "kimseokjin"
    },
    {
      "username": "Min Fella",
      "team": "kimseokjin"
    },
    {
      "username": "Jeeh Villadelgado",
      "team": "kimseokjin"
    },
    {
      "username": "대대",
      "team": "kimseokjin"
    },
    {
      "username": "moonie jeon",
      "team": "kimseokjin"
    },
    {
      "username": "Cristine Capoy",
      "team": "kimseokjin"
    },
    {
      "username": "Kenshin Abeño",
      "team": "kimseokjin"
    },
    {
      "username": "Thanh Tâm Trần Nguyễn",
      "team": "kimseokjin"
    },
    {
      "username": "Irish Kim",
      "team": "kimseokjin"
    },
    {
      "username": "Rhaslie Cuevas",
      "team": "kimseokjin"
    },
    {
      "username": "bangtangguk78",
      "team": "lajibolala"
    },
    {
      "username": "Ggukieeeeeee",
      "team": "lajibolala"
    },
    {
      "username": "AmyWD4",
      "team": "lajibolala"
    },
    {
      "username": "jeykeysillegirl",
      "team": "lajibolala"
    },
    {
      "username": "ynahjva",
      "team": "lajibolala"
    },
    {
      "username": "ot7btsbias ",
      "team": "lajibolala"
    },
    {
      "username": "jaykayparadise",
      "team": "lajibolala"
    },
    {
      "username": "v_kans ",
      "team": "lajibolala"
    },
    {
      "username": "Goldnkookiejeon",
      "team": "lajibolala"
    },
    {
      "username": "Minyeon055 ",
      "team": "lajibolala"
    },
    {
      "username": "_InfiresGurl",
      "team": "lajibolala"
    },
    {
      "username": "mygqueen",
      "team": "lajibolala"
    },
    {
      "username": "royahighness",
      "team": "lajibolala"
    },
    {
      "username": "Jkookie💜Be 7",
      "team": "lajibolala"
    },
    {
      "username": "honigmaroni",
      "team": "lajibolala"
    },
    {
      "username": "ayndjk",
      "team": "lajibolala"
    },
    {
      "username": "flwrjimin",
      "team": "lajibolala"
    },
    {
      "username": "jieunyg",
      "team": "lajibolala"
    },
    {
      "username": "lilfunk_nsoul",
      "team": "lajibolala"
    },
    {
      "username": "solitudear7",
      "team": "lajibolala"
    },
    {
      "username": "abbykikon",
      "team": "lajibolala"
    },
    {
      "username": "changalquiza",
      "team": "laserpointer"
    },
    {
      "username": "taeyasshibb",
      "team": "laserpointer"
    },
    {
      "username": "ultrm_a",
      "team": "laserpointer"
    },
    {
      "username": "4everr_7",
      "team": "laserpointer"
    },
    {
      "username": "Rose7Micdrop",
      "team": "laserpointer"
    },
    {
      "username": "CakeDing",
      "team": "laserpointer"
    },
    {
      "username": "beschtxeva",
      "team": "laserpointer"
    },
    {
      "username": "pwaciers",
      "team": "laserpointer"
    },
    {
      "username": "tatarjchimbts",
      "team": "laserpointer"
    },
    {
      "username": "janiellav",
      "team": "laserpointer"
    },
    {
      "username": "pohsm6",
      "team": "laserpointer"
    },
    {
      "username": "sean_ctg",
      "team": "laserpointer"
    },
    {
      "username": "lssmie",
      "team": "laserpointer"
    },
    {
      "username": "chenabyss7",
      "team": "laserpointer"
    },
    {
      "username": "19970901net_jk",
      "team": "laserpointer"
    },
    {
      "username": "Strongpowerrrr",
      "team": "laserpointer"
    },
    {
      "username": "yccyt",
      "team": "laserpointer"
    },
    {
      "username": "WangTsi",
      "team": "laserpointer"
    },
    {
      "username": "Al_armybangwool",
      "team": "laserpointer"
    },
    {
      "username": "koosweaters",
      "team": "laserpointer"
    },
    {
      "username": "cloudiekey",
      "team": "laserpointer"
    },
    {
      "username": "Mm090393",
      "team": "laserpointer"
    },
    {
      "username": "inkee720",
      "team": "laserpointer"
    },
    {
      "username": "abrtmsyforever7",
      "team": "laserpointer"
    },
    {
      "username": "seokdennieee",
      "team": "laserpointer"
    },
    {
      "username": "VKaphroditee",
      "team": "laserpointer"
    },
    {
      "username": "eeoael7",
      "team": "laserpointer"
    },
    {
      "username": "kookie74253552",
      "team": "laserpointer"
    },
    {
      "username": "bora_bo613",
      "team": "laserpointer"
    },
    {
      "username": "Cecilia_lvarez",
      "team": "laserpointer"
    },
    {
      "username": "PJMTheItBoy95",
      "team": "laserpointer"
    },
    {
      "username": "lovetaegukk ",
      "team": "laserpointer"
    },
    {
      "username": "shyyy7_",
      "team": "laserpointer"
    },
    {
      "username": "ot7_iam",
      "team": "laserpointer"
    },
    {
      "username": "Blueand_Grey7",
      "team": "laserpointer"
    },
    {
      "username": "bomnal_52",
      "team": "laserpointer"
    },
    {
      "username": "maneesha_kp",
      "team": "laserpointer"
    },
    {
      "username": "hcohnmit",
      "team": "laserpointer"
    },
    {
      "username": "beakiebunn128",
      "team": "laserpointer"
    },
    {
      "username": "koogiks",
      "team": "laserpointer"
    },
    {
      "username": "bangtan_orbit",
      "team": "laserpointer"
    },
    {
      "username": "yio_bts",
      "team": "laserpointer"
    },
    {
      "username": "dkssk_91",
      "team": "lejindary"
    },
    {
      "username": "lizette_twt",
      "team": "lejindary"
    },
    {
      "username": "parkmochiii13 ",
      "team": "lejindary"
    },
    {
      "username": "aurantifolias",
      "team": "lejindary"
    },
    {
      "username": "preethi_77",
      "team": "lejindary"
    },
    {
      "username": "sarang_minimini",
      "team": "lejindary"
    },
    {
      "username": "Loves_kookie_99",
      "team": "lejindary"
    },
    {
      "username": "rsch271",
      "team": "lejindary"
    },
    {
      "username": "Rizeo01",
      "team": "lejindary"
    },
    {
      "username": "Buttaerflyking",
      "team": "lejindary"
    },
    {
      "username": "toyouth99",
      "team": "presidentnamjoon"
    },
    {
      "username": "moonflower1821",
      "team": "presidentnamjoon"
    },
    {
      "username": "Gopzzz7",
      "team": "presidentnamjoon"
    },
    {
      "username": "_mmmera",
      "team": "presidentnamjoon"
    },
    {
      "username": "ourjhs",
      "team": "presidentnamjoon"
    },
    {
      "username": "boymeetsevil_7",
      "team": "presidentnamjoon"
    },
    {
      "username": "btserita",
      "team": "presidentnamjoon"
    },
    {
      "username": "masayumgc",
      "team": "presidentnamjoon"
    },
    {
      "username": "LaNa3PinkCherry",
      "team": "presidentnamjoon"
    },
    {
      "username": "NevesBTS",
      "team": "presidentnamjoon"
    },
    {
      "username": "MadihaRMy_94",
      "team": "presidentnamjoon"
    },
    {
      "username": "vanteiab",
      "team": "presidentnamjoon"
    },
    {
      "username": "doyaddaeng",
      "team": "presidentnamjoon"
    },
    {
      "username": "Purple Mina",
      "team": "presidentnamjoon"
    },
    {
      "username": "zhinilovesrjin",
      "team": "yeontan"
    },
    {
      "username": "jminsbabe",
      "team": "yeontan"
    },
    {
      "username": "miska2019",
      "team": "yeontan"
    },
    {
      "username": "zaiclues",
      "team": "yeontan"
    },
    {
      "username": "freyandipity",
      "team": "yeontan"
    },
    {
      "username": "ggukssmiley",
      "team": "yeontan"
    },
    {
      "username": "J06132013",
      "team": "yeontan"
    },
    {
      "username": "tae_orphic",
      "team": "yeontan"
    },
    {
      "username": "alkooks",
      "team": "yeontan"
    },
    {
      "username": "prettymite7",
      "team": "yeontan"
    },
    {
      "username": "lachimo_lala28",
      "team": "yeontan"
    },
    {
      "username": "carebearot7",
      "team": "yeontan"
    },
    {
      "username": "jinluvpinkeu_",
      "team": "yeontan"
    },
    {
      "username": "chimfairy_sham",
      "team": "yeontan"
    },
    {
      "username": "justin_jjeon",
      "team": "yeontan"
    },
    {
      "username": "_excujimeee ",
      "team": "yeontan"
    },
    {
      "username": "RAPLINER_",
      "team": "yeontan"
    },
    {
      "username": "sighjusbeacause",
      "team": "iheartbvo"
    },
    {
      "username": "TuttiDB",
      "team": "iheartbvo"
    },
    {
      "username": "DJYOONIE",
      "team": "iheartbvo"
    },
    {
      "username": "kkw9670",
      "team": "iheartbvo"
    },
    {
      "username": "Analuzzi2",
      "team": "iheartbvo"
    },
    {
      "username": "lauraholmes1980",
      "team": "iheartbvo"
    },
    {
      "username": "lesleyjperry",
      "team": "iheartbvo"
    },
    {
      "username": "mikrokosmosiss",
      "team": "iheartbvo"
    },
    {
      "username": "kookieeTaeji",
      "team": "iheartbvo"
    },
    {
      "username": "ItzSunsetMSP",
      "team": "iheartbvo"
    },
    {
      "username": "Coffee_Moon96",
      "team": "iheartbvo"
    },
    {
      "username": "7Denelera",
      "team": "iheartbvo"
    },
    {
      "username": "gobeyondbts",
      "team": "iheartbvo"
    },
    {
      "username": "Hata1_twt",
      "team": "iheartbvo"
    },
    {
      "username": "BangtanBlacSwan",
      "team": "iheartbvo"
    },
    {
      "username": "Felizjaa",
      "team": "iheartbvo"
    },
    {
      "username": "lauraholmes1980",
      "team": "iheartbvo"
    },
    {
      "username": "Analuzzi2",
      "team": "iheartbvo"
    },
    {
      "username": "bemypebble",
      "team": "iheartbvo"
    },
    {
      "username": "novalleris",
      "team": "iheartbvo"
    },
    {
      "username": "beyourself08sa",
      "team": "iheartbvo"
    },
    {
      "username": "hoberng3",
      "team": "iheartbvo"
    },
    {
      "username": "elachiluvsbts",
      "team": "iheartbvo"
    },
    {
      "username": "breathesgelatin",
      "team": "iheartbvo"
    }
   ]


export default async (req, res) => {
    const { db } = await connectToDatabase();
    const data = await db
      .collection("whitelist")
      .insertMany(items)
    res.json(data.result);
  };
// Content voor de drie behandelcategorie-landingspagina's. De bijbehorende
// prijzen worden live uit Supabase gehaald (zie lib/content.js) op basis van
// de 'categories' hieronder — dus prijzen hoeven maar op één plek (het
// beheerpaneel) bijgehouden te worden.

export const TREATMENT_PAGES = [
  {
    slug: "gezichtsbehandelingen",
    name: "Gezichtsbehandelingen",
    icon: "face",
    categories: ["Gezicht"],
    heroTitle: "Gezichtsbehandelingen bij Beauty by Nodiy",
    heroSubtitle:
      "Van een verfrissende basisbehandeling tot geavanceerde huidverbetering met microdermabrasie, dermapen of oxygeneo — bij Beauty by Nodiy in Nieuwegein vind je een gezichtsbehandeling die past bij jouw huid.",
    intro:
      "Een goede gezichtsbehandeling doet meer dan even lekker ontspannen. Het is een moment waarop er echt naar je huid wordt gekeken: wat heeft ze nodig, waar zit onzuiverheid, waar mag de huidvernieuwing een handje geholpen worden. Bij Beauty by Nodiy begint elke gezichtsbehandeling met een goed gesprek en een grondige reiniging, en bouwen we van daaruit verder op naar de behandeling die het beste bij jouw huid past.\n\nGeen twee huiden zijn hetzelfde, en dat is precies waarom er bij Beauty by Nodiy niet één standaardbehandeling is, maar een heel palet aan mogelijkheden. Heb je een doffe teint die om een oppepper vraagt? Dan is een deepcleansing behandeling of een Ado peeling misschien wel precies wat je zoekt. Merk je fijne lijntjes, oneffenheden of een oneven huidtextuur? Dan kan microdermabrasie, eventueel gecombineerd met dermapen, veel verschil maken. En voor wie serieus aan huidverbetering wil werken, zijn er intensievere behandelingen zoals oxygeneo of een combinatie van meerdere technieken in één sessie.\n\nMicrodermabrasie werkt door de bovenste, dode huidcellen voorzichtig weg te schuren, waardoor de huid direct frisser aanvoelt en producten daarna beter opgenomen worden. Dermapen gaat een stap verder: met piepkleine naaldjes wordt de huid gestimuleerd om zelf meer collageen aan te maken, wat op de langere termijn zorgt voor een steviger en gladder huidbeeld. Oxygeneo combineert reiniging, exfoliatie en zuurstoftoevoer in één behandeling, en is daarmee een populaire keuze voor wie in één sessie meerdere voordelen wil combineren.\n\nWat al deze behandelingen gemeen hebben, is de aandacht die eraan wordt besteed. Er wordt geen haast gemaakt: elke stap, van reiniging tot het uiteindelijke masker en de dagverzorging, krijgt de tijd die nodig is. Zo kom je niet alleen met een frissere huid, maar ook ontspannen de deur weer uit. En omdat huid verandert met de seizoenen, hormonen en leeftijd, is het ook prima om af en toe van behandeling te wisselen — wat vandaag werkt, hoeft over een half jaar niet meer de beste keuze te zijn, en dat bespreken we dan gewoon opnieuw tijdens de intake.",
    forWho: [
      "Iedereen die zijn of haar huid een grondige verzorgingsbeurt wil geven",
      "Wie worstelt met een doffe teint, onzuiverheden of fijne lijntjes",
      "Mensen die specifiek huidverbetering zoeken, zoals bij littekens of pigmentvlekken",
      "Wie voorafgaand aan een speciale gelegenheid stralend voor de dag wil komen",
      "Wie structureel aan huidverjonging wil werken met een reeks behandelingen",
      "Mensen die nieuwsgierig zijn naar geavanceerdere technieken zoals dermapen of oxygeneo",
    ],
    whatToExpect: [
      "Een intakegesprek waarin we samen kijken naar de staat van je huid en je wensen bespreken",
      "Grondige reiniging en het zorgvuldig verwijderen van onzuiverheden",
      "Een behandeling op maat: van basisreiniging tot microdermabrasie, dermapen of oxygeneo",
      "Bij de intensievere behandelingen: vapozone om de poriën te openen voor een dieper resultaat",
      "Afsluiting met een verzorgend masker en geschikte dagverzorging",
      "Persoonlijk advies voor huidverzorging thuis, afgestemd op jouw huidtype",
    ],
    steps: [
      { title: "Intake", text: "We bespreken je huid, eventuele klachten en wat je hoopt te bereiken, zodat de behandeling precies aansluit bij jouw wensen." },
      { title: "Behandeling", text: "Reiniging, onzuiverheden verwijderen, en de gekozen intensievere stap zoals microdermabrasie, dermapen of oxygeneo, rustig en met aandacht uitgevoerd." },
      { title: "Nazorg", text: "Een verzorgend masker en passende dagverzorging, plus concreet advies voor thuis om het resultaat te behouden." },
    ],
    faqs: [
      { q: "Welke gezichtsbehandeling past bij mij?", a: "Dat hangt af van je huidtype en wat je wilt bereiken. Twijfel je, bel of app gerust — we denken graag met je mee, of je kiest voor een basisbehandeling om kennis te maken met je huid en de mogelijkheden." },
      { q: "Doet microdermabrasie of dermapen pijn?", a: "De meeste cliënten ervaren het als een tintelend of licht schurend gevoel, geen scherpe pijn. We passen de intensiteit altijd aan op wat voor jou prettig is, en bespreken vooraf wat je kunt verwachten." },
      { q: "Hoe vaak kan ik een gezichtsbehandeling laten doen?", a: "Voor de meeste behandelingen geldt: eens in de 4 tot 6 weken voor een merkbaar en blijvend resultaat, maar dat verschilt per behandeling en huidtype. Bij intensievere trajecten stellen we samen een passend schema op." },
      { q: "Kan ik met een gevoelige huid ook terecht?", a: "Zeker. Geef dit gewoon aan tijdens de intake, dan stemmen we de behandeling, de intensiteit en de gebruikte producten daarop af, zodat de behandeling comfortabel blijft." },
      { q: "Wat is het verschil tussen microdermabrasie en dermapen?", a: "Microdermabrasie werkt aan de oppervlakte van de huid en verwijdert dode huidcellen, terwijl dermapen met kleine naaldjes de huid stimuleert tot collageenproductie. Ze kunnen los ingezet worden, maar ook gecombineerd voor een intensiever resultaat." },
      { q: "Hoe lang duurt een gemiddelde gezichtsbehandeling?", a: "Dat verschilt per behandeling, van ongeveer 45 minuten voor een basisbehandeling tot 60 à 70 minuten voor de meer uitgebreide, gecombineerde behandelingen." },
    ],
  },
  {
    slug: "lichaam",
    name: "Lichaam",
    icon: "spark",
    categories: ["Lichaam", "Verven", "Laser behandeling", "Laser pakketprijzen", "Elektrisch epileren"],
    heroTitle: "Ontharen en lichaamsverzorging bij Beauty by Nodiy",
    heroSubtitle:
      "Van harsen tot laserontharing en elektrisch epileren, van wenkbrauwen verven tot een compleet pakket voor het hele lichaam — bij Beauty by Nodiy kun je terecht voor alle vormen van ontharing en lichaamsverzorging.",
    intro:
      "Ontharen is voor iedereen anders: de een wil een snelle harsbehandeling voor een gladde huid deze week, de ander kiest voor laserontharing juist om er op termijn vanaf te zijn. Bij Beauty by Nodiy bieden we beide, plus elektrisch epileren voor de allerfijnste haartjes en hardnekkige plekjes, en verven van wenkbrauwen en wimpers voor een subtiel, verzorgd resultaat.\n\nHarsen is nog altijd de meest gekozen methode voor wie snel en zonder poespas van ongewenste haargroei af wil. Van een simpele bovenlip tot complete beenharsen: het resultaat is meteen zichtbaar en de huid voelt weken glad aan. Voor wie liever investeert in een blijvender oplossing, is laserontharing een logische stap. Met herhaalde behandelingen wordt de haarfollikel steeds verder verzwakt, waardoor de haargroei op termijn merkbaar afneemt — ideaal voor grotere zones zoals benen, armen of de rug.\n\nSoms zijn het juist de kleine, hardnekkige plekjes die het meeste ergernis geven: een enkel donker haartje op de kin, een paar koppige haartjes die harsen of laser niet goed te pakken krijgen. Daarvoor is elektrisch epileren de meest precieze methode: haar voor haar, met een naaldje in de follikel, zodat ook de fijnste en lichtste haartjes verwijderd kunnen worden.\n\nEn niet alles draait om ontharen: het verven van wenkbrauwen en wimpers geeft je blik meteen meer diepte en definitie, zonder dat je daar dagelijks make-up voor nodig hebt. Welke methode het beste bij je past, hangt af van je huid, je haargroei en wat je op de lange termijn wilt bereiken — daar denken we graag met je in mee tijdens een intake.",
    forWho: [
      "Wie snel en tijdelijk van ongewenste haargroei af wil (harsen)",
      "Wie op de lange termijn wil investeren in minder haargroei (laserontharing)",
      "Mensen met fijne, hardnekkige haartjes die harsen of laser lastig te pakken krijgen (elektrisch epileren)",
      "Wie wenkbrauwen of wimpers een subtiel, definiërend kleurtje wil geven",
      "Mensen die een compleet pakket zoeken, bijvoorbeeld voor benen, bikinilijn, oksels en bovenlip samen",
      "Wie twijfelt tussen methodes en advies op maat wil",
    ],
    whatToExpect: [
      "Een intake waarin we bespreken welke methode het beste bij jouw huid en wensen past",
      "Harsen: snel, effectief, resultaat voor twee tot vier weken",
      "Laserontharing: opbouw in meerdere sessies, op termijn merkbaar minder haargroei",
      "Elektrisch epileren: per haartje, ideaal voor kleine of hardnekkige plekjes",
      "Verven van wenkbrauwen en/of wimpers: subtiel resultaat dat enkele weken meegaat",
      "Advies over de beste combinatie van methodes als je meerdere zones wilt behandelen",
    ],
    steps: [
      { title: "Intake", text: "We kijken naar je huidtype, haargroei en wensen, en adviseren de best passende methode voor jouw situatie." },
      { title: "Behandeling", text: "Harsen, laserontharing, elektrisch epileren of verven — uitgevoerd met aandacht voor jouw comfort en huid." },
      { title: "Vervolgafspraken", text: "Voor laser en elektrisch epileren plannen we samen een passend behandelschema, zodat je precies weet wat je kunt verwachten." },
    ],
    faqs: [
      { q: "Wat is het verschil tussen harsen en laserontharing?", a: "Harsen geeft een tijdelijk resultaat van twee tot vier weken. Laserontharing richt zich op de haarfollikel zelf en zorgt bij herhaalde behandelingen voor blijvend minder haargroei op de langere termijn." },
      { q: "Hoeveel laserbehandelingen heb ik nodig?", a: "Dat verschilt per persoon en haartype, maar reken meestal op meerdere sessies verspreid over enkele maanden voor het beste resultaat, omdat haar in verschillende groeifases zit." },
      { q: "Is elektrisch epileren geschikt voor mijn hele lichaam?", a: "Elektrisch epileren werkt per haartje en is daarom vooral geschikt voor kleinere gebieden of hardnekkige plekjes, niet voor grote oppervlaktes zoals complete benen." },
      { q: "Kan ik tijdens de zwangerschap laserontharing laten doen?", a: "We raden dit af tijdens de zwangerschap. Overleg bij twijfel altijd eerst met ons of je (huis)arts, dan kijken we samen naar een geschikt alternatief." },
      { q: "Kan ik meerdere zones combineren in één afspraak?", a: "Ja, dat kan vaak prima, en er zijn ook pakketprijzen beschikbaar voor bijvoorbeeld benen, bikinilijn, oksels en bovenlip samen. Bel of app ons voor de mogelijkheden." },
      { q: "Hoe bereid ik me voor op een harsbehandeling?", a: "Zorg dat het haar minimaal enkele millimeters lang is, en vermijd zongebruik of een zonnebank vlak voor en na de behandeling voor het beste en meest comfortabele resultaat." },
    ],
  },
  {
    slug: "medische-pedicure",
    name: "Medische pedicure",
    icon: "foot",
    categories: ["Medische pedicure"],
    heroTitle: "Medische pedicure bij Beauty by Nodiy",
    heroSubtitle:
      "Een medische pedicure voor gezonde, verzorgde voeten — met aandacht voor specifieke klachten zoals eelt, likdoorns, ingegroeide nagels of een diabetische voet.",
    intro:
      "Een medische pedicure is meer dan een verzorgingsbeurt: het is gerichte zorg voor je voeten, uitgevoerd door iemand die weet waar ze naar moet kijken. Bij Beauty by Nodiy starten we altijd met een uitgebreide intake, want elk voetprobleem vraagt om een eigen aanpak.\n\nVeel mensen komen met heel herkenbare klachten: opgebouwd eelt onder de bal van de voet, een pijnlijke likdoorn tussen de tenen, of een nagel die steeds weer de neiging heeft in te groeien. Andere klachten vragen om extra behoedzaamheid, bijvoorbeeld bij diabetes, waarbij de doorbloeding en het gevoel in de voeten verminderd kunnen zijn. Juist dan is het belangrijk dat een pedicure weet waar op te letten, en niet zomaar met scherp gereedschap aan de slag gaat.\n\nOok schoeisel speelt vaak een rol bij voetklachten. Schoenen die net iets te strak zitten, hakken die de druk verkeerd verdelen, of juist te platte zolen zonder enige ondersteuning: het zijn allemaal factoren die op termijn eelt, drukplekken of zelfs blaren kunnen veroorzaken. Tijdens de intake kijken we daarom niet alleen naar de voet zelf, maar denken we ook mee over wat er in het dagelijks leven aan bijdraagt, zodat het advies dat je meekrijgt echt bruikbaar is.\n\nNa de intake volgt de behandeling zelf, rustig en zonder haast: eelt en likdoorns worden voorzichtig verwijderd, nagels bijgewerkt en waar nodig verzorgd, en de huid krijgt aandacht waar ze dat nodig heeft. Zo lopen je voeten er weer verzorgd en soepel bij, en verklein je bovendien de kans op nieuwe klachten. We geven ook altijd praktisch advies mee voor thuis, zodat je zelf ook goed voor je voeten kunt blijven zorgen tussen de behandelingen door — van de juiste crème tot simpele tips om eelt niet steeds terug te laten komen.",
    forWho: [
      "Wie last heeft van eelt, likdoorns of verharde huid",
      "Mensen met ingegroeide of dikke, moeilijk te knippen nagels",
      "Wie een kwetsbare huid heeft, bijvoorbeeld door diabetes of een verminderde doorbloeding",
      "Mensen die vaak blaren, drukplekken of eeltvorming krijgen door schoeisel",
      "Iedereen die zijn voeten gewoon eens goed verzorgd wil hebben",
      "Wie na de zomer of het dragen van sandalen extra aandacht aan de voeten wil besteden",
    ],
    whatToExpect: [
      "Een uitgebreide intake waarin we je voeten en eventuele klachten in kaart brengen",
      "Verwijderen van eelt en likdoorns, rustig en met de juiste technieken",
      "Verzorging van de nagels, ook bij ingegroeide of verdikte nagels",
      "Extra aandacht voor kwetsbare plekken of specifieke klachten zoals diabetes",
      "Advies voor thuisverzorging tussen de behandelingen door",
    ],
    steps: [
      { title: "Intake", text: "We bekijken je voeten, bespreken klachten en eventuele medische aandachtspunten zoals diabetes, zodat de behandeling daarop is afgestemd." },
      { title: "Behandeling", text: "Rustig en gericht: eelt en likdoorns verwijderen, nagels verzorgen, huid verzachten waar nodig." },
      { title: "Advies", text: "Tips voor thuisverzorging en, indien nodig, een vervolgafspraak om klachten in de gaten te houden." },
    ],
    faqs: [
      { q: "Is een intake echt verplicht?", a: "Ja, bij een medische pedicure starten we altijd met een intake. Zo weten we precies wat je voeten nodig hebben en kunnen we eventuele aandachtspunten, zoals diabetes, goed meenemen in de behandeling." },
      { q: "Ik heb diabetes, kan ik hier terecht?", a: "Zeker, medische pedicure is juist bedoeld voor kwetsbare voeten. Geef dit aan bij het maken van de afspraak, dan houden we hier tijdens de hele behandeling extra rekening mee." },
      { q: "Hoe vaak heb ik een medische pedicure nodig?", a: "Dat hangt af van je voeten en klachten. Voor de meeste mensen is eens in de vier tot zes weken een goed ritme om klachten onder controle te houden." },
      { q: "Doet een medische pedicure pijn?", a: "Nee, de behandeling is erop gericht om juist klachten te verminderen. Heb je een gevoelige plek, geef dit dan gerust aan tijdens de behandeling, zodat we daar rekening mee houden." },
      { q: "Wat als mijn nagel al ontstoken is door ingroei?", a: "Neem in dat geval contact op zodat we kunnen inschatten wat de beste aanpak is — soms is eerst een bezoek aan de huisarts verstandig, soms kunnen we direct verlichting bieden." },
      { q: "Kan ik ook terecht als ik alleen mijn nagels netjes wil hebben?", a: "Zeker, niet elke afspraak hoeft om een specifieke klacht te draaien. Veel cliënten komen simpelweg voor onderhoud: nette, verzorgde nagels en een huid die soepel aanvoelt." },
    ],
  },
];

export function getTreatmentPage(slug) {
  return TREATMENT_PAGES.find((p) => p.slug === slug) || null;
}

// Zet een lang, ononderbroken verhaal om in een korte "lead"-zin plus
// nette, goed leesbare alinea's — ook als de brontekst geen dubbele
// regelafbrekingen bevat (bijvoorbeeld na bewerken via het beheerpaneel).
export function formatStory(text) {
  if (!text) return { lead: "", paragraphs: [] };

  const clean = text.trim();

  // Alinea's op basis van bestaande lege regels
  let paragraphs = clean
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  // Geen (of maar 1) alinea gevonden → knip zelf op in stukken van ~3 zinnen
  if (paragraphs.length <= 1) {
    const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) || [clean];
    paragraphs = [];
    for (let i = 0; i < sentences.length; i += 3) {
      paragraphs.push(
        sentences
          .slice(i, i + 3)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim()
      );
    }
  }

  // Eerste zin van de eerste alinea wordt de uitgelichte "lead"-zin
  const [firstParagraph, ...rest] = paragraphs;
  const leadMatch = firstParagraph.match(/^[^.!?]+[.!?]+/);
  const lead = leadMatch ? leadMatch[0].trim() : firstParagraph;
  const remainder = leadMatch ? firstParagraph.slice(lead.length).trim() : "";

  const bodyParagraphs = remainder ? [remainder, ...rest] : rest;

  return { lead, paragraphs: bodyParagraphs };
}

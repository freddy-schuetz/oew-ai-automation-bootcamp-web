// Muster C: Provider + Modell an einer Stelle.
// Der Default-Provider liest ANTHROPIC_API_KEY automatisch aus der Env.
import { anthropic } from "@ai-sdk/anthropic";

// Günstig wegen gemeinsamem Bootcamp-Key (Claude Sonnet 5: 2 $ Input / 10 $ Output pro 1 Mio. Tokens).
export const getModel = () => anthropic("claude-sonnet-5");

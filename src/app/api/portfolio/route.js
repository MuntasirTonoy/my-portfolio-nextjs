import { getPortfolio } from "@/lib/portfolio";
import { json, handleError } from "@/lib/http";

export async function GET() {
  try {
    return json(await getPortfolio());
  } catch (error) {
    return handleError("Fetch portfolio error", error);
  }
}

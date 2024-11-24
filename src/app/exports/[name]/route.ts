import { readFileSync } from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const name = (await params).name;
  const filePath = await path.resolve(process.cwd(), "exports", `${name}`);
  const file = await readFileSync(filePath);
  return new Response(file);
}

import { App } from "./core/app";
import { DbConnection } from "./database/db";

async function main() {
  const db = await DbConnection.connect();
  const app = new App(4000);
}

main();

import connect from "./lib/db/mongo";

export default async function Home() {

  await connect();

  return (
    <div>lostAndFound</div>
  );
}

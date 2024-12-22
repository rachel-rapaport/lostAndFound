import Homepage from "./components/Homepage";
import { getCategories } from "./services/api/categoryService";

export default function Home() {
  return (
    <div className="p-[20px]">
      hello
      <Homepage />
    </div>
  );
}


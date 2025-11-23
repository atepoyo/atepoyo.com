import { Counter } from "@/components/counter";

export default function CounterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Counter Page</h1>
      <p>カウンターページのコンポーネントです。</p>
      <Counter />
      <p>カウンターの値は、useStateフックを使用して管理されています。</p>
    </div>
  );
}

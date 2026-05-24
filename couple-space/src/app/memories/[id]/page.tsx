import MemoryDetail from "@/components/screens/MemoryDetail";
export default function Page({ params }: { params: { id: string } }) {
  return <MemoryDetail memoryId={params.id} />;
}

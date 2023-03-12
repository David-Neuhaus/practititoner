import ExerciseList from "../components/ExerciseList";
import { useAppState } from "../infra/StateHooks";

function LibraryPage() {
  const { exercises } = useAppState();
  return (
    <div>
      <ExerciseList />
    </div>
  );
}

export default LibraryPage;

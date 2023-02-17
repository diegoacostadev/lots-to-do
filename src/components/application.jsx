import useTasks from '../lib/use-tasks';
import { initialFilters } from '../features/filters';
import Filters from './filters';
import Tasks from './tasks';
import useFilters, { filterTasks } from '../lib/filter-tasks';
import { useMemo, useTransition } from 'react';

const Application = () => {
  const [tasks] = useTasks();
  const [filters, setFilters] = useFilters(initialFilters);
  const [filterInputs, setFilterInputs] = useFilters(initialFilters);
  const [isPending, startTransition] = useTransition();

  const visibleTasks = useMemo(
    () => filterTasks(tasks, filters),
    [tasks, filters],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterInputs(name, value);
    startTransition(() => {
      setFilters(name, value)
    })
  };

  return (
    <main>
      <Filters filters={filterInputs} onChange={handleChange} />
      {isPending && <p>Loading...</p>}
      <Tasks tasks={visibleTasks} />
    </main>
  );
};

export default Application;

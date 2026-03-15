import { useState, useEffect } from "preact/hooks";
import Header from "./components/Header";
import ControlButtons from "./components/ControlButtons";
import Timer from "./components/Timer";
import JobList from "./components/JobList";
import type { Job } from "./components/JobList";
import { v4 as uuidv4 } from "uuid";
import { fetchJobs, createJob, updateJob, deleteJob } from "./api";

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleStop = async (seconds: number) => {
    setIsRunning(false);
    const newJob: Job = {
      id: uuidv4(),
      duration: seconds,
      description: "",
      createdAt: Date.now(),
    };
    
    // Optimistic UI update
    setJobs((prev) => [newJob, ...prev]);

    try {
      await createJob(newJob);
    } catch (e) {
      console.error(e);
      // Revert on error
      setJobs((prev) => prev.filter(j => j.id !== newJob.id));
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic update
    const previousJobs = [...jobs];
    setJobs((prev) => prev.filter((job) => job.id !== id));

    try {
      await deleteJob(id);
    } catch (e) {
      console.error(e);
      setJobs(previousJobs); // Revert
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Job>) => {
    // Optimistic update
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updates } : job))
    );

    try {
      await updateJob(id, updates);
    } catch (e) {
      console.error(e);
      // Ideally we would revert here too by saving previous state
    }
  };

  if (loading) {
    return (
      <main className="container mt-24 text-center">
        <p>Loading jobs...</p>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="container mt-24">
        <Timer isRunning={isRunning} onStop={handleStop} />
        <ControlButtons isRunning={isRunning} setIsRunning={setIsRunning} />
        <JobList jobs={jobs} onDelete={handleDelete} onUpdate={handleUpdate} />
      </main>
    </>
  );
};

export default App;

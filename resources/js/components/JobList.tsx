export interface Job {
  id: string;
  duration: number; // in seconds
  description: string;
  createdAt: number;
}

interface JobListProps {
  jobs: Job[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Job>) => void;
}

export default function JobList({ jobs, onDelete, onUpdate }: JobListProps) {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="mt-24 overflow-auto">
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">Time (Hours)</th>
            <th scope="col">Description</th>
            <th scope="col" style={{ width: '80px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={(job.duration / 3600).toFixed(2)}
                  onBlur={(e) => {
                    const hours = parseFloat(e.currentTarget.value);
                    if (!isNaN(hours)) {
                      onUpdate(job.id, { duration: hours * 3600 });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  style={{ marginBottom: 0, height: 'auto' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={job.description}
                  onBlur={(e) => onUpdate(job.id, { description: e.currentTarget.value })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Add description..."
                  style={{ marginBottom: 0, height: 'auto' }}
                />
              </td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <button
                  className="outline"
                  style={{ 
                    marginBottom: 0, 
                    padding: '0.25rem 0.5rem', 
                    color: '#d81b60', 
                    borderColor: '#d81b60'
                  }}
                  onClick={() => onDelete(job.id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

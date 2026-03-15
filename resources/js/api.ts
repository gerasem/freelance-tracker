import type { Job } from './components/JobList';

const API_URL = '/api';

export const fetchJobs = async (): Promise<Job[]> => {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
};

export const createJob = async (job: Partial<Job>): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(job),
    });
    if (!response.ok) throw new Error('Failed to create job');
    return response.json();
};

export const updateJob = async (id: string, updates: Partial<Job>): Promise<Job> => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update job');
    return response.json();
};

export const deleteJob = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!response.ok) throw new Error('Failed to delete job');
};

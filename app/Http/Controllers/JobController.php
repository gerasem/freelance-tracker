<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Job::orderBy('created_at', 'desc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|uuid',
            'duration' => 'required|integer',
            'description' => 'nullable|string',
        ]);

        $job = Job::create($validated);

        return response()->json($job, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Job $job)
    {
        $validated = $request->validate([
            'duration' => 'sometimes|integer',
            'description' => 'nullable|string',
        ]);

        $job->update($validated);

        return response()->json($job);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        $job->delete();

        return response()->json(null, 204);
    }
}

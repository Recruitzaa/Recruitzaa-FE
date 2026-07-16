# jobsSlice Context

Global state slice to manage the job postings array, enabling cross-role dynamics between employer posting and candidate listing feeds. Reducer functions are pure and side-effect free; state serialization is handled via store subscription in `src/store/index.ts`.

## Interfaces

- State Schema: `JobsState` (Array of `Job` objects)
- Actions:
  - `addNewJob(Job)`
  - `updateJobStatus({ id: string, status: 'Active' | 'Draft' | 'Closed' })`
  - `deleteJob(string)`

## Mini-Payload Example

```json
{
  "id": "171954318",
  "title": "Senior React Developer",
  "company": "recruitZaa Corporate Client",
  "location": "Bangalore (Hybrid)",
  "type": "Hybrid",
  "salary": "₹18 - ₹26 LPA",
  "postedAt": "Just now",
  "matchScore": 88,
  "tags": ["Full-time", "React", "TypeScript"],
  "avatarText": "RCC",
  "avatarColor": "#4F46E5",
  "isPriority": true,
  "status": "Active"
}
```

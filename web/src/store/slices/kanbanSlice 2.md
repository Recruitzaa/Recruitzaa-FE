# kanbanSlice Context

Global state slice to manage the candidate application stages and handle Kanban board drag-and-drop actions. Reducer functions are pure and side-effect free; state serialization is handled via store subscription in `src/store/index.ts`.

## Interfaces

- State Schema: `KanbanState` (Array of `ApplicationCard` items)
- Actions:
  - `updateApplicationStage({ id: string, stage: PipelineStage })`
  - `addApplication(Omit<ApplicationCard, 'stage' | 'updatedAt'>)`

## Mini-Payload Example

```json
{
  "applications": [
    {
      "id": "a1",
      "companyName": "Microsoft",
      "jobTitle": "Sr. React Native Engineer",
      "stage": "APPLIED"
    }
  ]
}
```

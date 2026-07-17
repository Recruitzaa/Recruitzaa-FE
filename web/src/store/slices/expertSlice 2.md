# Expert Redux Slice Architecture

The `expert` state slice manages tutor discoveries, candidate bookings, and calendar configuration states inside recruitZaa's multi-sided marketplace.

## State Tree Design

```typescript
interface ExpertState {
  directory: ExpertProfile[]; // Read-only catalog of mock tutor cards
  bookings: BookedSession[]; // Active/past booking transactions
  settings: ExpertSettings; // Weekly capacity limits and integrations
}
```

## Actions and Reducers

- `bookSession(session: BookedSession)`: Appends a timezone-aware booking transaction into the seeker's and tutor's view states.
- `cancelSession(sessionId: string)`: Flags a session as cancelled.
- `completeSession(sessionId: string)`: Marks a session completed (reconciling tutor earnings widget analytics).
- `updateExpertSettings(settings: Partial<ExpertSettings>)`: Toggles calendar linkages (Google Calendar / Outlook) and maximum capacity caps.

## Reducer Purity Constraints

To maintain a 10/10 pure state pattern:

1.  All date conversions and ID assignments are generated before dispatching actions.
2.  LocalStorage sync handles side-effects outside of the pure reducer lifecycle during subscriber state transitions.

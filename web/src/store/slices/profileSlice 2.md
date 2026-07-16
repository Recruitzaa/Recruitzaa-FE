# profileSlice Context

Global state slice to manage the candidate profile data structures for in-place dashboard editing and future API payloads.

## Interfaces

- State Schema: `ProfileState` (Personal Info, Employment details, Summary, Timeline, Projects, IT Skills, Career, Ext Personal, Accomplishments)
- Update Actions:
  - `updatePersonalInfo(Partial<PersonalInfo>)`
  - `updateEmploymentDetails(Partial<EmploymentDetails>)`
  - `updateProfessionalSummary(Partial<Summary>)`
  - `addSkill(string)`
  - `removeSkill(string)`
  - `updateEmploymentHistory(JobHistoryItem[])`
  - `updateEducation(EducationDetails)`
  - `updateProjects(ProjectItem[])`
  - `updateITSkills(ITSkillItem[])`
  - `updateCareerProfile(CareerProfile)`
  - `updateExtendedPersonal(ExtendedPersonalInfo)`
  - `updateAccomplishments(Accomplishments)`

## Mini-Payload Example

```json
{
  "personalInfo": {
    "firstName": "Arjun",
    "lastName": "Kumar",
    "email": "arjun.kumar@gmail.com"
  },
  "skills": ["Angular", "Node.js"]
}
```

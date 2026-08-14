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
  - `updateEducation(EducationDetails[])` — list of qualifications (10th/12th/Graduation/PG etc.)
  - `updateProjects(ProjectItem[])`
  - `updateITSkills(ITSkillItem[])`
  - `updateCareerProfile(CareerProfile)`
  - `updateExtendedPersonal(ExtendedPersonalInfo)`
  - `updateAccomplishments(Accomplishments)`
  - `updateReferences(ReferenceItem[])`
  - `updateCertifications(CertificationItem[])` — each item can hold a credential link and an uploaded proof file (data URL)

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

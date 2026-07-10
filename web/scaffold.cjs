const fs = require('fs');
const path = require('path');

const pages = [
  'public/LandingPage',
  'public/EmployerLandingPage',
  'public/JobListingsPage',
  'public/JobDetailPage',
  'auth/AuthPage',
  'candidate/DashboardPage',
  'candidate/ApplicationsPage',
  'candidate/KanbanPage',
  'candidate/AIHubPage',
  'candidate/ProfilePage',
  'employer/EmployerDashboardPage',
  'employer/PostJobPage',
  'employer/MyJobsPage',
  'employer/CandidatesPage',
  'employer/AnalyticsPage',
  'admin/AdminDashboardPage',
  'admin/JobApprovalsPage',
  'admin/CompaniesPage',
  'admin/UsersPage',
  'admin/EmployersPage',
  'error/NotFoundPage',
  'error/UnauthorizedPage'
];

const layouts = [
  'PublicLayout',
  'PortalLayout',
  'AdminLayout'
];

pages.forEach(page => {
  const dir = path.join(__dirname, 'src/pages', path.dirname(page));
  const name = path.basename(page);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${name}.tsx`), 
`export const ${name} = () => {
  return <div>${name}</div>;
};
`);
});

layouts.forEach(layout => {
  const dir = path.join(__dirname, 'src/components/layout', layout);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${layout}.tsx`), 
`import { Outlet } from 'react-router-dom';

export const ${layout} = () => {
  return (
    <div>
      <header>${layout} Header</header>
      <main>
        <Outlet />
      </main>
      <footer>${layout} Footer</footer>
    </div>
  );
};
`);
});

console.log('Scaffolding complete!');

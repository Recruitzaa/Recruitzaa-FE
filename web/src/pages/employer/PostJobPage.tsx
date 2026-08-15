import { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addNewJob, type EmploymentType } from '../../store/slices/jobsSlice';
import { useToast } from '../../hooks/useToast';
import styles from './PostJobPage.module.css';
import { SEO } from '../../components/seo/SEO';

const EMPLOYMENT_TYPE_OPTIONS: Array<{ label: string; value: EmploymentType }> = [
  { label: 'Full-time', value: 'FULL_TIME' },
  { label: 'Part-time', value: 'PART_TIME' },
  { label: 'Contract', value: 'CONTRACT' },
];

export const PostJobPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const descriptionId = useId();

  const [title, setTitle] = useState('');
  const [employmentTypeLabel, setEmploymentTypeLabel] = useState('Full-time');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('Remote');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [experienceMin, setExperienceMin] = useState('');
  const [experienceMax, setExperienceMax] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const companyName =
    useAppSelector((state) => state.employerProfile.profile.companyName) ||
    'Complete your Employer Profile to set Company Name';

  const handlePublish = (e: React.FormEvent, status: 'Active' | 'Draft' = 'Active') => {
    e.preventDefault();

    if (!title.trim() || !location.trim() || !salaryMin.trim() || !salaryMax.trim()) {
      toast.error('Please fill in all basic job details.');
      return;
    }

    const avatarTxt = companyName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 3)
      .toUpperCase();

    const employmentType =
      EMPLOYMENT_TYPE_OPTIONS.find((option) => option.label === employmentTypeLabel)?.value ??
      'FULL_TIME';
    // Salary/experience inputs are LPA (lakhs per annum) and years respectively;
    // stored in absolute rupees / years so sorting and filtering are numeric.
    const salaryMinLakhs = Number(salaryMin.trim()) || 0;
    const salaryMaxLakhs = Number(salaryMax.trim()) || 0;
    const experienceMinYears = Number(experienceMin.trim()) || 0;
    const experienceMaxYears = Number(experienceMax.trim()) || experienceMinYears;
    const nowIso = new Date().toISOString();

    const newJobPayload = {
      id: String(Date.now()),
      title: title.trim(),
      company: companyName,
      location: location.trim(),
      workplace: workMode,
      employmentType,
      salary: `₹${salaryMin.trim()},00,000 - ₹${salaryMax.trim()},00,000 LPA`,
      salaryMin: salaryMinLakhs * 100000,
      salaryMax: salaryMaxLakhs * 100000,
      postedAt: 'Just now',
      postedAtIso: nowIso,
      experienceMin: experienceMinYears,
      experienceMax: experienceMaxYears,
      matchScore: 0,
      tags: [
        employmentTypeLabel,
        ...requirements
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      ],
      avatarText: avatarTxt,
      avatarColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      isPriority: false,
      description: description.trim(),
      source: 'Employer-created browser demo',
      verifiedAt: 'Not verified',
      requirements: requirements
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      status,
    };

    dispatch(addNewJob(newJobPayload));
    toast.success(
      status === 'Active' ? 'Job added to the demo catalogue.' : 'Draft saved in this browser.'
    );
    navigate('/employer/my-jobs');
  };

  return (
    <div className={styles.page}>
      <SEO
        title="Create a Job Listing | Recruitzaa"
        description="Post a new position vacancy to start matching with candidate profiles."
      />
      <form onSubmit={(e) => handlePublish(e, 'Active')} className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create a Job Listing</h1>
          <p className={styles.subtitle}>
            {import.meta.env.DEV
              ? 'Demo workspace: listings are stored in this browser until the production jobs API is connected.'
              : 'Post your role and start receiving matched candidate profiles.'}
          </p>
        </div>

        <div className={styles.contentLayout}>
          <div className={styles.mainCol}>
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Basic Details</h2>
              <div className={styles.formGrid}>
                <Input
                  label="Job Title"
                  placeholder="e.g. Senior React Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Select
                  label="Employment Type"
                  options={EMPLOYMENT_TYPE_OPTIONS.map((option) => option.label)}
                  value={employmentTypeLabel}
                  onChange={(val) => setEmploymentTypeLabel(val)}
                />
                <Input
                  label="Location"
                  placeholder="e.g. Remote, Bangalore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <Select
                  label="Work Mode"
                  options={['Remote', 'Hybrid', 'On-Site']}
                  value={workMode}
                  onChange={(val) => setWorkMode(val)}
                />
                <div className="space-y-1">
                  <Input
                    label="Minimum Salary"
                    placeholder="e.g. 18"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    required
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Value in Lakhs Per Annum (LPA)
                  </p>
                </div>
                <div className="space-y-1">
                  <Input
                    label="Maximum Salary"
                    placeholder="e.g. 26"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    required
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Value in Lakhs Per Annum (LPA)
                  </p>
                </div>
                <div className="space-y-1">
                  <Input
                    label="Minimum Experience"
                    placeholder="e.g. 5"
                    value={experienceMin}
                    onChange={(e) => setExperienceMin(e.target.value)}
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Value in years</p>
                </div>
                <div className="space-y-1">
                  <Input
                    label="Maximum Experience"
                    placeholder="e.g. 10"
                    value={experienceMax}
                    onChange={(e) => setExperienceMax(e.target.value)}
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">Value in years</p>
                </div>
              </div>
            </Card>

            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Job Description</h2>
              <div className={styles.inputGroup}>
                <label htmlFor={descriptionId} className={styles.label}>
                  About the Role
                </label>
                <textarea
                  id={descriptionId}
                  className={styles.textarea}
                  rows={6}
                  placeholder="Describe the responsibilities and expectations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={`${styles.inputGroup} mt-5`}>
                <Input
                  label="Requirements"
                  placeholder="e.g. React Native, TypeScript, Redux (comma separated skills)"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>
            </Card>

            <div className={styles.actionRow}>
              <Button
                type="button"
                variant="outline"
                className="mr-4"
                onClick={(e) => handlePublish(e, 'Draft')}
              >
                Save as Draft
              </Button>
              <Button type="submit">Publish Job Listing</Button>
            </div>
          </div>

          <div className={styles.sideCol}>
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Posting Guidelines</h2>
              <ul className={styles.guidelineList}>
                <li>Be specific about the role responsibilities.</li>
                <li>Clearly define the expected salary range to attract better candidates.</li>
                <li>List key skills so candidates can self-assess fit before applying.</li>
              </ul>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

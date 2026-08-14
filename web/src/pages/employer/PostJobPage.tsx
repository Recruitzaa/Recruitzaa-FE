import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAppDispatch } from '../../store/hooks';
import { addNewJob } from '../../store/slices/jobsSlice';
import { useToast } from '../../hooks/useToast';
import styles from './PostJobPage.module.css';

export const PostJobPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('Remote');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const handlePublish = (e: React.FormEvent, status: 'Active' | 'Draft' = 'Active') => {
    e.preventDefault();

    if (!title.trim() || !location.trim() || !salaryMin.trim() || !salaryMax.trim()) {
      toast.error('Please fill in all basic job details.');
      return;
    }

    const companyName = 'Recruitzaa Corporate Client';
    const avatarTxt = companyName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 3)
      .toUpperCase();

    const newJobPayload = {
      id: String(Date.now()),
      title: title.trim(),
      company: companyName,
      location: location.trim(),
      type: workMode,
      salary: `₹${salaryMin.trim()} - ₹${salaryMax.trim()} LPA`,
      postedAt: 'Just now',
      matchScore: 0,
      tags: [
        employmentType,
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
      <form onSubmit={(e) => handlePublish(e, 'Active')} className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create a Job Listing</h1>
          <p className={styles.subtitle}>
            Demo workspace: listings are stored in this browser until the production jobs API is
            connected.
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
                  options={['Full-time', 'Part-time', 'Contract']}
                  value={employmentType}
                  onChange={(val) => setEmploymentType(val)}
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
                <Input
                  label="Salary Range (Min LPA)"
                  placeholder="e.g. 18"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  required
                />
                <Input
                  label="Salary Range (Max LPA)"
                  placeholder="e.g. 26"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  required
                />
              </div>
            </Card>

            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Job Description</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label}>About the Role</label>
                <textarea
                  className={styles.textarea}
                  rows={6}
                  placeholder="Describe the responsibilities and expectations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={`${styles.inputGroup} mt-5`}>
                <label className={styles.label}>Requirements (comma separated skills)</label>
                <Input
                  placeholder="e.g. React Native, TypeScript, Redux"
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
                <li>
                  Add comma-separated skills so candidates can understand and filter the role.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

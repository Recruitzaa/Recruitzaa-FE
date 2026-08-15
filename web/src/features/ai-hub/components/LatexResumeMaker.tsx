import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import type { RootState } from '../../../store';
import type {
  ProfileState,
  JobHistoryItem,
  ProjectItem,
  ITSkillItem,
} from '../../../store/slices/profileSlice.types';
import { setFullProfile } from '../../../store/slices/profileSlice';
import { getCandidateProfile } from '../../../services/profile.service';
import {
  LATEX_TEMPLATES,
  generateLatex,
  getTemplateById,
} from '../templates';
import { ResumeApiService } from '../../../services/resume.service';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  RefreshCw,
  Sparkles,
  Eye,
  Edit3,
  Layers,
  CheckCircle2,
  Printer,
  BookmarkCheck,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────
   1. JAKE'S RESUME (Classic ATS Gold Standard)
───────────────────────────────────────────────────────────── */
const JakesResumePreview: React.FC<{ profile: ProfileState; candidateName: string }> = ({
  profile,
  candidateName,
}) => {
  const contactItems = [
    profile.personalInfo.phone,
    profile.personalInfo.email,
    profile.personalInfo.location,
    profile.accomplishments?.onlineProfile,
  ].filter(Boolean);

  return (
    <div className="font-serif text-slate-900 leading-normal text-[13px]">
      {/* Header */}
      <div className="text-center pb-3 mb-3 border-b border-slate-300">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-slate-900 font-serif mb-1">
          {candidateName}
        </h1>
        {contactItems.length > 0 && (
          <div className="text-xs text-slate-600 flex flex-wrap justify-center items-center gap-2">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>|</span>}
                <span className={item.includes('@') || item.includes('.com') ? 'text-blue-700 underline' : ''}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {(profile.professionalSummary.detailedSummary || profile.professionalSummary.headline) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-1.5 text-slate-900 font-sans">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {profile.professionalSummary.detailedSummary || profile.professionalSummary.headline}
          </p>
        </div>
      )}

      {/* Education */}
      {(profile.education?.degree || profile.education?.university) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-1.5 text-slate-900 font-sans">
            Education
          </h2>
          <div className="flex justify-between items-baseline text-xs font-bold">
            <span>{profile.education.university}</span>
            <span className="font-normal text-slate-600">{profile.education.duration}</span>
          </div>
          {profile.education.degree && (
            <div className="text-xs text-slate-700 italic mt-0.5">
              {profile.education.degree} {profile.education.type ? `(${profile.education.type})` : ''}
            </div>
          )}
        </div>
      )}

      {/* Work Experience */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-1.5 text-slate-900 font-sans">
          Work Experience
        </h2>

        {profile.employmentHistory.length > 0 ? (
          <div className="space-y-3.5">
            {profile.employmentHistory.map((job: JobHistoryItem, idx: number) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{job.designation || 'Role'}</span>
                  <span className="font-normal text-slate-600">{job.duration}</span>
                </div>
                <div className="italic text-slate-700 mb-1">
                  {job.company} {profile.personalInfo.location ? `— ${profile.personalInfo.location}` : ''}
                </div>
                {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700 leading-relaxed">
                    {job.keyResponsibilities.map((resp: string, rIdx: number) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic py-1">
            No work experience added yet. (Add employment history in your profile to display here)
          </div>
        )}
      </div>

      {/* Projects */}
      {profile.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-1.5 text-slate-900 font-sans">
            Key Projects
          </h2>
          <div className="space-y-2.5">
            {profile.projects.map((proj: ProjectItem, idx: number) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{proj.name} {proj.client && <span className="font-normal italic text-slate-600">| {proj.client}</span>}</span>
                  <span className="font-normal text-slate-600">{proj.duration}</span>
                </div>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {(profile.skills.length > 0 || profile.itSkills.length > 0 || profile.accomplishments?.certification) && (
        <div className="mb-2 pt-1">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-900 pb-0.5 mb-2 text-slate-900 font-sans">
            Technical Skills
          </h2>
          <div className="text-xs text-slate-800 space-y-1.5 leading-relaxed">
            {profile.skills.length > 0 && (
              <div>
                <strong className="font-semibold text-slate-900">Core Technologies: </strong>
                <span className="text-slate-700">{profile.skills.join(', ')}</span>
              </div>
            )}
            {profile.itSkills.length > 0 && (
              <div>
                <strong className="font-semibold text-slate-900">Tools & Frameworks: </strong>
                <span className="text-slate-700">{profile.itSkills.map((i: ITSkillItem) => `${i.skill} (${i.experience || 'Proficient'})`).join(', ')}</span>
              </div>
            )}
            {profile.accomplishments?.certification && (
              <div>
                <strong className="font-semibold text-slate-900">Certifications: </strong>
                <span className="text-slate-700">{profile.accomplishments.certification}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. MODERNCV CLASSIC (European / Corporate Executive Standard)
───────────────────────────────────────────────────────────── */
const ModernCVPreview: React.FC<{ profile: ProfileState; candidateName: string }> = ({
  profile,
  candidateName,
}) => {
  return (
    <div className="font-sans text-slate-800 leading-normal text-[12.5px]">
      {/* Top Corporate Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start pb-4 mb-4 border-b-2 border-sky-600 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-sky-800 tracking-tight">
            {candidateName}
          </h1>
          {profile.professionalSummary.headline && (
            <p className="text-sm font-semibold text-slate-600 mt-0.5">
              {profile.professionalSummary.headline}
            </p>
          )}
        </div>
        <div className="text-xs text-slate-600 space-y-1 text-right sm:self-end">
          {profile.personalInfo.email && (
            <div className="flex items-center sm:justify-end gap-1.5">
              <Mail size={12} className="text-sky-600" />
              <span className="text-sky-700">{profile.personalInfo.email}</span>
            </div>
          )}
          {profile.personalInfo.phone && (
            <div className="flex items-center sm:justify-end gap-1.5">
              <Phone size={12} className="text-sky-600" />
              <span>{profile.personalInfo.phone}</span>
            </div>
          )}
          {profile.personalInfo.location && (
            <div className="flex items-center sm:justify-end gap-1.5">
              <MapPin size={12} className="text-sky-600" />
              <span>{profile.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {(profile.professionalSummary.detailedSummary || profile.professionalSummary.headline) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700 border-b border-sky-200 pb-1 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed pl-3 border-l-2 border-sky-100">
            {profile.professionalSummary.detailedSummary || profile.professionalSummary.headline}
          </p>
        </div>
      )}

      {/* Work Experience with Timeline */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700 border-b border-sky-200 pb-1 mb-2.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-600"></span>
          Professional Experience
        </h2>

        {profile.employmentHistory.length > 0 ? (
          <div className="space-y-3.5 pl-1">
            {profile.employmentHistory.map((job: JobHistoryItem, idx: number) => (
              <div key={idx} className="grid grid-cols-12 gap-2 text-xs">
                <div className="col-span-3 font-semibold text-sky-900 text-[11.5px]">
                  {job.duration}
                </div>
                <div className="col-span-9 pl-2 border-l border-slate-200">
                  <div className="font-bold text-slate-900">
                    {job.designation} <span className="font-normal text-slate-500">at {job.company}</span>
                  </div>
                  {profile.personalInfo.location && (
                    <div className="text-slate-500 text-[11px] mb-1">
                      {profile.personalInfo.location}
                    </div>
                  )}
                  {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-700 leading-relaxed">
                      {job.keyResponsibilities.map((resp: string, rIdx: number) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic pl-1">No experience added yet.</div>
        )}
      </div>

      {/* Education */}
      {(profile.education?.degree || profile.education?.university) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700 border-b border-sky-200 pb-1 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Education
          </h2>
          <div className="grid grid-cols-12 gap-2 text-xs pl-1">
            <div className="col-span-3 font-semibold text-sky-900 text-[11.5px]">
              {profile.education.duration}
            </div>
            <div className="col-span-9 pl-2 border-l border-slate-200">
              <div className="font-bold text-slate-900">{profile.education.degree}</div>
              <div className="text-slate-600 italic text-[11.5px]">
                {profile.education.university} {profile.education.type ? `(${profile.education.type})` : ''}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills */}
      {(profile.skills.length > 0 || profile.itSkills.length > 0 || profile.accomplishments?.certification) && (
        <div className="mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-700 border-b border-sky-200 pb-1 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            Skills & Qualifications
          </h2>
          <div className="text-xs space-y-1.5 pl-1">
            {profile.skills.length > 0 && (
              <div>
                <strong className="font-semibold text-slate-900">Core Technologies: </strong>
                <span className="text-slate-700">{profile.skills.join(', ')}</span>
              </div>
            )}
            {profile.itSkills.length > 0 && (
              <div>
                <strong className="font-semibold text-slate-900">Tools: </strong>
                <span className="text-slate-700">{profile.itSkills.map((i: ITSkillItem) => i.skill).join(', ')}</span>
              </div>
            )}
            {profile.accomplishments?.certification && (
              <div>
                <strong className="font-semibold text-slate-900">Certifications: </strong>
                <span className="text-slate-700">{profile.accomplishments.certification}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. DEEDY CV (Distinct 2-Column Compact Layout)
───────────────────────────────────────────────────────────── */
const DeedyCVPreview: React.FC<{ profile: ProfileState; candidateName: string }> = ({
  profile,
  candidateName,
}) => {
  const contactItems = [
    profile.personalInfo.email,
    profile.personalInfo.phone,
    profile.personalInfo.location,
    profile.accomplishments?.onlineProfile,
  ].filter(Boolean);

  return (
    <div className="font-sans text-slate-900 leading-tight text-[12px]">
      {/* Top Big Header */}
      <div className="border-b-2 border-purple-800 pb-3 mb-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
          {candidateName}
        </h1>
        {contactItems.length > 0 && (
          <div className="text-xs font-medium text-purple-800 mt-0.5 flex flex-wrap items-center gap-3">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>|</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* ── LEFT COLUMN (35% Width) ── */}
        <div className="col-span-4 border-r border-slate-200 pr-4 space-y-4">
          {/* Education */}
          {(profile.education?.degree || profile.education?.university) && (
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-wider text-purple-900 border-b border-purple-400 pb-0.5 mb-1.5">
                Education
              </h2>
              <div className="font-bold text-xs text-slate-900">{profile.education.university}</div>
              <div className="text-[11px] text-purple-700 font-medium">{profile.education.degree}</div>
              <div className="text-[10.5px] text-slate-500">{profile.education.duration}</div>
            </div>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-wider text-purple-900 border-b border-purple-400 pb-0.5 mb-1.5">
                Skills
              </h2>
              <div className="space-y-1 text-[11px] text-slate-700">
                {profile.skills.map((sk: string, i: number) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Frameworks */}
          {profile.itSkills.length > 0 && (
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-wider text-purple-900 border-b border-purple-400 pb-0.5 mb-1.5">
                Tools & Tech
              </h2>
              <div className="space-y-1 text-[11px] text-slate-700">
                {profile.itSkills.map((item: ITSkillItem, idx: number) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{item.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN (65% Width) ── */}
        <div className="col-span-8 space-y-4">
          {/* Summary */}
          {(profile.professionalSummary.detailedSummary || profile.professionalSummary.headline) && (
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-wider text-purple-900 border-b border-purple-400 pb-0.5 mb-1.5">
                Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {profile.professionalSummary.detailedSummary || profile.professionalSummary.headline}
              </p>
            </div>
          )}

          {/* Experience */}
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-wider text-purple-900 border-b border-purple-400 pb-0.5 mb-2">
              Experience
            </h2>
            {profile.employmentHistory.length > 0 ? (
              <div className="space-y-3">
                {profile.employmentHistory.map((job: JobHistoryItem, idx: number) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-baseline font-bold">
                      <span className="text-slate-900">{job.company} <span className="font-semibold text-purple-800">| {job.designation}</span></span>
                      <span className="text-[11px] font-normal text-slate-500">{job.duration}</span>
                    </div>
                    {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-700 mt-1 leading-relaxed">
                        {job.keyResponsibilities.map((resp: string, rIdx: number) => (
                          <li key={rIdx}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">No experience listed.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   4. AWESOME CV (Modern Typography & Emerald Highlights)
───────────────────────────────────────────────────────────── */
const AwesomeCVPreview: React.FC<{ profile: ProfileState; candidateName: string }> = ({
  profile,
  candidateName,
}) => {
  const nameParts = candidateName.split(' ');
  const firstName = nameParts[0] || 'Candidate';
  const lastName = nameParts.slice(1).join(' ') || '';

  const contactItems = [
    profile.personalInfo.phone,
    profile.personalInfo.email,
    profile.personalInfo.location,
    profile.accomplishments?.onlineProfile,
  ].filter(Boolean);

  return (
    <div className="font-sans text-slate-900 leading-normal text-[12.5px]">
      {/* Modern Header with Emerald Accents */}
      <div className="text-center pb-4 mb-4 border-b border-slate-200">
        <h1 className="text-3xl tracking-tight text-slate-900 uppercase">
          <span className="font-light text-slate-600">{firstName}</span>{' '}
          <span className="font-extrabold text-slate-900">{lastName}</span>
        </h1>
        {profile.professionalSummary.headline && (
          <p className="text-xs font-semibold text-emerald-700 tracking-wider uppercase mt-1">
            {profile.professionalSummary.headline}
          </p>
        )}
        {contactItems.length > 0 && (
          <div className="text-xs text-slate-600 mt-2 flex flex-wrap justify-center items-center gap-3">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>•</span>}
                <span className={item.includes('@') ? 'text-emerald-700 font-medium underline' : ''}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {(profile.professionalSummary.detailedSummary || profile.professionalSummary.headline) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-600 pb-0.5 mb-2">
            Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {profile.professionalSummary.detailedSummary || profile.professionalSummary.headline}
          </p>
        </div>
      )}

      {/* Experience with Emerald Badges */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-600 pb-0.5 mb-2.5">
          Work Experience
        </h2>

        {profile.employmentHistory.length > 0 ? (
          <div className="space-y-3.5">
            {profile.employmentHistory.map((job: JobHistoryItem, idx: number) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-[13px]">{job.designation}</span>
                  {job.duration && (
                    <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {job.duration}
                    </span>
                  )}
                </div>
                <div className="font-semibold text-slate-700 text-xs mb-1">
                  {job.company} {profile.personalInfo.location ? `(${profile.personalInfo.location})` : ''}
                </div>
                {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700 leading-relaxed">
                    {job.keyResponsibilities.map((resp: string, rIdx: number) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic">No experience listed.</div>
        )}
      </div>

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div className="mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-emerald-600 pb-0.5 mb-2">
            Skills & Competencies
          </h2>
          <div className="text-xs space-y-1.5">
            <div className="flex gap-2">
              <span className="font-bold text-slate-900 min-w-[120px]">Core Stack:</span>
              <span className="text-slate-700">{profile.skills.join(', ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   5. MINIMALIST SINGLE COLUMN (Clean Swiss Style)
───────────────────────────────────────────────────────────── */
const MinimalistCVPreview: React.FC<{ profile: ProfileState; candidateName: string }> = ({
  profile,
  candidateName,
}) => {
  const contactItems = [
    profile.personalInfo.location,
    profile.personalInfo.phone,
    profile.personalInfo.email,
    profile.accomplishments?.onlineProfile,
  ].filter(Boolean);

  return (
    <div className="font-serif text-slate-900 leading-relaxed text-[12.5px]">
      {/* Centered Minimalist Header */}
      <div className="text-center pb-3 mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase mb-1">
          {candidateName}
        </h1>
        {contactItems.length > 0 && (
          <div className="text-xs text-slate-600 flex flex-wrap justify-center items-center gap-2">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>·</span>}
                <span className={item.includes('@') || item.includes('.com') ? 'text-slate-900 underline' : ''}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <hr className="border-t border-slate-300 mb-4" />

      {/* Summary */}
      {(profile.professionalSummary.detailedSummary || profile.professionalSummary.headline) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-1">
            Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {profile.professionalSummary.detailedSummary || profile.professionalSummary.headline}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-2">
          Experience
        </h2>
        {profile.employmentHistory.length > 0 ? (
          <div className="space-y-3">
            {profile.employmentHistory.map((job: JobHistoryItem, idx: number) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <strong className="text-slate-900 text-xs">{job.company}</strong>
                  <span className="text-slate-500 font-mono text-[11px]">{job.duration}</span>
                </div>
                <div className="italic text-slate-700 text-xs mb-1">
                  {job.designation} {profile.personalInfo.location ? `— ${profile.personalInfo.location}` : ''}
                </div>
                {job.keyResponsibilities && job.keyResponsibilities.length > 0 && (
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                    {job.keyResponsibilities.map((resp: string, rIdx: number) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-400 italic">No experience added yet.</div>
        )}
      </div>

      {/* Education */}
      {(profile.education?.degree || profile.education?.university) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-1">
            Education
          </h2>
          <div className="flex justify-between items-baseline text-xs">
            <strong className="text-slate-900">{profile.education.university}</strong>
            <span className="text-slate-500 font-mono text-[11px]">{profile.education.duration}</span>
          </div>
          <div className="text-slate-700 italic text-xs">{profile.education.degree}</div>
        </div>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800 mb-1">
            Skills & Competencies
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed">
            {profile.skills.join(' · ')}
          </p>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN CONTAINER & CONTROLLER
───────────────────────────────────────────────────────────── */
export const LatexResumeMaker = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.profile);
  const { appUser, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('jakes-resume');
  const [customLatex, setCustomLatex] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'latex' | 'split'>('split');
  const resumePaperRef = useRef<HTMLDivElement>(null);

  // Sync profile from backend on mount if not already loaded
  useEffect(() => {
    let isMounted = true;
    const fetchLatestProfile = async () => {
      if (!isAuthenticated) return;
      try {
        const dbProfile: any = await getCandidateProfile();
        if (dbProfile && isMounted) {
          const merged: any = {
            personalInfo: dbProfile.personalInfo || {
              firstName: appUser?.displayName ? appUser.displayName.split(' ')[0] : '',
              lastName: appUser?.displayName ? appUser.displayName.split(' ').slice(1).join(' ') : '',
              email: appUser?.email || '',
              phone: appUser?.phone || '',
              location: appUser?.location || '',
              avatar: appUser?.photoURL || '',
            },
            employmentDetails: dbProfile.employmentStatus
              ? {
                  currentCompany: dbProfile.employmentStatus.currentCompany || '',
                  currentDesignation: dbProfile.employmentStatus.currentRole || '',
                  totalExperience: '',
                  currentCTC: dbProfile.employmentStatus.currentSalary || '',
                  noticePeriod: dbProfile.employmentStatus.noticePeriod || '',
                }
              : {
                  currentCompany: appUser?.currentCompany || '',
                  currentDesignation: appUser?.currentRole || '',
                  totalExperience: '',
                  currentCTC: appUser?.currentSalary || '',
                  noticePeriod: appUser?.noticePeriod || '',
                },
            professionalSummary: {
              headline: dbProfile.headline || '',
              detailedSummary: dbProfile.summary || dbProfile.bio || '',
            },
            skills: (dbProfile.skills && dbProfile.skills.length > 0)
              ? dbProfile.skills.map((s: any) => (typeof s === 'string' ? s : s.name))
              : (dbProfile.skillsFlat || []),
            employmentHistory: dbProfile.experience || [],
            education: (dbProfile.education && Array.isArray(dbProfile.education) && dbProfile.education.length > 0)
              ? {
                  degree: dbProfile.education[0].degree || '',
                  university: dbProfile.education[0].institution || '',
                  duration: dbProfile.education[0].graduationYear ? String(dbProfile.education[0].graduationYear) : '',
                  type: 'Full Time',
                }
              : (dbProfile.education || { degree: '', university: '', duration: '', type: '' }),
            projects: dbProfile.projects || [],
            itSkills: dbProfile.itSkills || [],
            careerProfile: dbProfile.careerProfile || {
              industry: '',
              department: '',
              roleCategory: '',
              jobRole: '',
              desiredJobType: '',
              desiredEmploymentType: '',
              desiredLocations: dbProfile.preferredLocations || [],
              expectedSalary: dbProfile.salaryExpectation?.min ? String(dbProfile.salaryExpectation.min) : '',
              preferredShift: '',
            },
            extendedPersonal: dbProfile.extendedPersonal || {
              gender: '',
              maritalStatus: '',
              dob: '',
              category: '',
              address: '',
              languages: dbProfile.languages || [],
            },
            accomplishments: dbProfile.accomplishments || {
              onlineProfile: '',
              workSample: '',
              publication: '',
              presentation: '',
              patent: '',
              certification: '',
            },
          };
          dispatch(setFullProfile(merged));
        }
      } catch {
        // Fallback to appUser
        if (appUser && isMounted && !profile.personalInfo.firstName) {
          dispatch(
            setFullProfile({
              ...profile,
              personalInfo: {
                ...profile.personalInfo,
                firstName: appUser.displayName ? appUser.displayName.split(' ')[0] : '',
                lastName: appUser.displayName ? appUser.displayName.split(' ').slice(1).join(' ') : '',
                email: appUser.email || '',
                phone: appUser.phone || '',
                location: appUser.location || '',
              },
            })
          );
        }
      }
    };

    fetchLatestProfile();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, appUser?.id]);

  // Generate LaTeX source code based on current template and profile
  const autoGeneratedLatex = useMemo(() => {
    return generateLatex(selectedTemplateId, profile);
  }, [selectedTemplateId, profile]);

  const currentLatexCode = customLatex !== null ? customLatex : autoGeneratedLatex;
  const currentTemplate = getTemplateById(selectedTemplateId);

  const candidateName = `${profile.personalInfo.firstName || ''} ${profile.personalInfo.lastName || ''}`.trim() || appUser?.displayName || 'Candidate Name';

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setCustomLatex(null); // Reset manual edits to rebind to new template
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentLatexCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy LaTeX code:', err);
    }
  };

  const handleDownloadTex = () => {
    const filename = `${candidateName.toLowerCase().replace(/\s+/g, '_')}_${selectedTemplateId}.tex`;
    const element = document.createElement('a');
    const file = new Blob([currentLatexCode], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSaveToBackend = async () => {
    setIsSaving(true);
    try {
      await ResumeApiService.saveResume(
        `${candidateName} - ${currentTemplate.name}`,
        selectedTemplateId,
        currentLatexCode
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to save resume:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToProfile = () => {
    setCustomLatex(null);
  };

  /**
   * Dedicated Print / Download PDF handler:
   * Uses an isolated hidden iframe containing ONLY the resume DOM and clean A4 print styles.
   */
  const handlePrintOnlyResume = () => {
    const resumeElem = document.getElementById('printable-resume-paper');
    if (!resumeElem) return;

    // Create an invisible iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>${candidateName} - ${currentTemplate.name}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 12mm 10mm 12mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              color: #0f172a;
            }
          </style>
        </head>
        <body class="bg-white p-4">
          ${resumeElem.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
    }, 350);
  };

  // Render the matching visual template preview based on user selection
  const renderTemplateVisual = () => {
    switch (selectedTemplateId) {
      case 'modern-cv':
        return <ModernCVPreview profile={profile} candidateName={candidateName} />;
      case 'deedy-cv':
        return <DeedyCVPreview profile={profile} candidateName={candidateName} />;
      case 'awesome-cv':
        return <AwesomeCVPreview profile={profile} candidateName={candidateName} />;
      case 'minimalist-cv':
        return <MinimalistCVPreview profile={profile} candidateName={candidateName} />;
      case 'jakes-resume':
      default:
        return <JakesResumePreview profile={profile} candidateName={candidateName} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Top Header Banner: Profile Auto-Sync ── */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                <Sparkles size={13} className="text-yellow-300" />
                LaTeX Resume Engine
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-medium">
                <CheckCircle2 size={13} />
                Live Database Profile
              </span>
            </div>
            <h2 className="text-2xl font-bold font-sans">
              LaTeX Resume Builder
            </h2>
            <p className="text-sm text-blue-100/80 mt-1 max-w-2xl">
              Instantly compiles your profile data ({profile.skills.length} skills, {profile.employmentHistory.length} experiences, {profile.projects.length} projects) into production-ready LaTeX source code.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/candidate/profile"
              className="px-4 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
            >
              Edit Profile Data
            </Link>
          </div>
        </div>
      </div>

      {/* ── Template Carousel / Selector ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Layers size={16} className="text-brand-primary" />
            Choose Resume Template ({LATEX_TEMPLATES.length})
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Active: <strong className="text-slate-800 dark:text-slate-200">{currentTemplate.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {LATEX_TEMPLATES.map((tpl) => {
            const isSelected = tpl.id === selectedTemplateId;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleTemplateChange(tpl.id)}
                className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all relative ${
                  isSelected
                    ? 'border-brand-primary bg-blue-50/50 dark:bg-blue-950/30 shadow-md ring-2 ring-brand-primary/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 text-brand-primary">
                    <CheckCircle2 size={16} />
                  </span>
                )}
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 self-start"
                  style={{
                    backgroundColor: `${tpl.accentColor}18`,
                    color: tpl.accentColor,
                  }}
                >
                  {tpl.tag}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  {tpl.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tpl.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Action Bar & View Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              viewMode === 'split'
                ? 'bg-white dark:bg-slate-800 text-brand-primary shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers size={14} />
            Split View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? 'bg-white dark:bg-slate-800 text-brand-primary shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Eye size={14} />
            Paper Preview
          </button>
          <button
            type="button"
            onClick={() => setViewMode('latex')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              viewMode === 'latex'
                ? 'bg-white dark:bg-slate-800 text-brand-primary shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileCode2 size={14} />
            LaTeX Code
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {customLatex !== null && (
            <button
              type="button"
              onClick={handleResetToProfile}
              className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 rounded-lg transition-colors flex items-center gap-1.5 border border-amber-200 dark:border-amber-800"
            >
              <RefreshCw size={13} />
              Reset Edits
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={13} />
                Copy .tex
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadTex}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download size={13} />
            Download .tex
          </button>

          <button
            type="button"
            onClick={handleSaveToBackend}
            disabled={isSaving}
            className="px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg transition-colors flex items-center gap-1.5 border border-blue-200 dark:border-blue-800"
          >
            {savedSuccess ? (
              <>
                <Check size={13} className="text-emerald-500" />
                Saved to Cloud!
              </>
            ) : (
              <>
                <BookmarkCheck size={13} />
                Save Resume
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrintOnlyResume}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 shadow cursor-pointer"
          >
            <Printer size={13} />
            Download PDF / Print Resume
          </button>
        </div>
      </div>

      {/* ── Main Workspace: Split / Single View ── */}
      <div
        className={`grid gap-6 ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {/* ── LEFT / CODE PANE ── */}
        {(viewMode === 'split' || viewMode === 'latex') && (
          <div className="flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl h-[820px]">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FileCode2 size={15} className="text-blue-400" />
                <span className="font-mono text-slate-200">
                  {candidateName.toLowerCase().replace(/\s+/g, '_')}_{selectedTemplateId}.tex
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono">
                  {currentLatexCode.split('\n').length} lines
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Edit3 size={12} />
                <span>Editable LaTeX</span>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto">
              <textarea
                value={currentLatexCode}
                onChange={(e) => setCustomLatex(e.target.value)}
                spellCheck={false}
                className="w-full h-full p-4 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-blue-600 selection:text-white"
                style={{ fontFamily: 'Fira Code, Menlo, Monaco, Consolas, monospace' }}
              />
            </div>
          </div>
        )}

        {/* ── RIGHT / DOCUMENT PREVIEW PANE ── */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className="flex flex-col bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 h-[820px] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 px-2 text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider">
                Live Document Simulation: {currentTemplate.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: `${currentTemplate.accentColor}18`, color: currentTemplate.accentColor }}>
                {currentTemplate.tag}
              </span>
            </div>

            {/* Paper Container */}
            <div
              id="printable-resume-paper"
              ref={resumePaperRef}
              className="bg-white text-slate-900 p-8 sm:p-10 pb-16 mb-8 rounded-lg shadow-2xl border border-slate-300 min-h-[750px]"
            >
              {renderTemplateVisual()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

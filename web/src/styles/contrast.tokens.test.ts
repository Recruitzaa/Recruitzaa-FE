import { describe, expect, it } from 'vitest';

import tokensCss from './tokens.css?raw';
import landingCss from '../pages/public/LandingPage.module.css?raw';
import listingsCss from '../pages/public/JobListingsPage.module.css?raw';
import jobCardCss from '../features/jobs/components/JobCard/JobCard.module.css?raw';

const FUNCTIONAL_TOKEN = '--color-slate-functional';
const MUTED_TOKEN = '--color-slate-muted';

describe('contrast tokens', () => {
  it('defines a darker functional text token for labels on white surfaces', () => {
    expect(tokensCss).toContain(`${FUNCTIONAL_TOKEN}: #6b7280`);
  });

  it('uses functional text color for public job discovery labels', () => {
    for (const css of [landingCss, listingsCss, jobCardCss]) {
      expect(css).toContain(FUNCTIONAL_TOKEN);
      expect(css).not.toMatch(/font-size:\s*0\.625rem/);
    }

    expect(landingCss).not.toContain(`${MUTED_TOKEN}`);
  });
});

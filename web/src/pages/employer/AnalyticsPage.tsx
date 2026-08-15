import { FeatureUnavailablePage } from '../shared/FeatureUnavailablePage';
import { SEO } from '../../components/seo/SEO';

export const AnalyticsPage = () => {
  return (
    <div className="space-y-2">
      <SEO
        title="Recruitment Analytics | Recruitzaa"
        description="Detailed hiring metrics, conversion funnels, and application flow analytics are currently being prepared."
      />
      <FeatureUnavailablePage
        title="Analytics Workspace"
        description="Detailed hiring metrics, conversion funnels, and application flow analytics are currently being prepared."
      />
    </div>
  );
};

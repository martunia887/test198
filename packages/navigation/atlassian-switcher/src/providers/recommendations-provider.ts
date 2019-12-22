import {
  RecommendationsEngineResponse,
  RecommendationsFeatureFlags,
} from '../types';
import asDataProvider from './as-data-provider';
import { resolveRecommendations } from './recommendations';

const fetchRecommendations = ({
  featureFlags,
}: {
  featureFlags?: RecommendationsFeatureFlags;
}): Promise<RecommendationsEngineResponse> =>
  Promise.resolve(resolveRecommendations(featureFlags));

export const RecommendationsEngineProvider = asDataProvider(
  'productRecommendations',
  fetchRecommendations,
);

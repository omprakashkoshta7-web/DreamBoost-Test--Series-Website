import { Loader } from '@shared/components';

const OAuthLoadingIndicator = () => {
  return (
    <>
      <Loader size="sm" />
      <h1 className="text-xl font-bold text-tb-navy">Signing you in</h1>
      <p className="mt-2 text-sm text-tb-gray-500">Completing GitHub authentication...</p>
    </>
  );
};

export default OAuthLoadingIndicator;

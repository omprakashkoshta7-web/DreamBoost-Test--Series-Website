const SocialLoginDivider = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
      </div>
    </div>
  );
};

export default SocialLoginDivider;

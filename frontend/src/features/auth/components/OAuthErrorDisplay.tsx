import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@shared/components';

interface OAuthErrorDisplayProps {
  error: string;
  onClose: () => void;
}

const OAuthErrorDisplay: React.FC<OAuthErrorDisplayProps> = ({ error, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      <Alert variant="danger" title="GitHub Sign-in Failed" onClose={onClose}>
        {error}
      </Alert>
      <button onClick={() => navigate('/?auth=login', { replace: true })} className="mt-6 text-sm font-semibold text-tb-blue hover:text-tb-blue-dark">
        Back to login
      </button>
    </>
  );
};

export default OAuthErrorDisplay;

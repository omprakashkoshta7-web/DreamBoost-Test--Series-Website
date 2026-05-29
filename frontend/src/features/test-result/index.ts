export { default as TestResultPage } from './pages/TestResultPage';
export { default as resultReducer } from './store/result.slice';
export { fetchTestResult } from './store/result.thunks';
export { selectTestResult, selectTestResultLoading, selectTestResultError } from './store/result.selectors';

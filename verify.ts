import mongoose from 'mongoose';
import { config } from '@/config';
import { Test } from '@/models/Test';
import { Question } from '@/models/Question';
async function check() {
  await mongoose.connect(config.mongodb.uri);
  const tests = await Test.find({ category: 'NEET UG' }).select('name subject difficulty totalQuestions questionCount');
  console.log('=== NEET UG Tests ===');
  tests.forEach(t => console.log('  -', t.name, '|', t.subject, '|', t.difficulty, '|', t.totalQuestions, 'Q'));
  const total = await Question.countDocuments({ category: 'NEET UG' });
  console.log('\nTotal questions:', total);
  process.exit(0);
}
check().catch(e => { console.error(e); process.exit(1); });

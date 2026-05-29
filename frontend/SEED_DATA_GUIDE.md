# 🌱 Section-Wise Exam Seed Data Guide

## Overview
This seed script creates a complete sample exam with sections and questions organized by topics.

---

## ✅ What Gets Created

### Test Details
```
Name: JEE Main 2024 - Full Mock Test
Category: JEE
Duration: 180 minutes (3 hours)
Total Questions: 15 (for demo purposes)
Total Marks: 300
Passing Marks: 120
Negative Marks: 1 per wrong answer
```

### Sections (3)
1. **Physics** (25 questions available)
   - Topic: Kinematics, Gravitation, Waves, Electrostatics, Circuits
   - Duration: 60 minutes
   - Marks: 100

2. **Chemistry** (25 questions available)
   - Topic: Acid-Base Equilibrium, Redox, Organic, Equilibrium, Stoichiometry
   - Duration: 60 minutes
   - Marks: 100

3. **Mathematics** (25 questions available)
   - Topic: Sequences, Trigonometry, Calculus, Coordinate Geometry, Vectors
   - Duration: 60 minutes
   - Marks: 100

---

## 🚀 How to Run

### Step 1: Navigate to Server Directory
```bash
cd e:\p2\server
```

### Step 2: Run Seed Script
```bash
npm run seed-sections
```

### Step 3: Expected Output
```
✅ Connected to MongoDB
🧹 Cleaned existing data
✅ Test created: JEE Main 2024 - Full Mock Test
✅ Created 3 sections
✅ Created 15 sample questions

✅ Seed completed successfully!
Test ID: 507f1f77bcf86cd799439011
Sections: Physics, Chemistry, Mathematics
Total Questions: 15 (5 per section)

You can now use this test ID to create an exam.
```

---

## 📊 Sample Questions Structure

### Physics Example
```json
{
  "_id": "507f...",
  "testId": "507f...",
  "sectionId": "507f...",
  "text": "A ball is thrown vertically upward with velocity 20 m/s. What is the maximum height reached? (g = 10 m/s²)",
  "type": "mcq",
  "category": "JEE",
  "subject": "Physics",
  "section": "Physics",
  "sectionName": "Physics",
  "topic": "Kinematics",
  "difficulty": "easy",
  "marks": 4,
  "negativeMarks": 1,
  "options": [
    { "label": "A", "text": "10 m" },
    { "label": "B", "text": "20 m" },
    { "label": "C", "text": "30 m" },
    { "label": "D", "text": "40 m" }
  ],
  "correctAnswer": "B",
  "explanation": "Using v² = u² - 2gh, at maximum height v = 0. So 0 = 400 - 2(10)h, h = 20 m",
  "isActive": true
}
```

---

## 🧪 Testing the Exam

### Step 1: Start the Backend Server
```bash
# Terminal 1
cd e:\p2\server
npm run dev
```

### Step 2: Get Test Data
```
GET http://localhost:3001/tests/{test_id}

Replace {test_id} with the ID from seed output
```

### Step 3: View Questions by Section
Backend will return questions grouped by section. Check Response:
```json
{
  "success": true,
  "data": {
    "_id": "507f...",
    "name": "JEE Main 2024 - Full Mock Test",
    "sections": [
      { "name": "Physics", "questionCount": 5 },
      { "name": "Chemistry", "questionCount": 5 },
      { "name": "Mathematics", "questionCount": 5 }
    ],
    "questions": [
      {
        "_id": "q1",
        "text": "A ball is thrown...",
        "section": "Physics",
        "sectionName": "Physics",
        ...
      },
      ...
    ]
  }
}
```

### Step 4: Test in Frontend
1. Start frontend: `cd e:\p2 && npm run dev`
2. Go to: `http://localhost:5173/app/test-exam/{test_id}`
3. You should see:
   - Section tabs: Physics | Chemistry | Mathematics
   - Question display with section info
   - Question navigator updated per section
   - Auto-save working

---

## 📝 Database Collections After Seed

### 1. Tests Collection
```
{
  _id: ObjectId,
  name: "JEE Main 2024 - Full Mock Test",
  category: "JEE",
  duration: 180,
  sections: [
    { name: "Physics", questionCount: 5 },
    { name: "Chemistry", questionCount: 5 },
    { name: "Mathematics", questionCount: 5 }
  ]
}
```

### 2. Sections Collection
```
{
  _id: ObjectId,
  testId: ObjectId,
  name: "Physics",
  description: "Classical Mechanics, Thermodynamics, ...",
  order: 0,
  duration: 60,
  totalQuestions: 5,
  totalMarks: 100
}
```

### 3. Questions Collection
```
{
  _id: ObjectId,
  testId: ObjectId,
  sectionId: ObjectId,
  text: "A ball is thrown...",
  section: "Physics",
  sectionName: "Physics",
  options: [...],
  correctAnswer: "B",
  explanation: "..."
}
```

---

## ✅ Checklist After Seeding

- [x] MongoDB has test data
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Can view test in admin panel
- [ ] Can see sections in admin
- [ ] Can start exam from user dashboard
- [ ] Section tabs visible in exam
- [ ] Questions grouped by section
- [ ] Auto-save working
- [ ] Can switch sections
- [ ] Can submit and see results
- [ ] Results show section-wise breakdown

---

## 🔧 Customizing Seed Data

To modify the seed data, edit `e:\p2\server\src\scripts\seedSections.ts`:

### Add More Questions
```typescript
const physicsQuestions = [
  // ... existing questions
  {
    testId: test._id,
    sectionId: sections[0]._id,
    text: "Your new question text",
    options: [...],
    correctAnswer: "A",
    explanation: "Explanation here",
    ...
  }
]
```

### Change Section Names
```typescript
await Section.insertMany([
  {
    name: 'Quantum Mechanics',  // Change this
    ...
  },
])
```

### Modify Test Duration
```typescript
const test = await Test.create({
  duration: 240,  // Change from 180 to 240 minutes
  ...
})
```

---

## 🐛 Troubleshooting

### Error: "MongoDB Connection Failed"
```
Solution: Ensure MongoDB is running
Windows:
  - Services: mongodb (start service)
  - Or: mongod
```

### Error: "Module not found"
```
Solution: Install tsx
  npm install -g tsx
```

### Seed runs but no data appears
```
Solution: Check MongoDB connection string
  - Edit: server/.env
  - MONGODB_URI=mongodb://localhost:27017/p2
```

### Port already in use
```
Solution: Change port
  - server/.env: PORT=3002
```

---

## 📖 Next Steps

1. **Run Seed**: `npm run seed-sections`
2. **Start Backend**: `npm run dev`
3. **Start Frontend**: `npm run dev` (in root)
4. **Test Admin**: Create sections and assign questions
5. **Test User**: Take the exam with sections
6. **Review Results**: Check section-wise breakdown

---

## 📚 Related Files

- Seed Script: [seedSections.ts](../scripts/seedSections.ts)
- Section Model: [server/src/models/Section.ts](../models/Section.ts)
- Question Model: [server/src/models/Question.ts](../models/Question.ts)
- Test Model: [server/src/models/Test.ts](../models/Test.ts)
- Flow Documentation: [SECTION_MANAGEMENT_FLOW.md](../../SECTION_MANAGEMENT_FLOW.md)

---

**Questions?** Check [SECTION_MANAGEMENT_FLOW.md](../../SECTION_MANAGEMENT_FLOW.md) for complete flow documentation.

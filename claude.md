# Neapolitan Pizza Calculator

A mobile-first React application for calculating precise Neapolitan pizza dough recipes with intelligent timeline scheduling for Ooni ovens.

## Features

### Core Functionality
- **Two Fermentation Methods**:
  - Poolish (pre-ferment with commercial yeast)
  - Mother Yeast (sourdough starter)
- **Flexible Fermentation Options**:
  - Room temperature fermentation
  - Cold fermentation (overnight in fridge)
- **Customizable Parameters**:
  - Number of pizzas (1-20+)
  - Dough ball weight (200-400g, default 270g)
  - Hydration level (56-68%, default 62%)
  - Advanced settings for poolish %, starter %, and salt %

### Smart Timeline Scheduling
- Automatically calculates when to perform each step
- **Sleep-aware scheduling**: No activities between 8PM-10AM
- Includes proper bulk fermentation periods:
  - 1-1.5 hours for poolish method
  - 3-4 hours for sourdough method
- Multi-day timeline visualization with clear dates and times
- All temperatures in Fahrenheit

### Recipe Calculations
- Accurate baker's percentages for authentic Neapolitan pizza
- All measurements rounded up to clean numbers for easy measuring:
  - Flour/water: nearest 5g
  - Salt: nearest 0.5g
  - Yeast: nearest 0.1g
- Total ingredient breakdown with hydration percentage

## Technical Details

### Technologies Used
- React 18 with Hooks
- Lucide React for icons
- Tailwind CSS for styling
- Date/time manipulation in vanilla JavaScript

### Baker's Percentages

**Poolish Method:**
- Poolish: 100% hydration (equal flour and water)
- Poolish percentage: 20-50% of total flour (default 30%)
- Poolish yeast: 0.2% of poolish flour
- Final dough yeast: 0.3% of total flour
- Salt: 2-3% of total flour (default 2.5%)
- Water: 56-68% of total flour (adjustable)

**Mother Yeast Method:**
- Starter: 100% hydration
- Starter percentage: 10-30% of total flour (default 20%)
- Salt: 2-3% of total flour (default 2.5%)
- Water: 56-68% of total flour (adjustable)

### Timeline Calculation Logic

**Poolish Room Temp:**
1. Mix poolish 16 hours before final dough
2. Mix final dough
3. Bulk rest 1.5 hours
4. Ball dough and rest 6-8 hours at room temp
5. Preheat oven 1 hour before eating
6. Bake

**Poolish Cold Ferment:**
1. Mix poolish (day -2, 6 PM)
2. Mix final dough 16 hours later
3. Bulk rest 1.5 hours
4. Ball and refrigerate for 18-24 hours
5. Remove from fridge 2.5 hours before eating
6. Bake

**Mother Yeast Room Temp:**
1. Refresh starter (day -1, 10 AM)
2. Mix dough after 4-5 hours (when starter peaks)
3. Bulk ferment 3-4 hours
4. Ball and rest 18-22 hours at room temp
5. Preheat oven 1 hour before eating
6. Bake

**Mother Yeast Cold Ferment:**
1. Refresh starter (day -1, 10 AM)
2. Mix dough after 4-5 hours
3. Bulk ferment 3-4 hours
4. Ball and refrigerate for 24+ hours
5. Remove from fridge 3 hours before eating
6. Bake

Here are the complete steps to set up your Neapolitan Pizza Calculator as a Next.js 14+ app with App Router:
bash# Create a new Next.js app with App Router
npx create-next-app@latest pizza-calculator
# When prompted, choose:
# - TypeScript? No (or Yes if you prefer)
# - ESLint? Yes
# - Tailwind CSS? Yes
# - src/ directory? No
# - App Router? Yes
# - Import alias? No (or customize if desired)


# Install required dependencies
npm install lucide-react

# Start development server
npm run dev
Now create the file structure:
bash# Create the component file
touch app/page.js
Replace the contents of app/page.js with:
javascript'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ChefHat, Droplets, Scale, Calendar } from 'lucide-react';

export default function PizzaCalculator() {
  const [step, setStep] = useState(1);
  // ... rest of the component code from the artifact
}
Important note about the artifact code: The current artifact uses localStorage which I specifically avoided because it's not supported in Claude's artifact environment. However, for a local Next.js app, you could add localStorage to save recipes if you want that feature.
Since the component is quite large (the full code from the artifact), would you like me to:

Create a complete page.js file with all the code?
Break it into smaller components (Header, StepIndicator, RecipeDisplay, Timeline, etc.)?
Add TypeScript support?
Add localStorage for saving favorite recipes?

The basic structure would be:
pizza-calculator/
├── app/
│   ├── layout.js (default Next.js layout)
│   ├── page.js (your PizzaCalculator component)
│   └── globals.css (Tailwind styles)
├── package.json
└── next.config.js
Let me know which option you prefer and I'll provide the complete code files.
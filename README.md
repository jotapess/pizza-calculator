# 🍕 Neapolitan Pizza Calculator

A sophisticated web application for calculating perfect Neapolitan pizza dough recipes with intelligent timeline scheduling. Built with Next.js, React, and Tailwind CSS.

## ✨ Features

### 🥖 Two Fermentation Methods
- **Poolish Method**: Pre-ferment with commercial yeast for complex flavors
- **Sourdough Method**: Natural leavening with sourdough starter for depth and character

### ⏰ Smart Timeline Scheduling
- **Sleep-aware scheduling**: No activities between 8 PM and 10 AM
- Automatic calculation of all fermentation steps
- Multi-day timeline visualization with precise timing
- Optimized for pizza ovens (850°F)

### 🔗 Recipe Sharing
- URL-based recipe persistence
- Copy link button for easy sharing
- All settings saved in the URL
- Bookmark your favorite recipes

### 📱 Responsive Design
- Mobile-first approach
- Works on all devices
- Beautiful gradient UI
- Intuitive 4-step wizard

### ⚙️ Advanced Customization
- Adjust hydration levels (56-68%)
- Customize poolish percentage (20-50%)
- Modify starter percentage (10-30%)
- Fine-tune salt content (2-3%)
- Room temperature or cold fermentation options

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jotapess/pizza-calculator.git
cd pizza-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📋 Usage

1. **Select Pizza Count**: Choose how many pizzas you want to make
2. **Choose Method**: Select between Poolish or Sourdough fermentation
3. **Set Schedule**: Pick when you want to eat and customize settings
4. **Get Recipe**: View your precise measurements and timeline

### Example URLs

- Basic recipe: `/?pizzas=4&method=poolish&weight=270&hydration=62`
- Sourdough cold ferment: `/?pizzas=6&method=sourdough&ferment=cold&step=4`

## 🧮 Baker's Percentages

### Poolish Method
- Poolish: 100% hydration (equal flour and water)
- Poolish percentage: 20-50% of total flour (default 30%)
- Poolish yeast: 0.2% of poolish flour
- Final dough yeast: 0.3% of total flour

### Sourdough Method
- Starter: 100% hydration
- Starter percentage: 10-30% of total flour (default 20%)
- Natural fermentation process

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjotapess%2Fpizza-calculator)

### Manual Deployment

1. Build the production version:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**jotapess** - [GitHub Profile](https://github.com/jotapess)

## 🙏 Acknowledgments

- Inspired by traditional Neapolitan pizza making techniques
- Built for home pizza enthusiasts with pizza ovens
- Based on authentic Italian pizza dough recipes

---

**Live Demo**: [Deploy your own on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjotapess%2Fpizza-calculator)

Made with ❤️ for pizza lovers everywhere 🍕
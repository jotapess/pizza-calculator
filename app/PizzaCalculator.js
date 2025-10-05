'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Clock, ChefHat, Droplets, Scale, Calendar, Link2 } from 'lucide-react';

export default function PizzaCalculatorWithURL() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State with defaults
  const [step, setStep] = useState(1);
  const [pizzaCount, setPizzaCount] = useState(4);
  const [method, setMethod] = useState('poolish');
  const [ballWeight, setBallWeight] = useState(270);
  const [eatDate, setEatDate] = useState('');
  const [eatTime, setEatTime] = useState('19:00');
  const [hydration, setHydration] = useState(62);
  const [poolishPercent, setPoolishPercent] = useState(30);
  const [starterPercent, setStarterPercent] = useState(20);
  const [saltPercent, setSaltPercent] = useState(2.5);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [fermentationType, setFermentationType] = useState('room');
  const [showShareConfirm, setShowShareConfirm] = useState(false);

  // Load state from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Load from URL if params exist
    if (params.get('pizzas')) setPizzaCount(parseInt(params.get('pizzas')) || 4);
    if (params.get('method')) setMethod(params.get('method'));
    if (params.get('weight')) setBallWeight(parseInt(params.get('weight')) || 270);
    if (params.get('hydration')) setHydration(parseInt(params.get('hydration')) || 62);
    if (params.get('ferment')) setFermentationType(params.get('ferment'));
    if (params.get('poolish')) setPoolishPercent(parseInt(params.get('poolish')) || 30);
    if (params.get('starter')) setStarterPercent(parseInt(params.get('starter')) || 20);
    if (params.get('salt')) setSaltPercent(parseFloat(params.get('salt')) || 2.5);
    if (params.get('step')) setStep(parseInt(params.get('step')) || 1);
    
    // Handle dates
    if (params.get('date')) {
      setEatDate(params.get('date'));
    } else {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setEatDate(tomorrow.toISOString().split('T')[0]);
    }
    
    if (params.get('time')) setEatTime(params.get('time'));
  }, [searchParams]);

  // Update URL when state changes
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    
    // Always include current state
    params.set('pizzas', pizzaCount.toString());
    params.set('method', method);
    params.set('weight', ballWeight.toString());
    params.set('hydration', hydration.toString());
    params.set('ferment', fermentationType);
    params.set('salt', saltPercent.toString());
    params.set('step', step.toString());
    
    // Include method-specific params
    if (method === 'poolish') {
      params.set('poolish', poolishPercent.toString());
    } else {
      params.set('starter', starterPercent.toString());
    }
    
    // Include date/time if set
    if (eatDate) params.set('date', eatDate);
    if (eatTime) params.set('time', eatTime);
    
    // Update URL without navigation
    router.push(`?${params.toString()}`, { scroll: false });
  }, [
    pizzaCount, method, ballWeight, hydration, fermentationType,
    saltPercent, step, poolishPercent, starterPercent, eatDate, eatTime, router
  ]);

  // Update URL whenever relevant state changes
  useEffect(() => {
    updateURL();
  }, [updateURL]);

  // Copy link functionality
  const copyLink = async () => {
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      setShowShareConfirm(true);
      setTimeout(() => setShowShareConfirm(false), 3000);
    } catch (err) {
      console.error('Error copying link:', err);
    }
  };

  // Reset to default settings
  const resetToDefaults = () => {
    setPizzaCount(4);
    setMethod('poolish');
    setBallWeight(270);
    setHydration(62);
    setFermentationType('room');
    setPoolishPercent(30);
    setStarterPercent(20);
    setSaltPercent(2.5);
    setShowAdvanced(false);
    setStep(1);
    
    // Reset date to tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setEatDate(tomorrow.toISOString().split('T')[0]);
    setEatTime('19:00');
  };

  const adjustTimeForSleep = (dateTime) => {
    const hour = dateTime.getHours();
    if (hour >= 20 || hour < 10) {
      const adjusted = new Date(dateTime);
      if (hour >= 20) {
        adjusted.setDate(adjusted.getDate() + 1);
        adjusted.setHours(10, 0, 0, 0);
      } else {
        adjusted.setHours(10, 0, 0, 0);
      }
      return adjusted;
    }
    return dateTime;
  };

  // Helper function to format display values with max 1 decimal place
  const formatAmount = (num) => {
    // If it's a whole number, show without decimal
    if (num === Math.floor(num)) {
      return num.toString();
    }
    // Otherwise, show with max 1 decimal place
    return num.toFixed(1).replace(/\.0$/, '');
  };

  const calculateRecipe = () => {
    const totalDoughWeight = pizzaCount * ballWeight;
    const flourWeight = totalDoughWeight / (1 + hydration/100 + saltPercent/100 + 0.005);
    
    const roundUp5 = (num) => Math.ceil(num / 5) * 5;
    const roundUp05 = (num) => {
      const rounded = Math.ceil(num / 0.5) * 0.5;
      return Math.round(rounded * 10) / 10; // Ensure max 1 decimal
    };
    const roundUp01 = (num) => {
      const rounded = Math.ceil(num / 0.1) * 0.1;
      return Math.round(rounded * 10) / 10; // Ensure max 1 decimal
    };
    
    if (method === 'poolish') {
      const poolishFlour = flourWeight * (poolishPercent / 100);
      const poolishWater = poolishFlour;
      const poolishYeast = poolishFlour * 0.002;
      const remainingFlour = flourWeight - poolishFlour;
      const totalWater = flourWeight * (hydration / 100);
      const remainingWater = totalWater - poolishWater;
      const salt = flourWeight * (saltPercent / 100);
      const doughYeast = flourWeight * 0.003;
      
      return {
        poolish: { flour: roundUp5(poolishFlour), water: roundUp5(poolishWater), yeast: roundUp01(poolishYeast) },
        dough: { flour: roundUp5(remainingFlour), water: roundUp5(remainingWater), salt: roundUp05(salt), yeast: roundUp01(doughYeast), poolish: roundUp5(poolishFlour + poolishWater) },
        total: { flour: roundUp5(flourWeight), water: roundUp5(flourWeight * hydration/100), salt: roundUp05(flourWeight * saltPercent/100) }
      };
    } else {
      const starterFlour = flourWeight * (starterPercent / 100) / 2;
      const starterWater = starterFlour;
      const starterTotal = starterFlour + starterWater;
      const remainingFlour = flourWeight - starterFlour;
      const totalWater = flourWeight * (hydration / 100);
      const remainingWater = totalWater - starterWater;
      const salt = flourWeight * (saltPercent / 100);
      
      return {
        starter: { amount: roundUp5(starterTotal), flour: roundUp5(starterFlour), water: roundUp5(starterWater) },
        dough: { flour: roundUp5(remainingFlour), water: roundUp5(remainingWater), salt: roundUp05(salt), starter: roundUp5(starterTotal) },
        total: { flour: roundUp5(flourWeight), water: roundUp5(flourWeight * hydration/100), salt: roundUp05(flourWeight * saltPercent/100) }
      };
    }
  };

  const calculateTimeline = () => {
    if (!eatDate || !eatTime) return [];
    const eatDateTime = new Date(`${eatDate}T${eatTime}`);
    const timeline = [];
    
    if (method === 'poolish') {
      if (fermentationType === 'room') {
        let poolishStart = new Date(eatDateTime);
        poolishStart.setDate(poolishStart.getDate() - 1);
        poolishStart.setHours(18, 0, 0, 0);
        poolishStart = adjustTimeForSleep(poolishStart);
        let doughMix = new Date(poolishStart.getTime() + (16 * 60 * 60 * 1000));
        doughMix = adjustTimeForSleep(doughMix);
        const ballTime = new Date(doughMix.getTime() + 5400000);
        const prep = new Date(eatDateTime.getTime() - (1 * 60 * 60 * 1000));
        timeline.push(
          { time: poolishStart, task: 'Mix poolish', desc: 'Equal parts flour and water with 0.2% yeast. Cover loosely at room temp.' },
          { time: doughMix, task: 'Mix final dough', desc: 'Poolish should be bubbly and domed. Add remaining ingredients, knead until smooth. Cover and let rest.' },
          { time: ballTime, task: 'Ball the dough', desc: 'After 1-1.5 hr bulk rest, divide into portions and shape into tight balls. Cover and rest at room temp (72-75°F).' },
          { time: prep, task: 'Prep & preheat pizza oven', desc: 'Prepare toppings, heat pizza oven to 850°F. Dough should be airy and extensible.' },
          { time: eatDateTime, task: 'Pizza time!', desc: 'Stretch gently from center, top, and bake 60-90 seconds.' }
        );
      } else {
        let poolishStart = new Date(eatDateTime);
        poolishStart.setDate(poolishStart.getDate() - 2);
        poolishStart.setHours(18, 0, 0, 0);
        poolishStart = adjustTimeForSleep(poolishStart);
        let doughMix = new Date(poolishStart.getTime() + (16 * 60 * 60 * 1000));
        doughMix = adjustTimeForSleep(doughMix);
        const ballTime = new Date(doughMix.getTime() + (1.5 * 60 * 60 * 1000));
        const pullFromFridge = new Date(eatDateTime.getTime() - (2.5 * 60 * 60 * 1000));
        const prep = new Date(eatDateTime.getTime() - (1 * 60 * 60 * 1000));
        timeline.push(
          { time: poolishStart, task: 'Mix poolish', desc: 'Equal parts flour and water with 0.2% yeast. Cover loosely at room temp.' },
          { time: doughMix, task: 'Mix final dough', desc: 'Poolish should be bubbly. Add remaining ingredients, knead well. Let rest 1-1.5 hours.' },
          { time: ballTime, task: 'Ball & refrigerate', desc: 'After bulk rest, shape into tight balls. Place in airtight container, refrigerate for 18-24 hrs.' },
          { time: pullFromFridge, task: 'Remove from fridge', desc: 'Let balls warm up at room temp for 2-3 hours before stretching.' },
          { time: prep, task: 'Prep & preheat pizza oven', desc: 'Prepare toppings, heat pizza oven to 850°F.' },
          { time: eatDateTime, task: 'Pizza time!', desc: 'Dough should be relaxed and easy to stretch.' }
        );
      }
    } else {
      if (fermentationType === 'room') {
        let starterRefresh = new Date(eatDateTime);
        starterRefresh.setDate(starterRefresh.getDate() - 1);
        starterRefresh.setHours(10, 0, 0, 0);
        starterRefresh = adjustTimeForSleep(starterRefresh);
        let doughMix = new Date(starterRefresh.getTime() + (4.5 * 60 * 60 * 1000));
        doughMix = adjustTimeForSleep(doughMix);
        const ballTime = new Date(doughMix.getTime() + (3.5 * 60 * 60 * 1000));
        const prep = new Date(eatDateTime.getTime() - (1 * 60 * 60 * 1000));
        timeline.push(
          { time: starterRefresh, task: 'Refresh mother yeast', desc: 'Feed starter at 1:5:5 ratio. Keep at 78°F until tripled (~4-5 hrs).' },
          { time: doughMix, task: 'Mix final dough', desc: 'Starter should be at peak. Mix with 15-20% starter. Cover and let bulk ferment.' },
          { time: ballTime, task: 'Ball the dough', desc: 'After 3-4 hr bulk ferment, shape into tight balls. Cover and rest at room temp (72-75°F) for 18-22 hours.' },
          { time: prep, task: 'Prep & preheat pizza oven', desc: 'Dough should be airy and domed. Heat pizza oven to 850°F.' },
          { time: eatDateTime, task: 'Pizza time!', desc: 'Stretch carefully - sourdough is delicate and flavorful.' }
        );
      } else {
        let starterRefresh = new Date(eatDateTime);
        starterRefresh.setDate(starterRefresh.getDate() - 1);
        starterRefresh.setHours(10, 0, 0, 0);
        starterRefresh = adjustTimeForSleep(starterRefresh);
        let doughMix = new Date(starterRefresh.getTime() + (4.5 * 60 * 60 * 1000));
        doughMix = adjustTimeForSleep(doughMix);
        const ballTime = new Date(doughMix.getTime() + (3.5 * 60 * 60 * 1000));
        const pullFromFridge = new Date(eatDateTime.getTime() - (3 * 60 * 60 * 1000));
        const prep = new Date(eatDateTime.getTime() - (1 * 60 * 60 * 1000));
        timeline.push(
          { time: starterRefresh, task: 'Refresh mother yeast', desc: 'Feed starter at 1:5:5 ratio. Keep at 78°F until tripled and active (~4-5 hrs).' },
          { time: doughMix, task: 'Mix dough & bulk ferment', desc: 'Mix when starter is at peak. Cover and let bulk ferment at room temp.' },
          { time: ballTime, task: 'Ball & refrigerate', desc: 'After 3-4 hr bulk ferment, shape balls. Place in airtight container, refrigerate for 24+ hours.' },
          { time: pullFromFridge, task: 'Remove from fridge', desc: 'Let warm up for 3 hours. Dough will be complex and aromatic.' },
          { time: prep, task: 'Prep & preheat pizza oven', desc: 'Heat pizza oven to 850°F.' },
          { time: eatDateTime, task: 'Pizza time!', desc: 'Peak sourdough flavor and texture.' }
        );
      }
    }
    return timeline;
  };

  const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const recipe = step >= 4 ? calculateRecipe() : null;
  const timeline = step >= 4 ? calculateTimeline() : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ChefHat className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-800">Pizza Napoletana</h1>
          </div>
          <p className="text-gray-600">Pizza Recipe Calculator</p>
        </div>
        
        {/* Copy link button - always visible */}
        <div className="flex justify-center mb-6">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 hover:text-red-600"
          >
            <Link2 className="w-4 h-4" />
            <span className="text-sm font-medium">Copy Link</span>
          </button>
          {showShareConfirm && (
            <div className="ml-2 px-3 py-2 bg-green-100 text-green-700 rounded-full text-sm animate-pulse">
              Link copied!
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-2 w-16 rounded-full transition-all ${s <= step ? 'bg-red-600' : 'bg-gray-300'}`} />
          ))}
        </div>
        
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How many pizzas?</h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <button onClick={() => setPizzaCount(Math.max(1, pizzaCount - 1))} className="w-14 h-14 rounded-full bg-red-600 text-white text-2xl font-bold hover:bg-red-700 transition-colors">−</button>
              <div className="text-6xl font-bold text-red-600 w-24 text-center">{pizzaCount}</div>
              <button onClick={() => setPizzaCount(pizzaCount + 1)} className="w-14 h-14 rounded-full bg-red-600 text-white text-2xl font-bold hover:bg-red-700 transition-colors">+</button>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-700 transition-colors">Continue</button>
          </div>
        )}
        
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose your method</h2>
            <div className="space-y-4 mb-6">
              <button onClick={() => setMethod('poolish')} className={`w-full p-6 rounded-2xl border-2 transition-all ${method === 'poolish' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                <div className="text-left"><div className="text-xl font-bold text-gray-800 mb-2">Poolish</div><div className="text-sm text-gray-600">Pre-ferment with commercial yeast. Complex flavor, 16-hour timeline.</div></div>
              </button>
              <button onClick={() => setMethod('sourdough')} className={`w-full p-6 rounded-2xl border-2 transition-all ${method === 'sourdough' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
                <div className="text-left"><div className="text-xl font-bold text-gray-800 mb-2">Mother Yeast (Sourdough)</div><div className="text-sm text-gray-600">Natural leavening with sourdough starter. Deep flavor, 20-hour timeline.</div></div>
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-300 transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-700 transition-colors">Continue</button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">When are you eating?</h2>
            <div className="space-y-6 mb-6">
              <div><label className="block text-sm font-semibold text-gray-700 mb-2"><Calendar className="inline w-4 h-4 mr-1" />Date</label><input type="date" value={eatDate} onChange={(e) => setEatDate(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-red-600 focus:outline-none" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-2"><Clock className="inline w-4 h-4 mr-1" />Time</label><input type="time" value={eatTime} onChange={(e) => setEatTime(e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-red-600 focus:outline-none" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-2"><Scale className="inline w-4 h-4 mr-1" />Dough ball weight (grams)</label><input type="number" value={ballWeight} onChange={(e) => setBallWeight(Number(e.target.value))} className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-red-600 focus:outline-none" min="200" max="400" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-2"><Droplets className="inline w-4 h-4 mr-1" />Hydration: {hydration}%</label><input type="range" value={hydration} onChange={(e) => setHydration(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" min="56" max="68" /><div className="flex justify-between text-xs text-gray-500 mt-1"><span>56%</span><span>68%</span></div></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-3">Fermentation type</label><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => setFermentationType('room')} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${fermentationType === 'room' ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}>Room Temp<div className="text-xs font-normal mt-1">{method === 'poolish' ? 'Same day (6-8h)' : '18-22 hours'}</div></button><button type="button" onClick={() => setFermentationType('cold')} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${fermentationType === 'cold' ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-red-300'}`}>Cold Ferment<div className="text-xs font-normal mt-1">Overnight in fridge</div></button></div></div>
              <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-red-600 font-semibold hover:text-red-700">{showAdvanced ? '− Hide' : '+ Show'} advanced settings</button>
              {showAdvanced && (
                <div className="space-y-4 pt-2 border-t border-gray-200">
                  {method === 'poolish' && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Poolish percentage: {poolishPercent}%</label><input type="range" value={poolishPercent} onChange={(e) => setPoolishPercent(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" min="20" max="50" /></div>}
                  {method === 'sourdough' && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Starter percentage: {starterPercent}%</label><input type="range" value={starterPercent} onChange={(e) => setStarterPercent(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" min="10" max="30" /></div>}
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Salt percentage: {saltPercent}%</label><input type="range" value={saltPercent} onChange={(e) => setSaltPercent(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" min="2" max="3" step="0.1" /></div>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-300 transition-colors">Back</button>
              <button onClick={() => setStep(4)} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-700 transition-colors">Calculate</button>
            </div>
          </div>
        )}
        
        {step === 4 && recipe && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Recipe</h2>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Link2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Copy Link</span>
                </button>
              </div>
              {method === 'poolish' ? (
                <>
                  <div className="mb-6 pb-6 border-b border-gray-200"><h3 className="font-bold text-lg text-red-600 mb-4">Poolish</h3><div className="space-y-2"><div className="flex justify-between"><span className="text-gray-700">00 Flour</span><span className="font-bold">{formatAmount(recipe.poolish.flour)}g</span></div><div className="flex justify-between"><span className="text-gray-700">Water</span><span className="font-bold">{formatAmount(recipe.poolish.water)}g</span></div><div className="flex justify-between"><span className="text-gray-700">Instant Yeast</span><span className="font-bold">{formatAmount(recipe.poolish.yeast)}g</span></div></div></div>
                  <div><h3 className="font-bold text-lg text-red-600 mb-4">Final Dough</h3><div className="space-y-2"><div className="flex justify-between"><span className="text-gray-700">Poolish (all of it)</span><span className="font-bold">{formatAmount(recipe.dough.poolish)}g</span></div><div className="flex justify-between"><span className="text-gray-700">00 Flour</span><span className="font-bold">{formatAmount(recipe.dough.flour)}g</span></div><div className="flex justify-between"><span className="text-gray-700">Water</span><span className="font-bold">{formatAmount(recipe.dough.water)}g</span></div><div className="flex justify-between"><span className="text-gray-700">Salt</span><span className="font-bold">{formatAmount(recipe.dough.salt)}g</span></div><div className="flex justify-between"><span className="text-gray-700">Instant Yeast</span><span className="font-bold">{formatAmount(recipe.dough.yeast)}g</span></div></div></div>
                </>
              ) : (
                <>
                  <div className="mb-6 pb-6 border-b border-gray-200"><h3 className="font-bold text-lg text-red-600 mb-4">Sourdough Starter</h3><div className="space-y-2"><div className="flex justify-between"><span className="text-gray-700">Active starter (100% hydration)</span><span className="font-bold">{formatAmount(recipe.starter.amount)}g</span></div></div></div>
                  <div><h3 className="font-bold text-lg text-red-600 mb-4">Final Dough</h3><div className="space-y-2"><div className="flex justify-between"><span className="text-gray-700">Starter (all of it)</span><span className="font-bold">{formatAmount(recipe.dough.starter)}g</span></div><div className="flex justify-between"><span className="text-gray-700">00 Flour</span><span className="font-bold">{formatAmount(recipe.dough.flour)}g</span></div><div className="flex justify-between"><span className="text-gray-700">Water</span><span className="font-bold">{formatAmount(recipe.dough.water)}g</span></div><div className="flex justify-between"><span className="text-gray-700">Salt</span><span className="font-bold">{formatAmount(recipe.dough.salt)}g</span></div></div></div>
                </>
              )}
              <div className="mt-6 pt-6 border-t border-gray-200"><div className="text-sm text-gray-600 space-y-1"><div className="flex justify-between"><span>Total flour:</span><span>{formatAmount(recipe.total.flour)}g</span></div><div className="flex justify-between"><span>Total water:</span><span>{formatAmount(recipe.total.water)}g</span></div><div className="flex justify-between"><span>Hydration:</span><span>{hydration}%</span></div></div></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Timeline</h2>
              <div className="relative">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative pb-8 last:pb-0">
                    {idx < timeline.length - 1 && <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-red-200" />}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center relative z-10">{idx === timeline.length - 1 ? <span className="text-white text-lg">🍕</span> : <Clock className="w-4 h-4 text-white" />}</div>
                      <div className="flex-1 pt-1"><div className="flex justify-between items-start mb-1"><h3 className="font-bold text-gray-800">{item.task}</h3><span className="text-sm text-gray-500 whitespace-nowrap ml-2">{formatDate(item.time)}</span></div><div className="text-sm font-semibold text-red-600 mb-1">{formatTime(item.time)}</div><p className="text-sm text-gray-600">{item.desc}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-300 transition-colors">Adjust</button>
              <button onClick={resetToDefaults} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-700 transition-colors">New Recipe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
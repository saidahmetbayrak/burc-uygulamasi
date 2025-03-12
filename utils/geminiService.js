import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

// Cache object to store horoscope predictions
const cache = {
  daily: {},
  weekly: {},
  monthly: {}
};

// Function to generate horoscope prompt based on zodiac sign and period
const generatePrompt = (zodiacSign, period) => {
  const basePrompt = `Generate a ${period} horoscope prediction for ${zodiacSign} zodiac sign. Include insights about love, career, and well-being. Keep it optimistic and motivational. Response should be in Turkish language.`;
  return basePrompt;
};

// Function to check if cached prediction is still valid
const isCacheValid = (zodiacSign, period) => {
  const cached = cache[period][zodiacSign];
  if (!cached) return false;

  const now = new Date();
  const cacheTime = new Date(cached.timestamp);

  switch (period) {
    case 'daily':
      // Cache valid for 24 hours
      return (now - cacheTime) < 24 * 60 * 60 * 1000;
    case 'weekly':
      // Cache valid for 7 days
      return (now - cacheTime) < 7 * 24 * 60 * 60 * 1000;
    case 'monthly':
      // Cache valid for 30 days
      return (now - cacheTime) < 30 * 24 * 60 * 60 * 1000;
    default:
      return false;
  }
};

// Main function to get horoscope prediction
export const getHoroscopePrediction = async (zodiacSign, period = 'daily') => {
  try {
    // Check cache first
    if (isCacheValid(zodiacSign, period)) {
      return cache[period][zodiacSign].prediction;
    }

    // Generate new prediction using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = generatePrompt(zodiacSign, period);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const prediction = response.text();

    // Cache the new prediction
    cache[period][zodiacSign] = {
      prediction,
      timestamp: new Date().toISOString()
    };

    return prediction;
  } catch (error) {
    console.error('Error getting horoscope prediction:', error);
    throw new Error('Burç yorumu alınırken bir hata oluştu.');
  }
};
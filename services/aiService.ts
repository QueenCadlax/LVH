import { GoogleGenAI, Type } from "@google/genai";
import { businesses, properties, destinations, carListings } from "../data/seeds";
import { Category } from "../types";

/**
 * Gets smart recommendations based on a search query using Gemini 3 Flash.
 */
export const getSmartRecommendations = async (query: string): Promise<string[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const sectors = Object.values(Category).join(', ');
    // Refined to use responseSchema and responseMimeType as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User search: "${query}". Return 3 relevant top-level service category names (use the Directory sectors: ${sectors}). Understand South African informal terms (e.g. shisanyama, braai, bakkie, koppie, boma) and map them to the correct sector. Prioritise categories that are most relevant and likely to contain verified or premium listings. Respond with a JSON array of 3 strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    const text = response.text?.trim() || '[]';
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Search Error", error);
    return ['Restaurants', 'Tourism', 'Real Estate'];
  }
};

/**
 * Handles chat interactions with the AI Concierge using Gemini 3 Flash.
 */
export const chatWithConcierge = async (message: string, history: string[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are the Lowveld AI Concierge, a luxury assistant for Mpumalanga (LowveldHub). Understand local South African terms and slang (examples: 'shisanyama' -> braai/restaurant; 'bakkie' -> light pickup/vehicle; 'koppie' -> small hill/landmark; 'boma' -> outdoor enclosure/venue). When given a search or recommendation request, prioritise and explicitly surface verified, Premium, Elite and Platinum listings first, then higher-rated businesses, then local proximity. If user asks about cars, recommend verified dealers first, then sponsored listings. Provide concise contextual reasoning (1 sentence) why each recommendation is ranked. Use polite, sophisticated tone and keep responses short (<= 80 words).",
      },
    });
    
    const result = await chat.sendMessage({ message });
    return result.text || "I apologize, I am unable to process that request at the moment.";
  } catch (error) {
     return "I am currently offline. Please try again later.";
  }
};

/**
 * Generates a luxury SEO description for a business listing.
 */
export const generateListingDescription = async (name: string, type: string): Promise<string> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Write a 2-sentence luxury SEO description for a ${type} called "${name}" in Mpumalanga.`,
        });
        return response.text || "";
    } catch (e) {
        return `Experience the best of ${name}. A premium ${type} destination.`;
    }
}

/**
 * Generates detailed listing profiles including SEO tags and category placement.
 */
export const generateAIListingDetails = async (name: string, type: string, context: string = ''): Promise<{ description: string, tags: string[], category: string }> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `You are a Luxury SEO & Marketing Expert for LowveldHub, Mpumalanga's premier digital ecosystem. Task: Create a premium business listing profile for "${name}". Context: ${context}. Output: a short luxury description (1-2 sentences), 5 SEO tags, and the best matching top-level Category name from LowveldHub sectors. Use South African local terms when appropriate and suggest one hero image theme. Prioritise keywords that signal verification, premium service, and trust (e.g., Verified, Elite, Family-owned, Award-winning).`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        description: { type: Type.STRING },
                        tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                        category: { type: Type.STRING }
                    },
                    required: ["description", "tags", "category"]
                }
            }
        });

        const text = response.text?.trim() || "{}";
        return JSON.parse(text);
    } catch (error) {
        return {
            description: `Experience premium service at ${name}. A top-tier destination in Mpumalanga.`,
            tags: ["Premium", "Mpumalanga", "Service"],
        category: Category.BusinessAndProfessional
        };
    }
}

/**
 * Generates a bulleted summary of hypothetical reviews using Gemini 3 Flash.
 */
export const generateReviewSummary = async (name: string, description: string): Promise<string[]> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Generate a 3-bullet point summary of hypothetical positive user reviews for a business named "${name}" described as: "${description}". Focus on service, atmosphere, and quality.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
            }
        });
        
        const text = response.text?.trim() || '[]';
        return JSON.parse(text);
    } catch (error) {
        return [
            "Users praise the exceptional service and attention to detail.",
            "The atmosphere is consistently rated as luxurious and welcoming.",
            "High-quality offerings that exceed expectations."
        ];
    }
}

/**
 * Performs semantic smart search across various listing indices using Gemini 3 Flash.
 */
export const performSmartSearch = async (query: string): Promise<string[]> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const index = [
            ...businesses.map(b => ({ id: b.id, name: b.name, desc: b.description, type: 'business' })),
            ...properties.map(p => ({ id: p.id, name: p.title, desc: p.description, type: 'property' })),
            ...destinations.map(d => ({ id: d.id, name: d.name, desc: d.description, type: 'destination' })),
            ...carListings.map(c => ({ id: c.id, name: c.title, desc: c.dealer, type: 'car' }))
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
          contents: `Search LowveldHub for: "${query}". Use the provided index to find relevant matches. Map local slang and informal terms to canonical sectors (e.g., shisanyama -> ${Category.FoodAndHospitality}). Rank results by: 1) verified/premium/elite/platinum status, 2) listing tier, 3) rating, 4) textual relevance to query, 5) proximity (if location present). Return a JSON array of matching IDs ordered from highest to lowest relevance. Use only IDs present in the index: ${JSON.stringify(index.slice(0, 50))}`,
             config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });

        const text = response.text?.trim() || '[]';
        return JSON.parse(text);
    } catch (error) {
        return [];
    }
}

/**
 * Generates a luxury car image based on the title.
 */
export const generateCarImage = async (carTitle: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional studio photograph of a ${carTitle}. High-end commercial look, sleek lighting, 4k resolution.` }]
      },
      config: {
        imageConfig: { aspectRatio: "4:3" }
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
    }
    return "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600";
  } catch (error) {
    console.error("Car image generation error", error);
    return "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600";
  }
};

/**
 * Generates a luxury placeholder image for a business category.
 */
export const generateLuxuryPlaceholder = async (type: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-end, luxury photography shot of a ${type} in the Mpumalanga Lowveld region. Sophisticated, elegant, professional lighting.` }]
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
    }
    return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800";
  } catch (error) {
    console.error("Luxury placeholder generation error", error);
    return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800";
  }
};

/**
 * Enhances a campaign brief for creators using AI.
 */
export const enhanceCampaignBrief = async (brief: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance and professionalize this campaign brief for a luxury Mpumalanga directory: "${brief}"`,
    });
    return response.text || brief;
  } catch (error) {
    return brief;
  }
};

/**
 * Enhances a business story content using AI.
 */
export const enhanceStoryContent = async (story: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Rewrite this story to be more compelling and sophisticated for Lowveld Stories: "${story}"`,
    });
    return response.text || story;
  } catch (error) {
    return story;
  }
};

/**
 * Provides property recommendations and filter suggestions based on natural language query.
 */
export const getPropertyRecommendations = async (query: string): Promise<{ suggestions: string[], message: string }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is searching for luxury properties in Mpumalanga and says: "${query}". 
      
      Based on their request, suggest:
      1. What type of property (Sale/Rent)
      2. Recommended price range if mentioned
      3. Areas to focus on
      4. Key amenities they might want
      5. A brief recommendation message
      
      Respond in JSON format with keys: type, priceRange, areas, amenities, message`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            priceRange: { type: Type.STRING },
            areas: { type: Type.ARRAY, items: { type: Type.STRING } },
            amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
            message: { type: Type.STRING }
          },
          required: ["type", "message"]
        }
      }
    });

    const text = response.text?.trim() || '{"message": "I can help you find the perfect property in Mpumalanga!", "suggestions": []}';
    const data = JSON.parse(text);
    
    return {
      suggestions: data.areas || [],
      message: data.message || "I can help you find the perfect property in Mpumalanga!"
    };
  } catch (error) {
    console.error("AI Property Recommendation Error", error);
    return {
      suggestions: ["White River", "Hazyview", "Sabie"],
      message: "I can help you find luxury properties across Mpumalanga. Tell me your preferences!"
    };
  }
};

/**
 * AI-powered smart search with natural language understanding.
 * Examples:
 *  - "I need a gynaecologist near Nelspruit"
 *  - "Find me a cardiologist in Mbombela"
 *  - "Best dentists around White River"
 */
export const performSmartMedicalSearch = async (query: string, allBusinesses: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Extract category, specialty, and area from natural language
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User query: "${query}"
      
Extract the following from the user's natural language search:
1. Medical specialty/type (e.g., "gynaecologist", "dentist", "cardiologist", "physiotherapist", "pharmacist", "general practitioner")
2. Area preference (e.g., "Nelspruit", "Mbombela", "White River", or "anywhere" if not specified)

Understand South African medical terminology and informal terms.

Respond with JSON: { "specialty": "string", "area": "string or 'any'" }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specialty: { type: Type.STRING },
            area: { type: Type.STRING }
          }
        }
      }
    });
    
    const parsed = JSON.parse(response.text || '{"specialty":"","area":"any"}');
    const specialty = parsed.specialty?.toUpperCase() || '';
    const areaPreference = parsed.area?.toLowerCase() || 'any';
    
    // Filter businesses by specialty and area
    let results = allBusinesses.filter((b: any) => {
      const subcategoryMatch = b.subcategory?.toUpperCase()?.includes(specialty) ||
                               b.name?.toUpperCase()?.includes(specialty) ||
                               b.specialties?.some((s: string) => s.toUpperCase().includes(specialty));
      
      const areaMatch = areaPreference === 'any' || 
                        b.area?.toLowerCase()?.includes(areaPreference) ||
                        b.location?.toLowerCase()?.includes(areaPreference);
      
      return subcategoryMatch && areaMatch;
    });
    
    // Sort by: verified → tier → rating
    results.sort((a: any, b: any) => {
      if (b.verified !== a.verified) return b.verified ? 1 : -1;
      const tierOrder: any = { 'Platinum': 4, 'Elite': 3, 'Premium': 2, 'Trial': 1 };
      const tierDiff = (tierOrder[b.tier] || 0) - (tierOrder[a.tier] || 0);
      if (tierDiff !== 0) return tierDiff;
      return b.rating - a.rating;
    });
    
    // Generate explanation
    let explanation = '';
    if (results.length === 0) {
      explanation = `No ${specialty.toLowerCase()} found${areaPreference !== 'any' ? ` in ${areaPreference}` : ''}. Try a different specialty or area.`;
    } else if (results.length === 1) {
      explanation = `Found 1 verified specialist. Recommended based on verification, tier, and rating.`;
    } else {
      const verified = results.filter((r: any) => r.verified).length;
      const elite = results.filter((r: any) => r.tier === 'Elite' || r.tier === 'Platinum').length;
      explanation = `Found ${results.length} results: ${verified} verified, ${elite} premium. Ranked by verification, tier, and rating.`;
    }
    
    return {
      results: results.slice(0, 12), // Top 12 results
      explanation,
      query: specialty,
      area: areaPreference
    };
  } catch (error) {
    console.error("AI Smart Medical Search Error", error);
    return {
      results: [],
      explanation: "Search temporarily unavailable. Please try again.",
      query: '',
      area: 'any'
    };
  }
};

/**
 * Finds complementary businesses that match well with a given business (AI Business Matchmaker).
 * Used to suggest cross-selling opportunities for Platinum & Elite listings.
 */
export const findBusinessMatches = async (businessName: string, businessCategory: string, businessArea: string, allBusinesses: any[]): Promise<any[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const businessIndex = allBusinesses.slice(0, 30).map((b: any) => ({
      id: b.id,
      name: b.name,
      category: b.category,
      location: b.location,
      tier: b.tier,
      rating: b.rating
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find 4-5 complementary businesses that would pair well with "${businessName}" in category "${businessCategory}" located in ${businessArea}. 
      
      Consider:
      1. Services that naturally complement (e.g., wedding planner + photographer + catering)
      2. Same area preference
      3. Verified/Premium tier businesses
      4. High ratings
      
      Available businesses: ${JSON.stringify(businessIndex)}
      
      Return JSON: [{ id: string, matchReason: string (1 sentence why they complement), matchScore: 0-100 }]`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              matchReason: { type: Type.STRING },
              matchScore: { type: Type.NUMBER }
            }
          }
        }
      }
    });

    const text = response.text?.trim() || '[]';
    const matches = JSON.parse(text);
    
    // Enhance with full business data
    return matches.map((m: any) => {
      const business = allBusinesses.find(b => b.id === m.id);
      return {
        id: m.id,
        name: business?.name || '',
        matchReason: m.matchReason,
        matchScore: m.matchScore,
        image: business?.image || '',
        location: business?.location || '',
        tier: business?.tier || '',
        rating: business?.rating || 0,
        category: business?.category || ''
      };
    }).sort((a: any, b: any) => b.matchScore - a.matchScore);
  } catch (error) {
    console.error("AI Business Matchmaker Error", error);
    return [];
  }
};

/**
 * Generates a luxury area deep-dive guide for any Mpumalanga area.
 */
export const generateAreaGuide = async (areaName: string, businesses: any[], destinations: any[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Get businesses and destinations for this area
    const areaBusinesses = businesses.filter((b: any) => b.location?.includes(areaName)).slice(0, 5);
    const areaDestinations = destinations.filter((d: any) => d.location?.includes(areaName)).slice(0, 5);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a luxury travel guide for ${areaName} in Mpumalanga, South Africa.
      
      Include:
      1. 2-paragraph introduction highlighting local charm, best time to visit, estimated daily budget
      2. Top 3-5 experiences (nature, dining, wellness)
      3. Local insider tips (3 tips)
      4. Estimated distance from Nelspruit
      5. Best time to visit with brief reason
      
      Area businesses: ${JSON.stringify(areaBusinesses.map(b => b.name))}
      Area attractions: ${JSON.stringify(areaDestinations.map(d => d.name))}
      
      Write in sophisticated, luxury travel magazine tone. Keep it compelling but concise (<300 words).`,
    });

    return response.text || `Experience the charm of ${areaName}, a jewel in Mpumalanga's crown...`;
  } catch (error) {
    console.error("AI Area Guide Generation Error", error);
    return `${areaName} offers authentic Mpumalanga experiences. Discover local culture, natural beauty, and premium hospitality.`;
  }
};

/**
 * Generates a multi-day VIP itinerary based on user preferences.
 */
export const generateVIPItinerary = async (preferences: {
  duration: number;
  budget: number;
  interests: string[];
  startArea: string;
  businesses: any[];
  destinations: any[];
}): Promise<any> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a luxury ${preferences.duration}-day Mpumalanga itinerary.
      
      Budget: R${preferences.budget} total
      Interests: ${preferences.interests.join(', ')}
      Starting from: ${preferences.startArea}
      
      For each day provide:
      - Morning activity (with business/destination suggestion if available)
      - Afternoon activity  
      - Evening dining/entertainment
      - Estimated cost breakdown
      
      Keep it sophisticated, realistic, and experience-focused. Mix nature, culture, wellness, gastronomy.
      
      Return JSON with structure:
      {
        "title": "Luxury Mpumalanga Journey",
        "days": [
          {
            "day": 1,
            "morning": "Activity description",
            "afternoon": "Activity description", 
            "evening": "Activity description",
            "estimatedCost": number,
            "suggestedBusinesses": ["business name 1", "business name 2"]
          }
        ],
        "totalEstimatedCost": number,
        "packing_tips": ["tip1", "tip2"],
        "local_insights": ["insight1", "insight2"]
      }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  morning: { type: Type.STRING },
                  afternoon: { type: Type.STRING },
                  evening: { type: Type.STRING },
                  estimatedCost: { type: Type.NUMBER },
                  suggestedBusinesses: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            totalEstimatedCost: { type: Type.NUMBER },
            packing_tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            local_insights: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const text = response.text?.trim() || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error("AI VIP Itinerary Generation Error", error);
    return {
      title: "Luxury Mpumalanga Journey",
      days: [],
      totalEstimatedCost: preferences.budget,
      packing_tips: ["Bring sunscreen", "Pack light layers"],
      local_insights: ["Mpumalanga is known for its stunning natural beauty", "Best visited during cooler months"]
    };
  }
};

/**
 * Enhanced concierge with conversation history and preferences.
 */
export const chatWithConciergeEnhanced = async (message: string, preferences: any, history: any[]): Promise<{ response: string; updatedPreferences: any }> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Build context from preferences
    const contextStr = preferences && Object.keys(preferences).length > 0 
      ? `User preferences: Categories: ${preferences.favoriteCategories?.join(', ')}, Areas: ${preferences.favoriteAreas?.join(', ')}, Budget: R${preferences.priceRange?.min}-${preferences.priceRange?.max}`
      : '';

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the Lowveld AI Concierge, a luxury personal assistant for Mpumalanga (LowveldHub). 
        
${contextStr}

You have access to user preferences and conversation history. Use them to:
1. Personalize recommendations based on past preferences
2. Remember what they liked/disliked
3. Suggest complementary services proactively
4. Rank results: Platinum > Elite > Premium for equivalent offerings
5. Understand local South African terms (shisanyama, bakkie, koppie, boma)

Keep responses warm, sophisticated, and concise (<100 words). If user seems interested in something, suggest related experiences.`,
      },
    });

    // Add history context
    for (const msg of history.slice(-5)) {
      if (msg.role === 'user') {
        await chat.sendMessage({ message: msg.message });
      }
    }

    const result = await chat.sendMessage({ message });
    
    return {
      response: result.text || "I'm delighted to assist you. How can I enhance your Mpumalanga experience today?",
      updatedPreferences: preferences
    };
  } catch (error) {
    console.error("AI Enhanced Concierge Error", error);
    return {
      response: "I apologize, I'm temporarily offline. Please try again in a moment.",
      updatedPreferences: preferences
    };
  }
};


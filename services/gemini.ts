
import { GoogleGenAI, Type } from "@google/genai";
import { StudentProfile, CampusEvent } from "../types";

export const getSmartSuggestion = async (
  profile: StudentProfile,
  events: CampusEvent[],
  currentTime: string
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Student Profile:
    Name: ${profile.name}
    Skills: ${profile.skills.join(', ')}
    Projects: ${profile.projects.join(', ')}
    Goals: ${profile.interests.join(', ')}

    Current Time: ${currentTime}
    Today's Schedule:
    ${events.map(e => `- ${e.title} (${e.type}) from ${new Date(e.startTime).toLocaleTimeString()} to ${new Date(e.endTime).toLocaleTimeString()}`).join('\n')}

    Task: Based on the student's free periods (detected from gaps or cancelled classes) and upcoming deadlines, suggest 1-2 high-impact, bite-sized actions they can take NOW to improve their career or productivity. Keep it under 40 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Update your GitHub README for your latest project!";
  }
};

export const getCareerGuidance = async (topic: string, profile: StudentProfile) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Student Topic: ${topic}
    Profile: ${profile.name}, ${profile.branch}, Skills: ${profile.skills.join(', ')}
    
    Provide 3 actionable, high-quality tips for a beginner on this topic. 
    Topics might include LinkedIn optimization, GitHub setup, or Hackathon PPT tips.
    Format as Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "Error generating guidance. Please try again.";
  }
};

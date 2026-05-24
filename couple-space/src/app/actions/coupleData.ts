"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// In a real app, you would get the userId and coupleSpaceId from the session/auth context
const MOCK_USER_ID = "mock-user-1";
const MOCK_COUPLE_SPACE_ID = "mock-space-1";

export async function saveDailyEmotion(emotionType: string, note: string | null, sharedState: string) {
  try {
    const newEmotion = await prisma.dailyEmotion.create({
      data: {
        emotionType,
        note,
        sharedState,
        userId: MOCK_USER_ID,
        coupleSpaceId: MOCK_COUPLE_SPACE_ID,
      },
    });
    
    revalidatePath("/");
    return { success: true, data: newEmotion };
  } catch (error) {
    console.error("Failed to save emotion:", error);
    return { success: false, error: "Failed to save emotion" };
  }
}

export async function getDailyEmotions() {
  try {
    const emotions = await prisma.dailyEmotion.findMany({
      where: {
        coupleSpaceId: MOCK_COUPLE_SPACE_ID,
      },
      orderBy: {
        date: "desc",
      },
    });
    return { success: true, data: emotions };
  } catch (error) {
    console.error("Failed to fetch emotions:", error);
    return { success: false, error: "Failed to fetch emotions" };
  }
}

export async function saveSecretNote(content: string, passcode: string) {
  try {
    const newNote = await prisma.secretNote.create({
      data: {
        content,
        passcode,
        userId: MOCK_USER_ID,
        coupleSpaceId: MOCK_COUPLE_SPACE_ID,
      },
    });
    
    revalidatePath("/");
    return { success: true, data: newNote };
  } catch (error) {
    console.error("Failed to save secret note:", error);
    return { success: false, error: "Failed to save secret note" };
  }
}

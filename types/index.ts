export interface Progress {
  id: string;
  userId: string;
  wordId: string;
  attempts: number;
  correct: number;
  stage: number;
}

export interface User {
  id: string;
  username: string;
  language: string;
}

export interface Word {
  id: string;
  polish: string;
  russian: string[];
  english: string[];
  correctAnswerRu: string;
  correctAnswerEn: string;
  topicId: string;
}

export interface Topic {
  id: string;
  name: string;
  words: Word[];
}
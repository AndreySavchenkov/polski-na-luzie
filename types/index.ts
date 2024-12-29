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

export interface Dialog {
  id: string;
  content: string;
  correctOrder: string[];
}

export interface DialogSet {
  id: string;
  name: string;
  dialogs: {
    id: string;
    title: string;
    imagePath: string;
  }[];
}

export type DialogT = {
  id: string;
  title: string;
  imagePath: string;
  sentences: {
    id: string;
    text: string;
    top: string;
    left: string;
  }[];
};

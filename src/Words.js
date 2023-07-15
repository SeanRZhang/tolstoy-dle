import wordBank from "./TextFiles/valid-wordle-words.txt";
import answerBank from "./TextFiles/tolstoy-word-bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let newWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArray = result.split("\n");
      wordSet = new Set(wordArray);
    });
  await fetch(answerBank)
    .then((response) => response.text())
    .then((result) => {
      const ansArray = result.split("\n");
      newWord = ansArray[Math.floor(Math.random() * ansArray.length)];
    });

  return { wordSet, newWord };
};
